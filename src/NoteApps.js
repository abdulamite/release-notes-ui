import React from "react";
import "./component_styles/NotesAppSelection.css";
import NoteAppBlock from "./NoteAppBlock";

export default function NoteApps(props) {
  return (
    <div className="notes-app-selection">
      <h1>Release Notes</h1>
      <p>
        Use this tool to easily manage release notes for your applications. No
        more having to manually include relesse notes in your builds!
      </p>
      <div className="notes-app-list">
        {props.apps.map((item) => {
          return (
            <NoteAppBlock
              key={item}
              app={item}
              updateAvailableNotes={props.updateAvailableNotes}
              showCreateNewNoteDialog={props.showCreateNewNoteDialog}
            />
          );
        })}
      </div>
    </div>
  );
}
