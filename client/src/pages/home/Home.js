import React from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import MyChat from "../../components/myChat/MyChat";
import SingleChat from "../../components/singleChat/SingleChat";
import { Grid } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";


function Home() {
  const selectedChat = useSelector(
    (state) => state.chatDataReducer.selectedChat
  );
  
  return (
    <Grid className="home-container">
      <div className={`mychat-section ${selectedChat?"chat-selected":""}  `}>
        <MyChat />
      </div>
      <div className={`singleChat-section ${selectedChat?"chat-selected":""}  `}>
        <SingleChat />
      </div>
    </Grid>
  );
}

export default Home;
