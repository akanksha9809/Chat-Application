import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./SingleChat.scss";
import { useSelector } from "react-redux";

function SingleChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessages] = useState();
  const selectedChat = useSelector(
    (state) => state.chatDataReducer.selectedChat
  );
  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="grey.600"
      w={{ base: "100%", md: "100%" }}
      borderRadius="lg"
      borderWidth="1px"
      backgroundColor={"#18161f"}
    >
      HIIIIIIIIIIIIIIII
    </Box>
  );
}

export default SingleChat;
