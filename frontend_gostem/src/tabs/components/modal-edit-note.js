import React, { useState, useEffect } from 'react';
import Modal from './modal';
import FileUploadZone from './drag-drop-files';
import "../styles/modal-add-note.css"

const ModalEditNote = ({ isOpen, onClose, onUpdateNote, note }) => {
  const [noteType, setNoteType] = useState('shared-notes');
  const [program, setProgram] = useState('program-1');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //const [file, setFile] = useState("No files uploaded");
  const [files, setFiles] = useState([]); // Initialize files as an array
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // Get note's info
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.description);
      
      /*if (note && note.attachments) {*/
      if (note.attachments) {
        setFiles(note.attachments); 
      } else {
          setFiles([]);
      }
      setProgram(note.programName.toLowerCase().includes('program 1') ? 'program-1' : 'program-2');
      setNoteType(note.isShared ? 'shared-notes' : 'personal-notes');
    }
  }, [note]);

  const handleModalClose = () => {
    setContentError("");
    setTitleError("");
    setTitle("");
    setContent("");
    setFiles([]);
    setProgram(note.programName.toLowerCase().includes('program 1') ? 'program-1' : 'program-2');
    setNoteType(note.isShared ? 'shared-notes' : 'personal-notes');
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

  // Error Message for 

  // Updates note
  const handleUpdateClick = (event) => {
    event.preventDefault();

    if(!validateTitle() ||!validateContent()) {return;}

    const programName = program === 'program-1' ? 'Program 1' : 'Program 2'
    const isShared = noteType === 'shared-notes';

    /*const updatedNote = {
      ...note,
      title: title.trim(),
      programName: programName,
      description: content,
      file: file,
      isShared: isShared
    };*/
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', content);
    formData.append('programName', programName);
    formData.append('isShared', isShared);
    //formData.append('authorName', "Your Author Name"); // Add author name
    console.log(files);
    /*if (Array.isArray(files)) {
      files.forEach(fileObject => {
          if (fileObject.file) {
              // This is a new file
              console.log("File to append:", fileObject.file); // Debugging

              formData.append('files', fileObject.file, fileObject.file.name);
          } else if(fileObject.id){
              //This is an already existing file.
              //Do nothing.
          } else {
              console.log("fileObject error: ", fileObject);
          }
      });
    }*/
    if (Array.isArray(files)) {
      files.forEach(fileObject => {
          if (fileObject instanceof File) {
              // New file
              formData.append('files', fileObject, fileObject.name);
          } else if (fileObject.id) {
              // Existing attachment
              formData.append('existing_attachments', fileObject.id); // Send existing attachment ID
          } else {
              console.log("fileObject error: ", fileObject);
          }
      });
    }

    //onUpdateNote(updatedNote);
    onUpdateNote(formData);
  };

  // Handle files - FIX --- does not work 
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
              <button className="add-note-btn" onClick={handleUpdateClick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
    </Modal>
  );
};

export default ModalEditNote;