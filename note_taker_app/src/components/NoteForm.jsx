import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NoteForm.css";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: ""
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleCLick = this.handleCLick.bind(this);
  }

  handleUserInput(e) {
    this.setState({
      note: e.target.value
    });
  }

  handleCLick() {
    this.props.addNote(this.state.note);

    this.setState({
      note: ""
    });
  }

  render() {
    return (
      <div>
        <input
          className="noteInput"
          placeholder="Write a note here..."
          value={this.state.note}
          onChange={this.handleUserInput}
        />
        <button className="noteButton" onClick={this.handleCLick}>
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteForm;
