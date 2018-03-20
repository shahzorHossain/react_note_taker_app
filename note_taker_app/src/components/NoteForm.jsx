import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NoteForm.css";
import { Button } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";

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
        {/* className="noteInput"
           placeholder="Write a note here..."
           value={this.state.note}
     onChange={this.handleUserInput}
         /> */}
        <TextareaAutosize
          placeholder="Write a note here..."
          // style={{ height: "300px" }}
          minRows={20}
          style={{
            width: "1500px"
          }}
          value={this.state.note}
          onChange={this.handleUserInput}
        />

        <Button onClick={this.handleCLick}> Add Note </Button>
      </div>
    );
  }
}

export default NoteForm;
