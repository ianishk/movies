import React, { useEffect, useState } from "react";
import { SiRottentomatoes } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieCard = ({ id }) => {
  const [movie, setMovie] = useState({});
  console.log(movie);
  useEffect(() => {
    let instance = axios.create();
    delete instance.defaults.headers.common["auth-token"];

    instance
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${id}`
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {});
  }, [id]);

  return (
    <Link
      to={`/movies/${id}`}
      className=" w-1/6 border border-gray-800 hover:shadow-md hover:shadow-red-600 flex flex-col rounded-md my-2 cursor-pointer"
    >
      <img
        src={movie.Poster}
        alt=""
        className=" w-full h-44 object-fit rounded-md"
      />
      <div className=" px-3 py-3 flex flex-col gap-2">
        <h3 className=" font-medium text-white text-xl">{movie.Title}</h3>
        <div className=" flex gap-3">
          <p className=" text-gray-400 text-sm">{movie.DVD}</p>
          <p className=" text-gray-400 text-sm">{movie.Runtime}</p>
        </div>
        <div className=" flex justify-between mt-1">
          <div className=" flex gap-2 text-red-600 items-center">
            {movie?.Ratings && movie.Ratings[1]?.Value}
            <SiRottentomatoes className=" text-red-600 text-xl" />
          </div>
          <div className=" flex gap-2 text-yellow-400 items-center">
            {movie.imdbRating}
            <FaImdb className=" text-yellow-400 text-2xl" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
