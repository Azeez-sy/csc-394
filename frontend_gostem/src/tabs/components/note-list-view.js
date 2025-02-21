import React, { useState } from 'react';
import trash from './icons/trash.png'
import edit from './icons/edit.png'
import "../styles/note-list-view.css"

const NoteListView = ({ onAddClick }) => {
    const [noteType, setNoteType] = useState('all-notes');
    const [program, setProgram] = useState('all-programs');
  
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
            <div className="note-item">
              <h3 className="note-final-title">Note Title</h3>
              <p>Date Created:</p>
              <p>Date Modified:</p>
              <p>Author Name</p>
              <p>Program Name</p>
              <p>Note Description</p>
              <p>File(s)</p> 
              <div className="notes-item-footer">
                <button>
                    <img src={edit} alt="Modify" className="edit-icon"/>
                </button>
                <button>
                    <img src={trash} alt="Delete" className="trash-icon"/>
                </button>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
  export default NoteListView;