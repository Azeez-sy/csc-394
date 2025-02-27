import React, { useState } from 'react';
import trash from './icons/trash.png'
import edit from './icons/edit.png'
import singleUser from './icons/personal-user.png'
import groupUser from './icons/group-users.png'
import "../styles/note-list-view.css"

const NoteListView = ({ notes, setNotes, onAddClick, onDeleteNote, onEditNote }) => {
    const [noteType, setNoteType] = useState('all-notes');
    const [program, setProgram] = useState('all-programs');

    // filter notes
    const filteredNotes = notes.filter(note => {
      // Program Filter
      if (program !== 'all-programs' && !note.programName.toLowerCase().includes(program.replace('-', ' '))) {
        return false;
      }

      // Shared Filter
      if (noteType === 'personal-notes' && note.isShared) {
        return false;
      }
      if (noteType === 'shared-notes' && !note.isShared) {
        return false;
      }
            
      return true;
    });

    const getNoteIcon = (isShared) => {
      return isShared ? groupUser : singleUser;
    };

    const handleDelete = (noteId) => {
      if (window.confirm("Are you sure you want to delete this note?")) {
        onDeleteNote(noteId)
      }
    };
    
  
    return (
      <div className="notes-body">
      <div className="notes-wrapper">
        <div className="notes-header">
          <h1>Notes</h1>
        </div>
          <div className="notes-header-btn-filter">
            <div className="notes-filters">
            <select 
                  value={program} 
                  onChange={(e) => setProgram(e.target.value)}
                  className="notes-select"
                >
                  <option value="all-programs">All Programs</option>
                  <option value="program-1">Program 1</option>
                  <option value="program-2">Program 2</option>
              </select>
  
              <select 
                  value={noteType} 
                  onChange={(e) => setNoteType(e.target.value)}
                  className="notes-select"
                >
                  <option value="all-notes">All Notes</option>
                  <option value="shared-notes">Shared Notes</option>
                  <option value="personal-notes">Personal Notes</option>
                </select>
            </div>
            <button className="add-btn" onClick={onAddClick}>Add</button>
          </div>
          <div className="notes-list-container">
          <div className="notes-grid">
          {filteredNotes.map((note) => (
              <div className="note-item" key={note.id}>
                <div className='note-item-header'>
                  <div className='program'><p>{note.programName}</p></div>
                  <img src={getNoteIcon(note.isShared)} 
                  alt={note.isShared ? "Shared Note" : "Personal Note"} 
                  className="user-icon" />
                </div>
                <h3 className="note-final-title">{note.title}</h3>
                <p className='author-name'>{note.authorName}</p>
                <p className='description'>{note.description}</p>
                <p className='file'>File(s): {note.file}</p> 
              <div className="notes-item-footer">
                <div className='date-info'><p>{note.dateCreated}</p></div>
                <div className='button-group'> 
                  <button onClick={()=> onEditNote(note)}>
                      <img src={edit} alt="Modify" className="edit-icon"/>
                  </button>
                  <button onClick={()=> handleDelete(note.id)}>
                      <img src={trash} alt="Delete" className="trash-icon"/>
                  </button>
                </div>
              </div>
              </div>
            ))}
        
          </div>
        </div>
      </div>
    </div>
    );
  };
  export default NoteListView;