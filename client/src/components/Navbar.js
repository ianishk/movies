import React from "react";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [movieInput, setMovieInput] = useState("");
  const logoutHandler = (e) => {
    localStorage.clear();
    window.location.reload();
  };
  const searchHandler = () => {
    navigate(`/movies?s=${movieInput}`);
  };
  return (
    <div className=" py-3 px-10 flex items-center justify-between">
      <h2 className=" text-red-600 font-bold text-3xl cursor-pointer" onClick={() => {navigate("/")}}>Movies</h2>
      <div className=" flex items-center bg-red-600 w-1/2 rounded-md cursor-pointer">
        <input
          type="text"
          className=" flex-auto px-2 py-1.5 bg-neutral-800 text-gray-400 outline-none rounded-md rounded-r-none"
          placeholder="Search for movies (minimum 3 characters)"
          value={movieInput}
          onChange={(e) => {
            setMovieInput(e.target.value);
          }}
        />
        <div onClick={searchHandler} className="px-3 py-2.5">
          <BiSearchAlt2 onClick={searchHandler} className=" text-white" />
        </div>
      </div>
      <div
        className=" group rounded-full bg-red-600 relative h-8 w-8 flex justify-center items-center capitalize font-bold cursor-pointer"
        onClick={(e) => {
          setLogoutVisible((prev) => !prev);
        }}
      >
        {localStorage.getItem("user") && (
          <>
            {JSON.parse(localStorage.getItem("user")).name[0]}
            <div
              className={`absolute top-10 right-0 bg-black text-white py-2 px-4 rounded-md shadow-md ${
                logoutVisible ? "" : "hidden"
              } hover:bg-gray-800 border border-gray-700`}
            >
              <p
                className=" cursor-pointer font-normal"
                onClick={logoutHandler}
              >
                Logout
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
