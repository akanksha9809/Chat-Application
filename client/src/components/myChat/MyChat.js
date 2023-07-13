import React, { useEffect } from "react";
import "./MyChat.scss";
import Search from "../search/Search";
import ChatListItem from "../chatListItem/ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { getMyChat, setSelectedChat } from "../../redux/slices/chatSlice";
import { getLoggedUser } from "../../redux/slices/authSlice";
import GroupChatModal from "../miscellaneous/GroupChatModal";

function MyChat() {
  const dispatch = useDispatch();
  const myChatData = useSelector((state) => state.chatDataReducer.myChatData);
  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);

  // console.log("name->", email);

  useEffect(() => {
    dispatch(getMyChat());
    dispatch(getLoggedUser());
  }, [dispatch]);

  return (
    <div className="mychat">
      <div className="mychat-box">
        <Search />
        <div className="mid-section">
          <h3>My chats</h3>
          <GroupChatModal>
            <button className="glow-on-hover" type="button">
              + New Group
            </button>
          </GroupChatModal>
        </div>
        <div className="list">
          {myChatData ? (
            myChatData.map((chatItem) => (
              <ChatListItem
                key={chatItem._id}
                chatItem={chatItem}
                loggedUser={loggedUser}
                onClick={
                  () => setSelectedChat(chatItem._id)
                  // console.log("mychat!!!!!!!!!!!!!!!!! ->", chatItem._id)
                }
              />
            ))
          ) : (
            <p>Loading chat data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyChat;
