import React, { useState } from "react";
import "./Signup.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import defaultImg from "../../assets/user.png";
import { useToast } from "@chakra-ui/react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userImg, setUserImg] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
        // console.log("img data", fileReader.result);
      }
    };
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const result = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
        userImg,
      });
      toast({
        title: result.result,
        status: "success",
        duration: 5000,
        isClosable: "true",
        position: "top",
        variant: "subtle",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast({
        title: error,
        status: "error",
        duration: 5000,
        isClosable: "true",
        position: "top",
        variant: "subtle",
      });
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
