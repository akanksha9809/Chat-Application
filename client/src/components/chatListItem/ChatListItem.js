import React from "react";
import "./ChatListItem.scss";
import Avatar from "../avatar/Avatar";
import { getSender, getSenderFull } from "../../config/ChatLogic";
import { Text } from "@chakra-ui/layout";

function ChatListItem({ chatItem, loggedUser, onClick }) {
  console.log("ChatListItem", chatItem);

  const name = chatItem.users
    ? !chatItem.isGroupChat
      ? getSenderFull(loggedUser, chatItem.users).name
      : chatItem.chatName
    : chatItem.name;

  const pic = chatItem.users
    ? !chatItem.isGroupChat
      ? getSenderFull(loggedUser, chatItem.users).pic
      : chatItem.groupIcon
    : chatItem.pic;
  return (
    <div className="chatListItem-container" onClick={onClick}>
      <div className="profile-img">
        <Avatar src={pic} />
      </div>
      <div className="user-info">
        <div className="name">{name}</div>
        <div className={chatItem?.latestMessage}></div>
        <Text color={"gray.500"}>message</Text>
      </div>
    </div>
  );
}

export default ChatListItem;
