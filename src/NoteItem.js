import React from "react";

export default function NoteItem(props) {
  return (
    <div className="note-item">
      <h4 className="note-item">{props.info.title}</h4>
      <p className="note-summary">{props.info.summary}</p>
    </div>
  );
}
