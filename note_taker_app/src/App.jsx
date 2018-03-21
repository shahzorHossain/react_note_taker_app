import React, { Component } from "react";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import axios from "axios";

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
    this.loadNotesFromServer = this.loadNotesFromServer.bind(this);
    this.editNote = this.editNote.bind(this);
  }

  addNote(note) {
    var prevNotes = this.state.notes;
    var url = "http://localhost:8000/api/notes";
    axios
      .post(url, { noteContent: note, noteId: prevNotes.length + 1 })
      .then(res => {
        console.log(res);
        prevNotes.push({ noteContent: note, id: prevNotes.length + 1 });
        this.setState({
          notes: prevNotes
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  removeNote(key, id) {
    var prevNotes = this.state.notes;
    var url1 = "http://localhost:8000/api/notes/";
    var url = url1.concat(String(key));

    for (var i = id; i < prevNotes.length; i++) {
      prevNotes[i] = { noteContent: prevNotes[i].noteContent, noteId: i };
    }
    prevNotes.splice(id - 1, 1);
    this.setState({
      notes: prevNotes
    });

    axios
      .delete(url, { data: { note_id: key } })
      .then(res => {
        console.log(res);
        console.log("Note deleted");
      })
      .catch(err => {
        console.error(err);
      });
  }

  loadNotesFromServer() {
    var prevNotes = this.state.notes;
    var url = "http://localhost:8000/api/notes";
    axios.get(url).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        prevNotes[i] = {
          noteContent: res.data[i].note_content,
          id: res.data[i].note_id
        };
      }
      this.setState({ notes: prevNotes });
    });
  }

  editNote(key, note) {
    var url = "http://localhost:8000/api/notes/";
    //var uniqueId = "";

    //sends the comment id and new author/text to our api
    axios.put("${url}/${key}", note).catch(err => {
      console.log(err);
    });
    this.loadNotesFromServer();
  }

  componentDidMount() {
    this.loadNotesFromServer();
    console.log("did it mount????");
    setInterval(this.loadNotesFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div>
        <div className="notesWrapper">
          <div className="notesHeader">Welcome to our Note Taking App!</div>
          <div>
            <NavigationBar />
          </div>

          <div className="notesBody">
            {this.state.notes.map(note => {
              return (
                <Note
                  noteContent={note.noteContent}
                  noteId={note.id}
                  //key={note.id}
                  removeNote={this.removeNote}
                  editNote={this.editNote}
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
