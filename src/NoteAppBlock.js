import React from "react";
import { FaPlus } from "react-icons/fa";
import "./component_styles/NotesAppBlock.css";

export default function NoteAppBlock(props) {
  return (
    <li>
      <span onClick={() => props.updateAvailableNotes(props.app)}>
        {props.app}
      </span>
      <FaPlus
        onClick={(e) => {
          props.showCreateNewNoteDialog(props.app);
        }}
      />
    </li>
  );
}
