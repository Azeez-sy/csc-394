import React, { useState, useEffect } from 'react';
import Modal from './modal';
import "../styles/modal-view-note.css"
import "../components/download-note"
import DownloadButton from '../components/download-note';
import documentpic from './icons/document.png'

//import document from "./icons/document.png"

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
    if (note && note.attachments && Array.isArray(note.attachments)) {
      setNoteDetails({
        title: note.title,
        content: note.description,
        attachments: note.attachments,
        program: note.programName,
        author: note.authorName || "Unknown",
        dateCreated: note.dateCreated || ""
      });
    }
  }, [note]);

  const handleModalClose = () => {
    onClose();
  };

  const handleDownload = (fileName) => {
    fetch(`http://localhost:8000/media/note_attachments/${fileName}`, {
        method: 'GET',
        responseType: 'blob',
    })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            console.log("document:", document);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
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
              
              {noteDetails.attachments && noteDetails.attachments.length > 0 && (
                <div className="note-view-files">
                  <h4>Attached Files:</h4>
                  <div className='file-preview'>
                    <div className="file-list">
                      {noteDetails.attachments.map((attachment, index) => (
                        <div key={index} className="attached-file">
                          <span className='document-icon-container'>
                            <img src={documentpic} alt="📄" className='document-icon' />
                          </span>
                          {/*<a
                            onClick={(event) => {
                              event.preventDefault(); // Prevent default link navigation
                              handleDownload(attachment.file.split('/').pop());
                            }}
                            href={attachment.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-name"
                            download
                          >
                            {attachment.file.split('/').pop()}
                          </a>
                          <button
                            onClick={() => handleDownload(attachment.file.split('/').pop())}
                            className="file-name"
                            >
                            {attachment.file.split('/').pop()}
                        </button>*/}
                          <DownloadButton
                            filename = {attachment.file.split('/').pop()}
                            attachment = {attachment}
                          />
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