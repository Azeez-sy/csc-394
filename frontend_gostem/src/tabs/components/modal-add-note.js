import React from 'react';
import Modal from './modal';
import FileUploadZone from './drag-drop-files';
import "../styles/modal-add-note.css"

const ModalAddNote = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="notes-wrapper">
          <div className="notes-header">
            <h1 className="notes-header-text">Add New Note</h1>
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
              <button className="cancel-note-btn" onClick={onClose}>Cancel</button>
              <button className="add-note-btn">Add Note</button>
              </div>
            </div>
          </div>
        </div>
    </Modal>
  );
};

export default ModalAddNote;