import React, { Component } from "react";
import NoteCard from "./NoteCard";
import "./component_styles/NotesContainer.css";

export class NoteContainer extends Component {
  render() {
    return (
      <div className="notes-container">
        {this.props.notes.map((note) => {
          return (
            <NoteCard
              note={note}
              key={note._id}
              deleteNote={this.props.deleteNote}
            />
          );
        })}
      </div>
    );
  }
}

export default NoteContainer;
