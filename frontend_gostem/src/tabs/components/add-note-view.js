import React from 'react';
import FileUploadZone from "../components/drag-drop-files";
import "../styles/add-note-view.css"

const AddNoteView = ({ onCancel }) => {

    // functions to call api's
    //fetch notes
    //create a note
    //load notes
  
    // collect files
    // prepare for file upload
    // send files to backedn
    // display upload progress
    // show stored file list
  
  
    //do you store the date?
    //share button?
    //what should edit do?
  
    return (
      <div className="notes-body">
        <div className="notes-wrapper">
          <div className="notes-header">
            <h1>Notes</h1>
          </div>
          <div className="notes-editor-container">
            <div>
              <form className="create-note">
                <input
                name="title"
                type="text"
                placeholder="Title"
                />
                <textarea
                  name="description"
                  type="text"
                  placeholder="Description"
                  rows={3}
                />
              </form>
              <div>
                <FileUploadZone />
              </div>
              <div className="modify-notes-btns">
              <button className="cancel-note-btn" onClick={onCancel}>Cancel</button>
              <button className="add-note-btn">Add Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AddNoteView;