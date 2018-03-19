import React, { Component } from "react";
import logo from "./logo.svg";
import Note from "./components/Note";
import "./App.css";
import { Button } from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);

    //we are going to setup React state of our component
    this.state = {
      notes: [
        { noteContent: "Note 1 here", id: 1 },
        { noteContent: "Note 2 here", id: 2 }
      ]
    };
  }
  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">Welcome to our Note Taking App!</div>
        <div className="notesBody">
          {this.state.notes.map(note => {
            return (
              <Note
                noteContent={note.noteContent}
                noteId={note.id}
                key={note.id}
              />
            );
          })}
        </div>
        <div className="notesFooter">
          <h3> Footer will go here </h3>
        </div>
      </div>
    );
  }
}

export default App;
