import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Note.css";
import axios from "axios";

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
  }

  handleRemoveNote(id) {
    var url = "http://localhost:8000/api/notes";

    var key;
    axios.get(url).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        if (id === res.data[i].note_id) {
          key = res.data[i]["_id"];

          break;
        }
      }

      this.props.removeNote(key, id);
    });
  }

  handleEditNote(id, note) {
    var url = "http://localhost:8000/api/notes/";
    var key;
    axios.get(url).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        if (id === res.data[i].note_id) {
          key = res.data[i]._id;
          this.props.editNote(key, note);
          break;
        }
      }
    });
  }

  render() {
    return (
      <div className="note fade-in">
        <span
          className="closebtn"
          onClick={() => this.handleRemoveNote(this.noteId)}
        >
          &times;
        </span>

        <p>{this.noteContent}</p>

        <span
          className="editbtn"
          onClick={() => this.handleEditNote(this.noteId, this.noteContent)}
        >
          <p>edit</p>
        </span>
      </div>
    );
  }
}

Note.PropTypes = {
  noteContent: PropTypes.string
};

export default Note;
