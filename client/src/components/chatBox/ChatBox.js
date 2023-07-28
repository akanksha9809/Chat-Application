import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../redux/slices/chatSlice";
import { getSender } from "../../config/ChatLogic";
import { getLoggedUser } from "../../redux/slices/authSlice";
import "./ChatBox.css";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";

function ChatBox() {
  const selectedChat = useSelector(
    (state) => state.chatDataReducer.selectedChat
  );
  const fetchAgain = useSelector((state) => state.chatDataReducer.fetchAgain);
  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (event) => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="chatbox-container">
      {selectedChat ? (
        <div className="header" onClick={handleOpenModal}>
          <div className="header-name" onClick={handleOpenModal}>
            {selectedChat.isGroupChat ? (
              <>
                <UpdateGroupChatModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                >
                  <span className="group-name" onClick={handleOpenModal}>
                    {selectedChat.chatName.toUpperCase()}
                  </span>
                </UpdateGroupChatModal>
              </>
            ) : (
              <>
                {console.log("chatBox", loggedUser)}
                {console.log(selectedChat.users)}
                {getSender(loggedUser, selectedChat.users)}
              </>
            )}
          </div>
        </div>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          padding="0"
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

//onClick={() => setIsModalOpen(true)} vs //onClick={setIsModalOpen(true)} inifinite rendering
