import React, { useState } from 'react';
import trash from './icons/trash.png'
import edit from './icons/edit.png'
import document from './icons/document.png'
import "../styles/note-list-view.css"
import { Link } from 'react-router-dom'; // needed to link to program page - sky

const NoteListView = ({ 
  notes = [], 
  onAddClick, 
  onDeleteNote, 
  onEditNote, 
  onViewNote, 
  programFilter, 
  onProgramFilterChange,
  programs // Added to get all available programs - sky
}) => {

  // Keep only the toast error state, remove errorMessage and showError
  const [errorToast, setErrorToast] = useState({
    show: false,
    message: "",
    position: { x: 0, y: 0 }
  });

  // Use programFilter from props instead of local state
  const handleProgramChange = (e) => {
    if (onProgramFilterChange) {
      onProgramFilterChange(e.target.value);
    }
  };

  // Add this helper function to format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', 
        day: 'numeric'
    });
  };

  // Filter notes
  const filteredNotes = notes.filter(note => {
    if (programFilter === 'all-programs') {
      return true; // Show all notes when "All Programs" is selected
    }
    
    if (!note.program || !note.program.program) {
      return false; // Skip notes without the selected program name
    }

    // Check if true
    return note.program.id === parseInt(programFilter);
  });

  const hasFiles = note => {
    if (note.files && Array.isArray(note.files) && note.files.length > 0) {
      return true;
    }
    
    // Check if the note has a file string that's not "No files uploaded"
    if (note.file && note.file !== "No files uploaded" && note.file !== "") {
      return true;
    }
    
    return false;
  };

  // Updated handleDelete function
  const handleDelete = async (e, noteId) => {
    e.stopPropagation();
    
    // Get position for the toast
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left,
      y: rect.bottom + window.scrollY + 10 // 10px below the button
    };
    
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const result = await onDeleteNote(noteId);
        
        // If deletion failed due to permissions
        if (result && result.error) {
          // Show toast instead of modal
          setErrorToast({
            show: true,
            message: result.error || "You can only delete your own notes",
            position
          });
        }
      } catch (error) {
        // Handle any other errors with toast
        setErrorToast({
          show: true,
          message: "You can only delete your own notes",
          position
        });
      }
    }
  };

  const handleEdit = (e, note) => {
    e.stopPropagation();
    onEditNote(note);
  }

  const handleViewNote = (note) => {
    if (onViewNote) {
      onViewNote(note);
    }
  }

  // Remove the ErrorPopup component and keep only the toast
  
  // Toast component within your component
  const ErrorToast = () => {
    // Auto-hide after 3 seconds
    React.useEffect(() => {
      if (errorToast.show) {
        const timer = setTimeout(() => {
          setErrorToast(prev => ({ ...prev, show: false }));
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [errorToast.show]);

    if (!errorToast.show) return null;
    
    return (
      <div 
        className="error-toast"
        style={{
          left: `${errorToast.position.x}px`,
          top: `${errorToast.position.y}px`
        }}
      >
        <p>{errorToast.message}</p>
      </div>
    );
  };
    
  return (
    <div className="notes-body">
    <div className="notes-wrapper">
      <div className="notes-header">
        <h1>Notes</h1>
      </div>
        <div className="notes-header-btn-filter">
          <button className="add-btn" onClick={onAddClick}>Add Note</button>
          <div className="notes-filters">
          <select 
            value={programFilter || 'all-programs'} 
            onChange={handleProgramChange}
            className="notes-select"
          >
                <option value="all-programs">All Programs</option>
                {/* Maping through all available programs to populate the dropdown */}
                {programs && programs.map(program => (
              <option key={program.id} value={program.id}>
                {program.program}
              </option>
            ))}
          </select>

          </div>
          <Link className="link" to="/programs-manager">
              <button className="burger-image-button">
                <span className="burger-button-text">Add Program</span>
              </button>
          </Link>
        </div>
        <div className="notes-list-container">
          <div className="notes-grid">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => { 
                return ( 
                    <div className="note-item" 
                        key={note.id}
                        onClick={()=> handleViewNote(note)}>
                        <div className='note-item-header'>
                            <div className='program'>
                                <p>{note.program && note.program.program}</p>
                            </div>
                        </div>
                        <h3 className="note-final-title">{note.title}</h3>
                        <p className='author-name'>{note.author_name}</p>
                        <p className='description'>
                            {note.description && note.description.length > 50 
                                ? `${note.description.substring(0, 50)}...` 
                                : (note.description || note.content || "No description")}
                        </p>
                        {hasFiles(note) && (
                            <div className="file-icon-container">
                                <img src={document} alt="File attached" className="file-icon" />
                            </div>
                        )}
                        <div className="notes-item-footer">
                            <div className='date-info'><p>{formatDate(note.date_created)}</p></div>
                            <div className='button-group'> 
                                <button onClick={(e)=> handleEdit(e, note)}>
                                    <img src={edit} alt="Modify" className="edit-icon"/>
                                </button>
                                <button onClick={(e)=> handleDelete(e, note.id)}>
                                    <img src={trash} alt="Delete" className="trash-icon"/>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <div className="no-notes-message">
                <p>No notes available. Click "Add Note" to create one.</p>
            </div>
        )}
          </div>
        </div>
    </div>
    {/* Remove ErrorPopup and keep only ErrorToast */}
    <ErrorToast />
  </div>
  );
};
export default NoteListView;