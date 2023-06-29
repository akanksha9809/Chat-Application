import React, { useEffect } from "react";
import "./MyChat.scss";
import Search from "../search/Search";
import ChatListItem from "../chatListItem/ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { getMyChat } from "../../redux/slices/chatSlice";

function MyChat() {
  const dispatch = useDispatch();
  const myChatData = useSelector((state) => state.chatDataReducer.myChatData);
  const [name, email] = useSelector((state) => state.authDataReducer.user);

  console.log("name->", email);

  useEffect(() => {
    dispatch(getMyChat());
  }, [dispatch]);

  return (
    <div className="mychat">
      <div className="mychat-box">
        <Search />
        <div className="list">
          {myChatData ? (
            myChatData.map((chatItem) => (
              <ChatListItem
                key={chatItem._id}
                chatItem={chatItem}
                loggedUserMail={email}
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
