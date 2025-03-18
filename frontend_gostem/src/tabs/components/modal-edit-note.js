import React, { useState, useEffect } from 'react';
import Modal from './modal';
import FileUploadZone from './drag-drop-files';
import "../styles/modal-add-note.css"

const ModalEditNote = ({ isOpen, onClose, onUpdateNote, note, programs }) => {
  const [programId, setProgramId] = useState('');
  const [programName, setProgramName] = useState('');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]); // Initialize files as an array
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [deleteAttachments, setDeleteAttachments] = useState([]);


  // Get note's info
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.description);
      
      /*if (note && note.attachments) {*/
      /*if (note.attachments) {
        setFiles(note.attachments); 
      } else {
          setFiles([]);
      }*/
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
      setProgramId(note.programId === null || note.programId === undefined ? "" : note.programId);
      setProgramName(note.programName);
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
    setTitle("");
    setContent("");
    setFiles([]);
    setProgramId("");
    setProgramName("");
    setDeleteAttachments([]);
    //setNoteType(note.isShared ? 'shared-notes' : 'personal-notes');
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
      alert(titleError);
      return false
    }

    return true;
  };

  const validateContent = () => {
    setContentError("");
    if(content.length > 500){
      setContentError("Description cannot exceed 500 characters");
      alert(contentError);
      return false;
    }
    return true;
  };

  // delete previous note attachments
  useEffect(() => {
    console.log("Updated deleteAttachments:", deleteAttachments);
  }, [deleteAttachments]);

  const handleAttachmentDeletion = (attachmentId, attachment, checked) => {
    console.log("Before update:", deleteAttachments);
    console.log("id = ", attachment);
    console.log(attachment);
    console.log("checked:", checked); // Add this line
    console.log("type of delete attachments", typeof attachment.id)



    if (checked) {
        setDeleteAttachments([...deleteAttachments, attachment.id]); // Correct way to add an element
    } else {
        console.log(typeof deleteAttachments);
        setDeleteAttachments(deleteAttachments.filter(id => id !== attachment.id)); // Correct way to remove an element
    }
    console.log("After update:", deleteAttachments);
  };

  // handle program change:
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

  // Updates note
  const handleUpdateClick = (event) => {
    event.preventDefault();

    if(!validateTitle() ||!validateContent()) {return;}

    // Get file names as a comma-separated string
    const fileNames = files.length > 0 
      ? files.map(file => file.name).join(", ") 
      : "No files uploaded";

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
    formData.append('programId', programId); 
    formData.append('programName', programName);
    formData.append('documents_attached', deleteAttachments);
    //formData.append('isShared', isShared);
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
                  value={programId} // Set value to programId
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
                <FileUploadZone 
                  onFileUpload={handleFileUpload}
                  initialFiles={files}
                />
              </div>
              <h4>Remove Old Files</h4>
              {note.attachments && note.attachments.map(attachment => (
                <div key={attachment.id}>
                  <input
                    type="checkbox"
                    onChange={(e) => handleAttachmentDeletion(attachment.id, attachment, e.target.checked)}
                  />
                  <span> {attachment.file.split('/').pop()}</span>
                </div>
              ))}
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