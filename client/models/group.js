// Require Mongoose
const mongoose = require("mongoose");

// Create Schema for Group
const groupSchema = mongoose.Schema({
    room: String
});


// Create and export Group model
module.exports = mongoose.model("group", groupSchema);