import React from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    axios.get("/playlists").then((res) => {
      setPlaylists(res.data);
      
    });
  }, []);
  return (
    <div className=" flex flex-col h-screen bg-black divide-y divide-gray-900">
      <Navbar />
      <div className=" flex-auto px-10 overflow-y-scroll flex flex-col divide-y divide-gray-900 scrollcss">
        <div className=" py-4">
          <div className=" flex justify-between items-center">
            <h2 className=" font-semibold text-white text-2xl mb-2">
              Your playlist
            </h2>
            <Link
              to="/addPlaylist"
              className=" font-medium text-red-600 cursor-pointer"
            >
              + Create a playlist
            </Link>
          </div>

          <div className=" flex flex-wrap gap-6">
            {playlists.map((playlist) => {
              return <Link to={`/playlists/${playlist._id}`} className=" text-white w-1/6  text-center border border-gray-800 hover:shadow-md hover:shadow-red-600 rounded-md my-2 cursor-pointer py-3 flex gap-3 justify-center items-center">
                <h4>{playlist.name}</h4>
                <p className=" text-sm text-gray-500 italic">{playlist.isPrivate?"private":"public"}</p>
              </Link>;
            })}
          </div>
        </div>
        <div className=" py-4">
          <h2 className=" font-semibold text-white text-2xl mb-2">
            Recommended Movies
          </h2>
          <div className=" flex flex-wrap gap-6">
            <MovieCard key={"tt0120338"} id={"tt0120338"} />
            <MovieCard key={"tt2560140"} id={"tt2560140"} />
            <MovieCard key={"tt2560140"} id={"tt4154756"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
