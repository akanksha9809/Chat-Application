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
import { setFetchAgain, setSelectedChat } from "../../redux/slices/chatSlice";
import { getSender, getSenderFull } from "../../config/ChatLogic";
import { getLoggedUser } from "../../redux/slices/authSlice";
import "./ChatBox.scss";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";
import { axiosClient } from "../../utils/axiosClient";
import ScrollableChat from "../scrollableChat/ScrollableChat";
import io from "socket.io-client";
import { BsArrowLeft } from "react-icons/bs";
import Avatar from "../avatar/Avatar";
import { IoMdSend } from "react-icons/io";

const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const fetchAgain = useSelector((state) => state.chatDataReducer.fetchAgain);
  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);
  const selectedChat = useSelector(
    (state) => state.chatDataReducer.selectedChat
  );

  const dispatch = useDispatch();
  const toast = useToast();

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", loggedUser);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //give notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  //fetching all messages
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const data = await axiosClient.get(`/message/${selectedChat?._id}`);
      setMessages(data.result);
      setLoading(false);
      socket.emit("join chat", selectedChat?._id);
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

  const handleOpenModal = (event) => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const sendMessage = async (event) => {
    if ((event.key === "Enter" || event.type === "click") && newMessage) {
      socket.emit("stop typing", selectedChat?._id);
      setNewMessage(""); //it will not make it empty immediately, due to async
      // setIsClicked(false);
      try {
        const data = await axiosClient.post("/message/", {
          chatId: selectedChat?._id,
          content: newMessage,
        });

        socket.emit("new message", data.result);
        setMessages([...messages, data.result]);
        dispatch(setFetchAgain(!fetchAgain));
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

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="chatbox-container">
      {selectedChat ? (
        <div className="chatbox">
          <div className="header" onClick={handleOpenModal}>
            <div
              className="arrowIcon"
              onClick={() => dispatch(setSelectedChat(null))}
            >
              <BsArrowLeft />
            </div>
            <div className="header-pic">
              <Avatar
                src={
                  selectedChat.isGroupChat
                    ? selectedChat.groupIcon
                    : getSenderFull(loggedUser, selectedChat.users).pic
                }
              />
            </div>

            <div className="header-nameTyping">
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
              {
                <div className="typing">
                  {isTyping && (
                    <div style={{ fontSize: "12px", color: "gray" }}>
                      typing...
                    </div>
                  )}
                </div>
              }
            </div>
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
                <ScrollableChat
                  messages={messages}
                  isGroupChat={selectedChat.isGroupChat}
                  isTyping={isTyping}
                />
              </div>
            )}
          </div>
          <div className="input-section">
            <FormControl
              onKeyDown={sendMessage}
              isRequired
              display="flex"
              justifyContent="center"
              gap={30}
              onSubmit={sendMessage}
            >
              <input
                type="text"
                className="input-text"
                placeholder="Type a message"
                value={newMessage}
                onChange={typingHandler}
              />
              <div className="icon" onClick={sendMessage}>
                <IoMdSend size={27} />
              </div>
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
