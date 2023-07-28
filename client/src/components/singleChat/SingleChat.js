import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./SingleChat.scss";
import { useSelector } from "react-redux";
import ChatBox from "../chatBox/ChatBox";

function SingleChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessages] = useState();
  const selectedChat = useSelector(
    (state) => state.chatDataReducer.selectedChat
  );
  const fetchAgain = useSelector(
    (state) => state.chatDataReducer.fetchAgain
  );
  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      // p={3}
      bg="grey.600"
      width={{ base: "100%", md: "100%" }}
      borderRadius="lg"
      borderWidth="1px"
      className="singlechat"
    >
      <ChatBox />
    </Box>
  );
}

export default SingleChat;
