import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import {
  FormControl,
  IconButton,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../redux/slices/chatSlice";
import { getSender } from "../../config/ChatLogic";
import { getLoggedUser } from "../../redux/slices/authSlice";
import "./ChatBox.css";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";
import { axiosClient } from "../../utils/axiosClient";
import ScrollableChat from "../scrollableChat/ScrollableChat";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessages] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedChat = useSelector(
    (state) => state.chatDataReducer.selectedChat
  );

  //fetching all messages
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const data = await axiosClient.get(`/message/${selectedChat._id}`);
      setMessages(data.result);
      setLoading(false);

      console.log("cheking NOW!!! ", data.result);
    } catch (error) {
      toast({
        title: "Error Occured!!",
        description: "Failed to load the messages",
        status: "error",
        duration: 5000,
        isClosable: "true",
        position: "top",
        variant: "subtle",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const fetchAgain = useSelector((state) => state.chatDataReducer.fetchAgain);
  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const handleOpenModal = (event) => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const sendMessage = async (event) => {
    if (event.key == "Enter" && newMessage) {
      setNewMessages(""); //it will not make it empty immediately, due to async
      try {
        const data = await axiosClient.post("/message/", {
          chatId: selectedChat._id,
          content: newMessage,
        });

        setMessages([...messages, data.result]);
      } catch (error) {
        toast({
          title: "Error Occured!!",
          description: "Failed to send the messages",
          status: "error",
          duration: 5000,
          isClosable: "true",
          position: "top",
          variant: "subtle",
        });
      }
    }
  };
  const typingHandler = (event) => {
    setNewMessages(event.target.value);
    //typing indicator logic
  };

  return (
    <div className="chatbox-container">
      {selectedChat ? (
        <div className="chatbox">
          <div className="header" onClick={handleOpenModal}>
            {selectedChat.isGroupChat ? (
              <>
                <UpdateGroupChatModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  fetchMessages={fetchMessages}
                >
                  <span className="group-name" onClick={handleOpenModal}>
                    {selectedChat.chatName.toUpperCase()}
                  </span>
                </UpdateGroupChatModal>
              </>
            ) : (
              <>{getSender(loggedUser, selectedChat.users)}</>
            )}
          </div>
          <div className="chat-section">
            {loading ? (
              <Spinner
                size="xl"
                width={20}
                height={20}
                alignSelf="center"
                margin="auto"
                color="white"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
          </div>
          <div className="input-section">
            <FormControl onKeyDown={sendMessage} isRequired>
              <Input
                variant="filled"
                placeholder="Type a message"
                onChange={typingHandler}
                value={newMessage}
                color="white"
              />
            </FormControl>
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
