import axios from "axios";
import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPlaylist = () => {
    const navigate = useNavigate();
  const [playlistName, setPlaylistName] = useState("");
  const [isPrivate , setIsPrivate] = useState(false);
  const addPlaylistHandler = (e) => {
    e.preventDefault();
    axios
      .post("/playlists", {
        name: playlistName,
        isPrivate: isPrivate,
      })
      .then((res) => {
        
        navigate("/");
      })
      .catch((err) => {
        
      });
  };
  return (
    <div className="flex flex-col h-screen bg-black divide-y divide-gray-800">
      <Navbar />
      <div className=" flex-auto flex justify-center items-center">
        <div className="px-6 py-10 shadow shadow-red-600 rounded-md w-1/4">
          <h2 className=" font-bold text-white text-center text-2xl mb-3">
            Add a playlist
          </h2>
          <form onSubmit={addPlaylistHandler}>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
              className="px-2 py-1.5 bg-neutral-800 w-full text-gray-400 outline-none rounded-md"
              placeholder="Name of the playlist"
            />
            <div className=" flex items-center gap-2 my-2 text-white">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => {
                    setIsPrivate(e.target.checked);
                }}
                className=" accent-red-600 w-5 h-5"
                name=""
                id=""
              />
              private
            </div>
            <button className="w-full py-1.5 bg-red-600 text-white font-bold rounded-md">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlaylist;
