import React from "react";
import "./Sidebar.scss";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-box">
        <div className="my-profile sidebar-icon">
          <CgProfile color="#4a4e51" size="1.75rem" />
        </div>
        <div className="all-chat sidebar-icon">
          <BsFillChatDotsFill color="#4a4e51" size="1.75rem" />
        </div>
        <div className="group-chat sidebar-icon">
          <IoIosPeople color="#4a4e51" size="1.75rem" />
        </div>
        <div className="logout sidebar-icon">
          <AiOutlineLogout color="#4a4e51" size="1.75rem" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
