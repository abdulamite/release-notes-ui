import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import NoteItem from "./NoteItem";
import "./component_styles/NoteCard.css";

export default function NoteCard(props) {
  return (
    <div className="note-card">
      <div className="note-card-options">
        <span>
          <FaPencilAlt />
        </span>
        <span
          onClick={() => {
            props.deleteNote(props.note);
          }}
        >
          <FaTrashAlt />
        </span>
      </div>
      <p className="version">{props.note.version_number}</p>
      <h3>{props.note.application.toUpperCase()}</h3>
      <div className="items">
        {props.note.items.map((item, index) => {
          return (
            <NoteItem
              info={item}
              key={props.note.version_number + index.toString()}
            />
          );
        })}
      </div>
      <span className="notes-are-released">
        {props.note.released ? "Released" : ""}
      </span>
    </div>
  );
}
