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

function ScrollableChat({ messages, isGroupChat, isTyping }) {
  const color1 =
    "radial-gradient(circle farthest-corner at 10% 20%, rgba(97, 186, 255, 1) 0%, rgba(166, 239, 253, 1) 90.1%)";
  const color2 =
    "radial-gradient( circle 935px at 3.1% 5.8%,  rgba(182,255,139,1) 0%, rgba(8,88,127,1) 100.2% )";
  //"radial-gradient( circle 935px at 3.1% 5.8%,  rgba(182,255,139,1) 0%, rgba(8,88,127,1) 100.2% )";
  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((msg, ind) => (
          <div style={{ display: "flex", marginLeft: "15px" }} key={msg._id}>
            {isGroupChat &&
              (isSameSender(messages, msg, ind, loggedUser) ||
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
                background: `${
                  msg.sender._id === loggedUser._id ? color2 : color1
                }`,
                borderRadius: "15px",
                padding: "5px 15px",
                marginLeft: isSameSenderMargin(
                  messages,
                  msg,
                  ind,
                  loggedUser._id
                ),
                marginRight: "20px",
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
