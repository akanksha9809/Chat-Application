import React from "react";
import "./ScrollableChat.css";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogic";
import { useSelector } from "react-redux";
import { Avatar, Tooltip } from "@chakra-ui/react";

function ScrollableChat({ messages }) {
  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);
  return (
    <ScrollableFeed>
      {console.log("msg len", messages.length)}
      {messages &&
        messages.map((msg, ind) => (
          <div style={{ display: "flex" }} key={msg._id}>
            {(isSameSender(messages, msg, ind, loggedUser) ||
              isLastMessage(messages, ind, loggedUser._id)) && (
              <Tooltip
                label={msg.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  marginTop="7px"
                  marginRight={1}
                  size="sm"
                  cursor="pointer"
                  name={msg.sender.name}
                  scrollMargin={msg.sender.pic}
                ></Avatar>
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  msg.sender._id === loggedUser._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "8px",
                padding: "5px 15px",
                marginLeft: isSameSenderMargin(
                  messages,
                  msg,
                  ind,
                  loggedUser._id
                ),
                marginTop: isSameUser(messages, msg, ind, loggedUser._id)
                  ? 3
                  : 10,
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
