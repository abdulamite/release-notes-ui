import React, { Component } from "react";
import "./component_styles/App.css";
import Modal from "react-modal";
import NavBar from "./Nav";
import NotesForm from "./NotesForm";
import NoteApps from "./NoteApps";
import NoteContainer from "./NotesContainer";
import DeleteNoteDialog from "./DeleteNoteDialog";

Modal.setAppElement("body");

const customStyles = {
  content: {
    maxHeight: "80vh",
    width: "40vw",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    overflow: "scroll",
    transform: "translate(-50%, -50%)",
  },
};

export class App extends Component {
  state = {
    notes: [],
    selectedNote: {},
    modalIsOpen: false,
    applications: ["CEC", "CALENDAR"],
  };
  updateAvailableNotes = (application) => {
    fetch(`http://localhost:3001/notes/${application}`)
      .then((response) => {
        return response.json();
      })
      .then((notes) => {
        let notesCopy = { ...this.state.notes, notes };
        this.setState(notesCopy);
      });
  };
  showDeleteNoteDialog = (note) => {
    this.setState({ modalIsOpen: true, selectedNote: note });
  };
  showCreateNewNoteDialog = () => {
    this.setState({ modalIsOpen: true });
  };
  refreshNotes = () => {
    fetch("http://localhost:3001/notes/")
      .then((response) => {
        return response.json();
      })
      .then((notes) => {
        let notesCopy = { ...this.state.notes, notes };
        this.setState(notesCopy);
      });
  };
  deleteNote = async () => {
    await fetch(
      `http://localhost:3001/notes/delete-note/${this.state.selectedNote._id}`,
      { method: "DELETE" }
    ).then(() => {
      this.refreshNotes();
      this.setState({ modalIsOpen: false });
    });
  };
  showModal = () => {
    if (JSON.stringify(this.state.selectedNote) !== "{}") {
      return (
        <DeleteNoteDialog
          deleteNote={this.deleteNote}
          selectedNote={this.state.selectedNote}
          hideModal={() => {
            this.setState({ modalIsOpen: false, selectedNote: {} });
          }}
        />
      );
    } else {
      return (
        <NotesForm
          submitNotes={this.submitNotes}
          selectedApplication={this.selectedApplication}
          hideModal={() => {
            this.setState({ modalIsOpen: false, selectedNote: {} });
          }}
        />
      );
    }
  };
  submitNotes = async (formState) => {
    let formData = formState.formData;
    if (formData.version && formData.application && formData.items.length > 0) {
      let formBody = {
        released: false,
        version: formData.version,
        items: formData.items,
        application: formData.application,
      };
      await fetch(`http://localhost:3001/notes/add-note/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      }).then((res) => {
        console.log(res);
        this.refreshNotes();
        this.setState({ modalIsOpen: false });
      });
    } else {
      console.log("Form has not been completed");
      return;
    }
  };
  componentDidMount = async () => {
    this.refreshNotes();
  };
  render() {
    return (
      <div className="container">
        <div className="notes-manager">
          <Modal
            isOpen={this.state.modalIsOpen}
            style={customStyles}
            onRequestClose={() => {
              this.setState({ modalIsOpen: false, selectedNote: {} });
            }}
          >
            {this.showModal()}
          </Modal>
          <NavBar />
          <NoteApps
            apps={this.state.applications}
            updateAvailableNotes={this.updateAvailableNotes}
            showCreateNewNoteDialog={this.showCreateNewNoteDialog}
          />
          <NoteContainer
            notes={this.state.notes}
            deleteNote={this.showDeleteNoteDialog}
          />
        </div>
      </div>
    );
  }
}

export default App;
