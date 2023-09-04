import React from "react";
import "./ChatListItem.scss";
import Avatar from "../avatar/Avatar";
import { getSender } from "../../config/ChatLogic";
import { Text } from "@chakra-ui/layout";

function ChatListItem({ chatItem, loggedUser, onClick }) {
  console.log("ChatListItem", chatItem);

  const name = chatItem.users
    ? !chatItem.isGroupChat
      ? getSender(loggedUser, chatItem.users)
      : chatItem.chatName
    : chatItem.name;
  return (
    <div className="chatListItem-container" onClick={onClick}>
      <div className="profile-img">
        <Avatar />
      </div>
      <div className="user-info">
        <div className="name">{name}</div>
        <div className="last-msg"></div>
        <Text color={"gray.500"}>message</Text>
      </div>
    </div>
  );
}

export default ChatListItem;
