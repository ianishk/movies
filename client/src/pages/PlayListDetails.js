import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const PlayListDetails = () => {
  const params = useParams();
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`/playlists/${params.id}`)
      .then((res) => {
        
        setMovies(res.data.movies);
      })
      .catch((err) => {
        
        setError(err.message);
      });
  }, [params]);
  return (
    <div className="bg-black h-screen flex flex-col divide-y divide-gray-800">
      {!error && <Navbar />}
      <div className=" flex-auto px-8 overflow-y-scroll scrollcss flex flex-col items-center divide-y divide-gray-900">
        <h2 className=" text-white text-xl font-medium my-2">
          {!error && "Movies in this playlist"}
          {error && <p className=" font-bold text-red-600 text-3xl text-center">User not authenticated</p>}
        </h2>
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.imdbID}`}
            key={movie.imdbID}
            className=" w-1/2 flex gap-2 items-center py-2 cursor-pointer"
          >
            <img src={movie.Poster} alt={movie.Title} className=" w-20 h-20" />
            <div>
              <h1 className=" text-white">{movie.Title}</h1>
              <p className=" text-gray-400">{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlayListDetails;
