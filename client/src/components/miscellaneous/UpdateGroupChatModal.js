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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserBadgeItem from "./UserBadgeItem";
import { axiosClient } from "../../utils/axiosClient";
import { setFetchAgain, setSelectedChat } from "../../redux/slices/chatSlice";

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

  console.log("check", fetchAgain);
  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const data = await axiosClient.put("/chat/renameGroup", {
        chatId: selectedChat._id,
        chatName: groupChatName,
      });

      console.log("fetchagain data", fetchAgain);
      dispatch(setSelectedChat(data.result)); //updated data will be set
      dispatch(setFetchAgain(!fetchAgain)); //fetching again to get updated data
      setRenameLoading(false);
      setGroupChatName("");
    } catch (error) {
      console.log(error);
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
  const handleRemove = () => {};
  const handleSearch = () => {};
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
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleRemove()}>
              Exit Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateGroupChatModal;
