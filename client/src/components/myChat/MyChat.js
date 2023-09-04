import React, { useEffect, useState } from "react";
import "./MyChat.scss";
import Search from "../search/Search";
import ChatListItem from "../chatListItem/ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { getMyChat, setSelectedChat } from "../../redux/slices/chatSlice";
import { getLoggedUser } from "../../redux/slices/authSlice";
import GroupChatModal from "../miscellaneous/GroupChatModal";
import { axiosClient } from "../../utils/axiosClient";

function MyChat() {
  const dispatch = useDispatch();
  const myChatData = useSelector((state) => state.chatDataReducer.myChatData);
  const loggedUser = useSelector((state) => state.authDataReducer.loggedUser);
  const fetchAgain = useSelector((state) => state.chatDataReducer.fetchAgain);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (query) => {
    setSearchText(query);
    if (query === "") {
      //empty
      setSearchResult([]);
      setSearchText("");
      return;
    }

    try {
      setLoading(true);

      const data = await axiosClient.get(`/user?search=${query}`);
      console.log("from main search", data.result);
      setLoading(false);
      setSearchText("");
      setSearchResult(data.result);
    } catch (e) {
      console.log("failed to load the chats", e);
    }
    setLoading(false);
  };

  const createChat = async (userId) => {
    console.log("userId", userId);
    try {
      setLoading(true);

      const data = await axiosClient.post("/chat/", {
        userId,
      });
      console.log(data.result);
      dispatch(setSelectedChat(data.result));
    } catch (error) {
      console.log("failed to load the chats", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(getMyChat());
    dispatch(getLoggedUser());
  }, [dispatch, fetchAgain]);

  return (
    <div className="mychat">
      <div className="mychat-box">
        <Search onChange={handleSearch} />
        {loading ? (
          <div>Loading</div>
        ) : searchResult.length > 0 ? (
          <div className="list">
            {searchResult?.map((chatItem) => (
              <ChatListItem
                key={chatItem?._id}
                chatItem={chatItem}
                loggedUser={loggedUser}
                onClick={() => createChat(chatItem?._id)}
              />
            ))}
          </div>
        ) : (
          // {setSearchResult([]);}
          <>
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
                      () => dispatch(setSelectedChat(chatItem))
                      // console.log("mychat!!!!!!!!!!!!!!!!! ->", chatItem._id)
                    }
                  />
                ))
              ) : (
                <p>Loading chat data...</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyChat;
