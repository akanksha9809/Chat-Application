import React from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import MyChat from "../../components/myChat/MyChat";
import SingleChat from "../../components/singleChat/SingleChat";
import { Grid } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

function Home() {
  return (
    <Grid templateColumns="0.5fr 3.5fr 6fr">
      <Sidebar />
      
      <div className="routes-container">
        <Routes>
          <Route path="/" element={<MyChat />} />
          <Route path="/search" element={<MyChat />} />
          <Route path="/mychat" element={<MyChat />} />
        </Routes>
      </div>
      <SingleChat />
    </Grid>
  );
}

export default Home;
