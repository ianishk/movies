import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const SearchMovies = () => {
  const [params] = useSearchParams();
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    let instance = axios.create();
    delete instance.defaults.headers.common["auth-token"];
    
    instance
      .get(
        `http://www.omdbapi.com/?apikey=${
          process.env.REACT_APP_OMDB_KEY
        }&s=${params.get("s")}`
      )
      .then((res) => {
        setMovies(res.data.Search);
      })
      .catch((err) => {
        
      });
  }, [params]);
  return (
    <div className=" bg-black h-screen flex flex-col divide-y divide-gray-800">
      <Navbar />
      <div className=" px-8 overflow-y-scroll scrollcss flex flex-col items-center divide-y divide-gray-900">
        <h2 className=" text-white text-xl font-medium my-2">
          {movies?.length} results for "{params.get("s")}"
        </h2>
        {movies?.map((movie) => (
          <Link to={`/movies/${movie.imdbID}`} key={movie.imdbID} className=" w-1/2 flex gap-2 items-center py-2 cursor-pointer">
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

export default SearchMovies;
