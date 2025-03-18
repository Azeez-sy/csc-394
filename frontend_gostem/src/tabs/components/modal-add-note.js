import React, { useState, useEffect } from 'react';
import Modal from './modal';
import FileUploadZone from './drag-drop-files';
import "../styles/modal-add-note.css";


const ModalAddNote = ({ isOpen, onClose, onAddNote, programs }) => {
  const [program, setProgram] = useState(''); // Correctly declared
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [programId, setProgramId] = useState(''); // Store the program ID
  const [programName, setProgramName] = useState(''); // Store the program Name

  // Resets modal after close
  const handleModalClose = () => {
    setContentError("");
    setTitleError("");
    setTitle("");
    setContent("");
    setFiles([]);
    setProgram("");
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
  /*const handleAddClick = (event) => {
    event.preventDefault();

    if(!validateTitle() ||!validateContent()) {return;}
    
    const programName = program === 'program-1' ? 'Program 1' : 'Program 2';
    
    // Getting filenames
    const fileNames = files.length > 0 
      ? files.map(file => file.name).join(", ") 
      : "No files uploaded";

    const newNote = {
      title: title,
      programName: programName,
      description: content,
      file: fileNames,
      files: files
    };
    
    onAddNote(newNote);
    
    // Resets Modal after add
    setTitle("");
    setContent("");
    setFiles("No files uploaded");
    setProgram('program-1');
    setNoteType('shared-notes');
  };*/

  const handleProgramChange = (e) => {
    const selectedId = e.target.value;
    setProgramId(selectedId);
    const selectedProgram = programs.find(p => p.id === parseInt(selectedId));
    if (selectedProgram) {
        setProgramName(selectedProgram.program);
    } else {
        setProgramName('');
    }
  };

  const handleAddClick = async (event) => {
    event.preventDefault();

    if (!validateTitle() || !validateContent()) {
        return;
    }

    //const programName = program === 'program-1' ? 'Program 1' : 'Program 2';
    //const isShared = noteType === 'shared-notes';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', content);
    console.log("program = "+program)
    formData.append('programId', programId); // Send the program ID
    formData.append('programName', programName); // Send the program name
    //formData.append('isShared', isShared);
    //formData.append('authorName', "Your Author Name"); // Add author name
    console.log(files)
    if(files.length !== 0){ // just don't do anything if no files are added
      files.forEach(file => {
        formData.append('files', file); // Append each file
      });
    }

    console.log("FormData:", formData.get('file'));

    try {
        
        onAddNote(formData);
        handleModalClose(); // Reset the modal after adding
    } catch (error) {
        console.error('Error adding note:', error.response.data);
    }
};

  // Handle file uploads - FIX
  /*
  const handleFileUpload = (uploadedFiles) => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      setFile(uploadedFiles.map(file => file.name || "Unnamed file").join(", "));
    } else {
      setFile("No files uploaded");
    }
  };*/
  /*const handleFileUpload = (uploadedFiles) => {
    if (uploadedFiles && uploadedFiles.length > 0) {
        console.log("File Object Received:", uploadedFiles[0]);
        setFile(uploadedFiles[0]);
    } else {
        setFile(null);
    }
  };*/
  /*const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };*/
  const handleFileUpload = (uploadedFiles) => {
  
    setFiles(uploadedFiles);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <div className="notesModal-wrapper">
          <div className="notesModal-header">
            <h1 className="notes-header-text">Add Note</h1>
          </div>
          <div className="notes-editor-container">
            <div>
              <form className="create-note" onSubmit={handleAddClick}> 
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
                  key={"selectInput"}
                  value={programId}
                  onChange={handleProgramChange}
                  className="notes-select"
                >
                    <option value="" disabled>Select a Program</option>
                    {Array.isArray(programs) && programs.length > 0 ? (
                        programs.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.program}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>Loading programs...</option>
                    )}
                </select>
              </div>
              <div>
                <FileUploadZone onFileUpload={handleFileUpload}/>
                {/*<input type="file" onChange={handleFileUpload} />*/}
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