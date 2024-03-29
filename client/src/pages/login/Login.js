import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await axiosClient.post("/auth/login", {
        name,
        email,
        password,
      });

      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");

      console.log(response);
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
      navigate("/signup");
    }
  }
  return (
    <div className="login">
      <div className="login-box">
        <span className="border-line"></span>
        <form onSubmit={handleSubmit}>
          <h2 className="heading">Log In</h2>

          {/* <div className="inputBox">
            <input
              type="text"
              required="required"
              onChange={(e) => setName(e.target.value)}
            />
            <span>Username</span>
            <i></i>
          </div> */}

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
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
          <input type="submit" className="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;
