import React, { useState } from "react";
import "./Signup.scss";
import { Link } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import defaultImg from "../../assets/user.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userImg, setUserImg] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const result = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <div className="signup">
      <div className="signup-box">
        <span className="border-line"></span>
        <form onSubmit={handleSubmit}>
          <h2 className="heading">Sign Up</h2>
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg ? userImg : defaultImg} alt={name} />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="inputBox">
            <input
              type="text"
              required="required"
              onChange={(e) => setName(e.target.value)}
            />
            <span>Username</span>
            <i></i>
          </div>

          <div className="inputBox">
            <input
              type="email"
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
            <i></i>
          </div>

          <div className="inputBox">
            <input
              type="password"
              required="required"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i></i>
          </div>

          <p className="subheading">
            Do not have an account?{" "}
            <Link to="/login" className="link">
              Log In
            </Link>
          </p>
          <input type="submit" className="submit" />
        </form>
      </div>
    </div>
  );
}

export default Signup;
