import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { SiRottentomatoes } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { imdbID } = useParams();
  const [movie, setMovie] = useState({});
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    let instance = axios.create();
    delete instance.defaults.headers.common["auth-token"];
    
    instance
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${imdbID}`
      )
      .then((res) => {
        setMovie(res.data);
        
        axios.get("/playlists").then((res) => {
          setPlaylists(res.data);
          
        });
      })
      .catch((err) => {
        
      });
  }, [imdbID]);

  const playListHandler = (e) => {
    e.preventDefault();
    const playlistId = e.target[0].value;
    axios
      .post(`/playlists/${playlistId}`, { movie })
      .then((res) => {
        
        navigate("/")
      })
      .catch((err) => {
        
      });
  };

  return (
    <div className=" flex flex-col h-screen bg-black divide-y divide-gray-800">
      <Navbar />
      <div className=" flex-auto flex">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className=" h-full object-fit"
        />
        <div className=" h-full flex-auto text-white p-4 pl-6 flex flex-col gap-1">
          <h1 className=" text-3xl font-bold">{movie.Title}</h1>
          <p className=" text-gray-500">{movie.Year}</p>
          <p>{movie.Genre}</p>
          <p>{movie.Plot}</p>
          <div className=" flex gap-5 my-2">
            <div className=" flex gap-2 text-red-600 items-center">
              {movie.Ratings && movie.Ratings[1]?.Value}
              <SiRottentomatoes className=" text-red-600 text-xl" />
            </div>
            <div className=" flex gap-2 text-yellow-400 items-center">
              {movie?.Ratings && movie.Ratings[0]?.Value}
              <FaImdb className=" text-yellow-400 text-2xl" />
            </div>
          </div>
          <form onSubmit={playListHandler} className=" flex gap-2">
            <select name="" id="" className=" text-white bg-neutral-700 rounded-sm">
              <option value="initial" selected>
                choose a playlist
              </option>
              {playlists.map((playlist) => (
                <option value={playlist._id}>{playlist.name}</option>
              ))}
            </select>
            <button
              type="submit"
              className=" px-3 py-1 bg-red-600 text-white font-medium rounded-sm"
            >
              Add to playlist
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
