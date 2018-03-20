import React, { Component } from "react";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import { Label, Button } from "semantic-ui-react";
import NavigationBar from "./components/NavigationBar";
import "./App.css";
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    //we are going to setup React state of our component
    this.state = {
      notes: [
        {
          noteContent:
            "Hey Nanoleaf! This is my project using React, Node, and MongoDB.",
          id: 1
        },
        {
          noteContent:
            "It should be intuitive enough to figure out the commands!",
          id: 2
        }
      ]
    };
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  addNote(note) {
    var prevNotes = this.state.notes;
    prevNotes.push({ noteContent: note, id: prevNotes.length + 1 });
    this.setState({
      notes: prevNotes
    });
  }

  removeNote(id) {
    var prevNotes = this.state.notes;
    for (var i = id; i < prevNotes.length; i++) {
      //console.log(i);

      prevNotes[i] = { noteContent: prevNotes[i].noteContent, noteId: i };
    }
    // console.log(prevNotes);
    prevNotes.splice(id - 1, 1);

    this.setState({
      notes: prevNotes
    });
    console.log(prevNotes);
  }

  render() {
    return (
      <div>
        <div className="notesWrapper">
          <div className="notesHeader">Welcome to our Note Taking App!</div>
          <div>
            {/* <Button floated="right" size="large">
              Sign In
            </Button> */}
            <NavigationBar />
          </div>

          <div className="notesBody">
            {this.state.notes.map(note => {
              return (
                <Note
                  noteContent={note.noteContent}
                  noteId={note.id}
                  key={note.id}
                  removeNote={this.removeNote}
                />
              );
            })}
          </div>
          <div className="notesFooter">
            <NoteForm addNote={this.addNote} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
