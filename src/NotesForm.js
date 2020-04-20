import React, { Component } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import "./component_styles/NotesForm.css";

export class NotesForm extends Component {
  state = {
    version: null,
    application: "CEC",
    items: [{ title: "", summary: "" }],
  };
  removeNote = (noteIndex) => {
    const remainder = this.state.items.filter((note) => {
      if (this.state.items.indexOf(note) !== noteIndex) {
        return note;
      } else {
        return;
      }
    });
    this.setState({ items: remainder });
    return;
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.submitNotes({ formData: this.state });
  };
  handleChange = (e) => {
    if (["title", "summary"].includes(e.target.className)) {
      let items = [...this.state.items];
      items[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ items });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  newNote = (event) => {
    event.preventDefault();
    let currentNotes = [...this.state.items];
    this.setState({
      items: [...currentNotes, { title: "", summary: "" }],
    });
  };
  render() {
    return (
      <form onChange={this.handleChange}>
        <h3>Add New Release Note</h3>
        <label htmlFor="version">Version</label>
        <input type="text" name="version" placeholder="Version" />
        <label htmlFor="application">Application</label>
        <select name="application">
          <option value="CEC">CEC</option>
          <option value="CALENDAR">Calendar</option>
        </select>
        <div className="release-details">
          <h4>Release Note Details </h4>
          {this.state.items.map((noteItem, idx) => {
            let noteId = `note-${idx}`;
            let summaryId = `summary-${idx}`;
            return (
              <div key={noteId} className="release-note-item">
                <div className="release-note-option">
                  <FaTrashAlt
                    onClick={() => {
                      this.removeNote(idx);
                    }}
                  />
                </div>
                <label htmlFor={noteId}>Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  id={noteId}
                  name={noteId}
                  value={this.state.items[idx].title}
                  className="title"
                  onChange={this.handleChange}
                  data-id={idx}
                />

                <label htmlFor={summaryId}>Summary</label>
                <textarea
                  name={summaryId}
                  placeholder="Summary"
                  id={summaryId}
                  className="summary"
                  value={this.state.items[idx].summary}
                  onChange={this.handleChange}
                  data-id={idx}
                ></textarea>
              </div>
            );
          })}
          <button onClick={this.newNote}>
            <FaPlus />
          </button>
        </div>
        <div className="add-release-notes-actions">
          <button onClick={this.handleFormSubmit}>Add Notes</button>
          <button onClick={this.props.hideModal}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NotesForm;
