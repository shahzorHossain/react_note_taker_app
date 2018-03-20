import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Note.css";

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  handleRemoveNote(id) {
    this.props.removeNote(id);
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
      </div>
    );
  }
}

Note.PropTypes = {
  noteContent: PropTypes.string
};

export default Note;
