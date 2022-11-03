const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    movies: []
})

module.exports = mongoose.model("Playlist", playlistSchema);