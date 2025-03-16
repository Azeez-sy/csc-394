import React, { useState, useEffect } from 'react';
import Modal from './modal';
import FileUploadZone from './drag-drop-files';
import "../styles/modal-add-note.css"

const ModalEditNote = ({ isOpen, onClose, onUpdateNote, note }) => {
  const [program, setProgram] = useState('program-1');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // Get note's info
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.description);
      
      // If the note has a files array with actual File objects, use it directly
      if (note.files && Array.isArray(note.files) && note.files.length > 0) {
        
        const hasCompleteFileObjects = note.files.some(file => file.size !== undefined);
        
        if (hasCompleteFileObjects) {
          setFiles(note.files);
        } else {
          // Create mockFile objects with name property for display
          const mockFiles = note.files.map(file => ({
            name: file.name,
            size: 0,
            type: guessFileType(file.name),
            isMock: true
          }));
          setFiles(mockFiles);
        }
      } else {
        // Otherwise, check if we have file names as a string
        if (note.file && note.file !== "No files uploaded") {
          const fileNames = note.file.split(", ");
          const mockFiles = fileNames.map(name => ({
            name: name,
            size: 0,
            type: guessFileType(name),
            isMock: true
          }));
          setFiles(mockFiles);
        } else {
          setFiles([]);
        }
      }
      
      setProgram(note.programName.toLowerCase().includes('program 1') ? 'program-1' : 'program-2');
    }
  }, [note]);
  
  // Helper function to guess file type from name
  const guessFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'pdf':
        return 'application/pdf';
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      default:
        return 'application/octet-stream';
    }
  };

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

  // Updates note
  const handleUpdateClick = (event) => {
    event.preventDefault();

    if(!validateTitle() ||!validateContent()) {return;}

    const programName = program === 'program-1' ? 'Program 1' : 'Program 2';

    // Get file names as a comma-separated string
    const fileNames = files.length > 0 
      ? files.map(file => file.name).join(", ") 
      : "No files uploaded";

    const updatedNote = {
      ...note,
      title: title.trim(),
      programName: programName,
      description: content,
      file: fileNames,
      files: files, // Store the actual file objects for future use
    };

    onUpdateNote(updatedNote);
  };

  // Handle files 
  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);
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
                <select 
                  value={program} 
                  onChange={(e) => setProgram(e.target.value)}
                  className="notes-select"
                >
                  <option value="program-1">Program 1</option>
                  <option value="program-2">Program 2</option>
                </select>
              </div>
              <div>
                <FileUploadZone 
                  onFileUpload={handleFileUpload}
                  initialFiles={files}
                />
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