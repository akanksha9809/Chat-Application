import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  Box,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserBadgeItem from "./UserBadgeItem";
import { axiosClient } from "../../utils/axiosClient";
import { setFetchAgain, setSelectedChat } from "../../redux/slices/chatSlice";
import UserListItem from "./UserListItem";

function UpdateGroupChatModal({ onClose, children }) {
  const { isOpen, onOpen, onClose: handleCloseModal } = useDisclosure(); //renaming the onClose function to handleCloseModal
  const fetchAgain = useSelector((state) => state.chatDataReducer.fetchAgain);
  const selectedChat = useSelector(
    (state) => state.chatDataReducer.selectedChat
  );

  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);
  const dispatch = useDispatch();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const data = await axiosClient.put("/chat/renameGroup", {
        chatId: selectedChat._id,
        chatName: groupChatName,
      });

      dispatch(setSelectedChat(data.result)); //updated data will be set
      dispatch(setFetchAgain(!fetchAgain)); //fetching again to get updated data
      setRenameLoading(false);
      setGroupChatName("");
    } catch (error) {
      toast({
        title: "Error Occured!",
        //description: error.response.data.result.message,
        status: "error",
        duration: 5000,
        isClosable: "true",
        position: "top",
        variant: "subtle",
      });
      setRenameLoading(false);
    }
  };
  const handleRemove = async (userToRemove) => {
    if (userToRemove._id === loggedUser._id) {
      toast({
        title: "Click on Exit Group!",
        status: "info",
        duration: 5000,
        isClosable: "true",
        position: "top",
        variant: "subtle",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== loggedUser._id) {
      toast({
        title: "Only Admin can remove User!",
        status: "error",
        duration: 5000,
        isClosable: "true",
        position: "bottom",
        variant: "subtle",
      });
      return;
    }

    try {
      setLoading(true);
      const data = await axiosClient.put("/chat/removeFromGroup", {
        chatId: selectedChat._id,
        userId: userToRemove._id,
      });
      dispatch(setSelectedChat(data.result));
      dispatch(setFetchAgain(!fetchAgain));
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: "true",
        position: "bottom",
        variant: "subtle",
      });
      setLoading(false);
      return;
    }
  };
  const handleExit = async (userToRemove) => {
    try {
      setLoading(true);
      const data = await axiosClient.put("/chat/removeFromGroup", {
        chatId: selectedChat._id,
        userId: userToRemove._id,
      });
      dispatch(setSelectedChat());
      //assign new group admin

      dispatch(setFetchAgain(!fetchAgain));
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: "true",
        position: "bottom",
        variant: "subtle",
      });
      setLoading(false);
      return;
    }
  };

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((user) => user._id === userToAdd._id)) {
      toast({
        title: "User Already Present in Group!",
        status: "error",
        duration: 5000,
        isClosable: "true",
        position: "bottom",
        variant: "subtle",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== loggedUser._id) {
      toast({
        title: "Only Admin can add Users!",
        status: "error",
        duration: 5000,
        isClosable: "true",
        position: "bottom",
        variant: "subtle",
      });
      return;
    }

    try {
      setLoading(true);
      const data = await axiosClient.put("/chat/addToGroup", {
        chatId: selectedChat._id,
        userId: userToAdd._id,
      });
      dispatch(setSelectedChat(data.result));
      dispatch(setFetchAgain(!fetchAgain));
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: "true",
        position: "bottom",
        variant: "subtle",
      });
      setLoading(false);
      return;
    }
  };
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      //empty
      return;
    }

    try {
      setLoading(true);

      const data = await axiosClient.get(`/user?search=${query}`);
      console.log(data.result);
      setLoading(false);
      setSearchResult(data.result);
    } catch (e) {
      console.log("failed to load the chats", e);
    }
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex">
              <Input
                placeholder="Group Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="yellow"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Add member to group"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => handleExit(loggedUser)}
            >
              Exit Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateGroupChatModal;
