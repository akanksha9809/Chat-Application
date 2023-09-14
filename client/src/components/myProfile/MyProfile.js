import React, { useState } from "react";
import "./MyProfile.scss";
import { BsArrowLeft } from "react-icons/bs";

function MyProfile({ loggedUser, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseClick = () => {
    setIsClosing(true);
    // You can add a delay here if needed to give the animation time to play
    // setTimeout(() => {
    onClose();
    // }, 3000); // Delay for 0.3 seconds
  };

  return (
    <div className="myProfile">
      <div className="overlay" onClick={handleCloseClick}></div>
      <div className={`profile-content ${isClosing ? "reverse" : ""}`}>
        <div className="header">
          <div className="arrowIcon" onClick={handleCloseClick}>
            <BsArrowLeft />
          </div>
          <h2>Profile</h2>
        </div>
        <img src={loggedUser?.pic} alt="User Profile" />
        <div className="about">
          <div className="subsection">
            <h4>Name</h4>
            <h3>{loggedUser?.name}</h3>
          </div>
          <div className="subsection">
            <h4>Mail</h4>
            <h3>{loggedUser?.email}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
