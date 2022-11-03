import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const Login = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("users/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("auth-token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        axios.defaults.headers.common["auth-token"] = res.data.token;
        setLoading(false);
        setError(null);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <div className=" bg-black h-screen flex justify-center items-center">
      <div className=" px-6 py-10 shadow shadow-red-600 rounded-md w-1/4">
        <h1 className=" font-bold text-white text-center text-3xl mb-2">Login</h1>
        <p className=" text-white text-center mb-8">don't have an account? <Link to="/signup" className=" text-red-600">Create one</Link></p>
        
        <form onSubmit={loginHandler} className=" flex flex-col gap-5">
          <input
            type="text"
            className=" px-2 py-1.5 bg-neutral-800 w-full text-gray-400 outline-none rounded-md"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            className=" px-2 py-1.5 bg-neutral-800 w-full text-gray-400 outline-none rounded-md"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button type="submit"className=" w-full py-2 bg-red-600 text-white font-bold rounded-md flex justify-center items-center gap-2">{loading && <ReactLoading width={20} height={20} type="spin" />}Login</button>
          {error && <p className=" text-red-600 text-center my-1">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
