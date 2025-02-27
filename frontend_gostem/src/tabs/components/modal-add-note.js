import React, { useState } from 'react';
import Modal from './modal';
import FileUploadZone from './drag-drop-files';
import "../styles/modal-add-note.css"

const ModalAddNote = ({ isOpen, onClose, onAddNote }) => {
  const [noteType, setNoteType] = useState('shared-notes');
  const [program, setProgram] = useState('program-1');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("No files uploaded");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // Resets modal after close
  const handleModalClose = () => {
    setContentError("");
    setTitleError("");
    setTitle("");
    setContent("");
    setFile("No files uploaded");
    setProgram('program-1');
    setNoteType('shared-notes');
    onClose();
  };

  // Error message for when a title is not inputted or exceeds 50 characters
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

  // Error message for when description exceeds 500 characters
  const validateContent = () => {
    setContentError("");
    if(content.length > 500){
      setContentError("Description cannot exceed 500 characters");
      return false;
    }
    return true;
  };

  // Creates a new note
  const handleAddClick = (event) => {
    event.preventDefault();

    if(!validateTitle() ||!validateContent()) {return;}
    
    const programName = program === 'program-1' ? 'Program 1' : 'Program 2';
    const isShared = noteType === 'shared-notes';
    
    const newNote = {
      title: title,
      noteTypeName: noteType,
      programName: programName,
      description: content,
      file: file,
      isShared: isShared
    };
    
    onAddNote(newNote);
    
    // Resets Modal after add
    
    setTitle("");
    setContent("");
    setFile("No files uploaded");
    setProgram('program-1');
    setNoteType('shared-notes');
  };

  // Handle file uploads - FIX
  const handleFileUpload = (uploadedFiles) => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      setFile(uploadedFiles.map(file => file.name || "Unnamed file").join(", "));
    } else {
      setFile("No files uploaded");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <div className="notes-wrapper">
          <div className="notes-header">
            <h1 className="notes-header-text">Add Note</h1>
          </div>
          <div className="notes-editor-container">
            <div>
              <form className="create-note" onSubmit={(event)=> handleAddClick(event)}> 
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
                <select 
                  value={program} 
                  onChange={(e) => setProgram(e.target.value)}
                  className="notes-select"
                >
                  <option value="program-1">Program 1</option>
                  <option value="program-2">Program 2</option>
                </select>
  
                <select 
                  value={noteType} 
                  onChange={(e) => setNoteType(e.target.value)}
                  className="notes-select"
                >
                  <option value="shared-notes">Shared Note</option>
                  <option value="personal-notes">Personal Note</option>
                </select>
              </div>
              <div>
                <FileUploadZone onFileUpload={handleFileUpload}/>
              </div>
              <div className="modify-notes-btns">
              <button className="cancel-note-btn" onClick={handleModalClose}>Cancel</button>
              <button className="add-note-btn" onClick={handleAddClick}>Add Note</button>
              </div>
            </div>
          </div>
        </div>
    </Modal>
  );
};

export default ModalAddNote;