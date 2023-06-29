import React from "react";
import "./ChatListItem.scss";
import Avatar from "../avatar/Avatar";
import { getSender } from "../../config/ChatLogic";
import { Text } from "@chakra-ui/layout";

function ChatListItem({ chatItem, loggedUserMail }) {
  const name = !chatItem.isGroupChat
    ? getSender(loggedUserMail, chatItem.users)
    : chatItem.chatName;
  return (
    <div className="chatListItem-container">
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
