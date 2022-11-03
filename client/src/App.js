import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
import Home from "./pages/Home";
import SearchMovies from "./pages/SearchMovies";
import MovieDetails from "./pages/MovieDetails";
import AddPlaylist from "./pages/AddPlaylist";
import PlayListDetails from "./pages/PlayListDetails";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["auth-token"] =
  localStorage.getItem("auth-token");

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem("auth-token") ? <Home /> : <Navigate to="/login" />
        }
      />
      <Route path="/login" element={localStorage.getItem("auth-token") ?<Navigate to="/" />: <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/movies" element={localStorage.getItem("auth-token") ? <SearchMovies/> : <Navigate to="/login" />} />
      <Route path="/movies/:imdbID" element={localStorage.getItem("auth-token") ? <MovieDetails/> : <Navigate to="/login" />} />
      <Route path="/addPlaylist" element={localStorage.getItem("auth-token") ? <AddPlaylist/> : <Navigate to="/login" />} />
      <Route path="/playlists/:id" element={<PlayListDetails />} />
    </Routes>
  );
};

export default App;
