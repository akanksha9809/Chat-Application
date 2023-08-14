import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./SingleChat.scss";
import { useSelector } from "react-redux";
import ChatBox from "../chatBox/ChatBox";

function SingleChat() {
  const selectedChat = useSelector(
    (state) => state.chatDataReducer.selectedChat
  );
  const fetchAgain = useSelector((state) => state.chatDataReducer.fetchAgain);
  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      // p={3}
      bg="grey.600"
      width="100%"
      borderRadius="lg"
      borderWidth="1px"
      className="singlechat"
    >
      <ChatBox />
    </Box>
  );
}

export default SingleChat;
