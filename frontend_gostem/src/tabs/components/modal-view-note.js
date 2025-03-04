import React, { useState, useEffect } from 'react';
import Modal from './modal';
import "../styles/modal-view-note.css"
import document from "./icons/document.png"

const ModalViewNote = ({ isOpen, onClose, note }) => {

  const [noteDetails, setNoteDetails] = useState({
    title: "",
    content: "",
    file: "No files uploaded",
    program: "",
    noteType: "",
    author: "",
    dateCreated: ""
  });

  // Get note's info
  useEffect(() => {
    if (note) {
      setNoteDetails({
        title: note.title,
        content: note.description,
        file: note.file,
        program: note.programName,
        author: note.authorName || "Unknown",
        dateCreated: note.dateCreated || ""
      });
    }
  }, [note]);

  const handleModalClose = () => {
    onClose();
  };

  return (
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <div className="notes-wrapper">
          <div className="notes-header">
            <h1 className="notes-header-text">View Note</h1>
          </div>
          <div className="notes-viewer-container">
            <div className="note-view-content">
              <div className="note-view-metadata">
                <div className="note-view-program-type">
                  <span className="program-badge">{noteDetails.program}</span>
                </div>
                <h2 className="note-view-title">{noteDetails.title}</h2>
                <div className="note-view-author">
                  <span>Author: {noteDetails.author}</span>
                  <span>Created: {noteDetails.dateCreated}</span>
                </div>
              </div>
              
              <div className="note-view-description">
                <p>{noteDetails.content}</p>
              </div>
              
              {noteDetails.file && noteDetails.file !== "No files uploaded" && (
                <div className="note-view-files">
                  <h4>Attached Files:</h4>
                  <div className='file-preview'>
                    <div className="file-list">
                      {noteDetails.file.split(", ").map((fileName, index) => (
                        <div key={index} className="attached-file">
                          <span className='document-icon-container'>
                            <img src={document} alt="📄" className='document-icon'/>
                          </span>
                          <span className="file-name">{fileName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="view-notes-btns">
              <button className="close-note-btn" onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      </Modal>
  );
};

export default ModalViewNote;