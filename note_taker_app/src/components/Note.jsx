import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Note.css";

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
  }

  render() {
    return (
      <div className="note fade-in">
        <p>{this.noteContent}</p>
      </div>
    );
  }
}

Note.PropTypes = {
  noteContent: PropTypes.string
};

export default Note;
