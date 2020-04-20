import React from "react";

export default function DeleteNoteDialog(props) {
  return (
    <div>
      <h3>Are you sure you would like to delete the following release note?</h3>
      <div className="code-block">
        <code>{JSON.stringify(props.selectedNote, null, 2)}</code>
      </div>
      <div className="delete-notes-modal-selection">
        <button onClick={props.deleteNote}>Delete</button>
        <button onClick={props.hideModal}>Cancel</button>
      </div>
    </div>
  );
}
