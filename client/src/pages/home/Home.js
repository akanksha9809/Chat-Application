import React from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import MyChat from "../../components/myChat/MyChat";
import SingleChat from "../../components/singleChat/SingleChat";
import { Grid } from "@chakra-ui/react";

function Home() {
  return (
    <Grid templateColumns="0.5fr 3.5fr 6fr">
      <Sidebar />
      <MyChat />
      <SingleChat />
    </Grid>
  );
}

export default Home;
