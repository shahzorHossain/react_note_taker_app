//model/comments.js
"use strict";
//import dependency
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
const notesSchema = new Schema({
  note_content: String,
  note_id: String
  //   username: String,
  //   password: String
});
//export our module to use in server.js
module.exports = mongoose.model("notes", notesSchema);
