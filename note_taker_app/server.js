("use strict");

//first we import our dependencies…
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var keys = require("./config/keys.js");
var Note = require("./model/notes.js");
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001

const PORT = process.env.PORT || 8000;
//now we should configure the API to use bodyParser and look for
//JSON data in the request body

//db config
mongoose.connect(keys.mongoURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});
app.use("/api", router);

//now we can set the route path & initialize the API
router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});

//adding the /notes route to our /api router
//retrieve all comments from the database
router.route("/notes").get(function(req, res) {
  //looks at our Comment Schema
  Note.find(function(err, notes) {
    if (err) res.send(err);
    //responds with a json object of our database comments.
    res.json(notes);
  });
});
//post new note to the database
router.route("/notes").post((req, res) => {
  //   debugger;
  var note = new Note();
  //body parser lets us use the req.body
  console.log(req);
  note.note_id = req.body.noteId;
  note.note_content = req.body.noteContent;
  console.log(req.body);
  //   note.username = req.body.username;
  //   note.password = req.body.password;

  console.log(typeof req.body.noteContent);
  console.log("I am parsed");
  note.save(function(err) {
    // debugger;
    if (err) {
      //   debugger;
      console.log(err);
      res.send(err);
    }

    // debugger;
    console.log(note.note_id);
    console.log(note.note_content);
    res.send("Expense successfully added!");
  });
});
//Use our router configuration when we call /api

//Add this after our get and post routes
//Adding a route to a specific comment based on the database ID
router
  .route("/notes/:note_id")
  //The put method gives us the chance to update our comment based on
  //the ID passed to the route
  .put(function(req, res) {
    Note.findById(req.params.note_id, function(err, note) {
      if (err) res.send(err);

      console.log(note);
      console.log(req.body);

      //setting the new author and text to whatever was changed. If
      //nothing was changed we will not alter the field.
      req.body.noteContent ? (note.note_content = req.body.noteContent) : null;
      //   (req.body.text) ? comment.text = req.body.text : null;
      //save comment
      note.save(function(err) {
        if (err) res.send(err);
        res.json({ message: "Note has been updated" });
      });
    });
  });
//delete method for removing a comment from our database
router.route("/notes/:note_id").delete(function(req, res) {
  //selects the comment by its ID, then removes it.
  console.log(req.params);
  Note.remove({ _id: req.params.note_id }, function(err, note) {
    if (err) res.send(err);
    res.json({ message: "Note has been deleted" });
  });
});

//starts the server and listens for requests
app.listen(PORT, function() {
  console.log("api running on port " + PORT);
});
