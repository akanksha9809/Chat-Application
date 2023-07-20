import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../redux/slices/chatSlice";
import { getSender } from "../../config/ChatLogic";

function ChatBox() {
  const selectedChat = useSelector(
    (state) => state.chatDataReducer.selectedChat
  );
  const fetchAgain = useSelector(
    (state) => state.chatDataReducer.setFetchAgain
  );
  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);
  const dispatch = useDispatch();
  return (
    <div>
      {selectedChat ? (
        <>
          <Text color="white">
            {selectedChat.isGroupChat ? (
              <>
                {selectedChat.chatName.toUpperCase()}
                {/**update modal */}
              </>
            ) : (
              <>{getSender(loggedUser, selectedChat.users)}</>
            )}
          </Text>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans" color="white">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </div>
  );
}

export default ChatBox;
