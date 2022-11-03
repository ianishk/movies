const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Playlist = require("../models/playlist");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const user = require("../middlewares/user");

// get all the playlist of the user
router.get("/", auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ creator: req.user._id });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// creates a new playlist
router.post("/", auth, async (req, res) => {
  const { name, isPrivate } = req.body;
  try {
    const newPlaylist = new Playlist({
      creator: req.user._id,
      name,
      isPrivate,
      movies: [],
    });
    const savedPlaylist = await newPlaylist.save();
    res.status(201).json(savedPlaylist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// deletes a playlist
router.delete("/", auth, async (req, res) => {
  const { playlistId } = req.body;
  try {
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (playlist.creator == req.user._id) {
      await playlist.remove();
      res.json({ message: "playlist deleted" });
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// gets a playlist by id
router.get("/:id", user, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ _id: req.params.id });
    if (playlist.isPrivate) {
      if (req.user && playlist.creator == req.user._id) {
        res.json(playlist);
      } else {
        res.status(401).json({ message: "not authorized" });
      }
    } else {
      res.json(playlist);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// adds a movie to a playlist
router.post("/:id", auth, async (req, res) => {
  const { movie } = req.body;
  try {
    const playlist = await Playlist.findOne({ _id: req.params.id });
    if (playlist.creator == req.user._id) {
      playlist.movies.push(movie);
      const savedPlaylist = await playlist.save();
      res.status(201).json(savedPlaylist);
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// deletes a movie from a playlist
router.delete("/:id", auth, async (req, res) => {
  const { imdbID } = req.body;
  try {
    const playlist = await Playlist.findOne({ _id: req.params.id });
    if (playlist.creator == req.user._id) {
      playlist.movies.splice(playlist.movies.indexOf(imdbID), 1);
      const savedPlaylist = await playlist.save();
      res.status(201).json(savedPlaylist);
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
