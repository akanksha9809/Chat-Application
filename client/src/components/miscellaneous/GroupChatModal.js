import React from "react";
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
  FormControl,
  Input,
  useToast,
  Box,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";

function GroupChatModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
  const handleSubmit = () => {};
  const handleDelete = (userToDelete) => {
    const updatedUsers = selectedUsers.filter(
      (item) => item._id !== userToDelete._id
    );
    setSelectedUsers(updatedUsers);
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "Already added",
        status: "warning",
        duration: 5000,
        isClosable: "true",
        position: "top",
        variant: "subtle",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]); //added using spread operator
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader d="f" justifyContent="center"></ModalHeader>
          <ModalCloseButton />
          <ModalBody d="f" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Group Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Participants"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {selectedUsers.map(
              (
                u //user
              ) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              )
            )}
            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit}>Create Chat</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;
