import React from "react";
import Modal from "./modal";
import "../styles/modal-view-note.css";

const ModalViewNote = ({ isOpen, onClose, note }) => {
  if (!note) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="notes-viewer-container">
        <h2 className="note-view-title">{note.title}</h2>
        
        <div className="note-view-description">
          <p>{note.description || note.content || "No description available"}</p>
        </div>
        
        <div className="note-view-metadata">
          <div className="note-view-program-type">
            <span className="program-badge">{note.programName || "All Programs"}</span>
          </div>
          
          <div className="note-view-author">
            <span>Created by {note.authorName || "Unknown"}</span>
            <span>Created: {new Date(note.dateCreated).toLocaleDateString()}</span>
            <span>Last modified: {new Date(note.dateModified).toLocaleDateString()}</span>
          </div>
        </div>
        
        {note.files && note.files.length > 0 && (
          <div className="note-view-files">
            <h4>Attached Files</h4>
            <div className="file-list">
              {note.files.map((file, index) => (
                <div key={index} className="attached-file">
                  <div className="document-icon-container">
                    <img src="/document-icon.svg" alt="Document" />
                  </div>
                  <div className="file-name">{file.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="view-notes-btns">
          <button className="close-note-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalViewNote;