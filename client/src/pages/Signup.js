import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("users/signup", {
        name,
        email,
        password,
      })
      .then((res) => {
        setLoading(false);
        setError(null);
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <div className=" bg-black h-screen flex justify-center items-center">
      <div className=" px-6 py-10 shadow shadow-red-600 rounded-md w-1/4">
        <h1 className=" font-bold text-white text-center text-3xl mb-2">
          Signup
        </h1>
        <p className=" text-white text-center mb-8">
          already have an account?{" "}
          <Link to="/login" className=" text-red-600">
            Login here
          </Link>
        </p>
        <form onSubmit={signupHandler} className=" flex flex-col gap-5">
          <input
            className=" px-2 py-1.5 bg-neutral-800 w-full text-gray-400 outline-none rounded-md"
            placeholder="Full name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <input
            type="email"
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
          <button type="submit"className=" w-full py-2 bg-red-600 text-white font-bold rounded-md flex justify-center items-center gap-2">{loading && <ReactLoading width={20} height={20} type="spin" />}Register</button>
          {error && <p className=" text-red-600 text-center my-1">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
