import React, { useState, useEffect } from 'react';
import Modal from './modal';
import "../styles/modal-add-note.css"

const ModalEditNote = ({ isOpen, onClose, onUpdateNote, note, programs}) => { // added programs parameter since this will contain all the program avaialble names -sky
  const [program, setProgram] = useState('');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // Get note's info
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      
      if(note.program){
        setProgram(note.program.id);
      }
    }
  }, [note]);

  const handleModalClose = () => {
    setContentError("");
    setTitleError("");
    onClose();
  };

  // Error Message for when a title is not inputted
  const validateTitle = () => {
    setTitleError("");

    if(!title.trim()) {
      setTitleError("Title is required");
      return false;
    }

    if(title.length > 50){
      setTitleError("Title cannot exceed 50 characters");
      return false
    }

    return true;
  };

  const validateContent = () => {
    setContentError("");
    if(content.length > 500){
      setContentError("Description cannot exceed 500 characters");
      return false;
    }
    return true;
  };

  // Update the handleUpdateClick function
  const handleUpdateClick = (event) => {
    event.preventDefault();
    
    if(!validateTitle() ||!validateContent()) {return;}
    
    // Create a backend-ready object with only the fields the API expects
    const updatedNote = {
      id: note.id,  // Keep the ID for the API endpoint
      title: title.trim(),
      content: content,  // Use "content" instead of "description"
      program_id: program
    };
    onUpdateNote(updatedNote);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <div className="notes-wrapper">
          <div className="notes-header">
            <h1 className="notes-header-text">Edit Note</h1>
          </div>
          <div className="notes-editor-container">
            <div>
              <form className="create-note" onSubmit={(event)=> handleUpdateClick(event)}> 
                <input
                value={title}
                onChange={(event)=> {
                  setTitle(event.target.value);
                  if (event.target.value.trim() && titleError) {
                    setTitleError("");
                  }
                }
                }
                placeholder="Title"
                className={titleError ? "error-input" : ""}
                />
                {titleError && <p className='error-message'>{titleError}</p>}
              
                <textarea
                  value={content}
                  onChange={(event)=> {
                    setContent(event.target.value);
                    if (contentError && event.target.value.length <= 500) {
                      setContentError("");
                    }
                  }
                  }
                  placeholder="Description"
                  rows={5}
                  className={contentError ? "error-input" : ""}
                />
                {contentError && <p className='error-message'>{contentError}</p>}
              </form>
              <div className="notes-filters-modal">
                {/* Display all available options for program names in select box - sy*/}
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="notes-select"
                >
                  {programs.map(p => (
                    <option key={p.id} value={p.id}>{p.program}</option>
                  ))}
                </select>
              </div>
              <div className="modify-notes-btns">
                <button className="cancel-note-btn" onClick={handleModalClose}>Cancel</button>
                <button className="add-note-btn" onClick={handleUpdateClick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
    </Modal>
  );
};

export default ModalEditNote;