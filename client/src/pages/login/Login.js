import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const useNavigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const result = await axiosClient.post("/auth/login", {
        name,
        email,
        password,
      });
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>
        <p className="subheading">
          Do not have an account? <Link to="/signup">Sign Up</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
