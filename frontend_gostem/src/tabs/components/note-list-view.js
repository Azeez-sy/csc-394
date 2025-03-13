import React, { useState } from 'react';
import trash from './icons/trash.png'
import edit from './icons/edit.png'
import document from './icons/document.png'
import "../styles/note-list-view.css"

const NoteListView = ({ notes, onAddClick, onDeleteNote, onEditNote, onViewNote }) => {
    const [program, setProgram] = useState('all-programs');
    //const filteredNotes = [];
    // Filter notes
    const filteredNotes = notes.filter(note => {
      if (program !== 'all-programs' && !note.programName.toLowerCase().includes(program.replace('-', ' '))) {
        return false;
      }            
      return true;
    });

    const hasFiles = note => {
      /*if (note.files && Array.isArray(note.files) && note.files.length > 0) {
        return true;
      }*/
      if (note.attachments && note.attachments.length > 0 ){
        return note.attachments;
      }
      return false;//null;
      
      // Check if the note has a file string that's not "No files uploaded"
      /*if (note.file && note.file !== "No files uploaded" && note.file !== "") {
        return true;
      }
      
      return false;*/
    };

    const handleDelete = (e, noteId) => {
      e.stopPropagation();
      if (window.confirm("Are you sure you want to delete this note?")) {
        onDeleteNote(noteId)
      }
    };

    const handleEdit = (e, note) => {
      e.stopPropagation();
      onEditNote(note);
    }
      
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
  
            </div>
            <button className="add-btn" onClick={onAddClick}>Add</button>
          </div>
          <div className="notes-list-container">
          <div className="notes-grid">
          {filteredNotes.map((note) => (
              <div className="note-item" 
              key={note.id}
              onClick={()=> onViewNote(note)}>
                <div className='note-item-header'>
                  <div className='program'><p>{note.programName}</p></div>
                </div>
                <h3 className="note-final-title">{note.title}</h3>
                <p className='author-name'>{note.authorName}</p>
                {/*<p className='description'>{note.description}</p>
                <div className='file'>
                  <p>File(s):</p>
                  {note.attachments && note.attachments.length > 0 ? (
                    <ul>
                      {note.attachments.map((attachment, index) => (
                        <li key={index}>
                          <a href={attachment.file} target="_blank" rel="noopener noreferrer">
                            {attachment.file.split('/').pop()}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No files attached.</p>
                  )}
                  </div>*/}
                <p className='description'>
                  {note.description.length > 50 ?
                  `${note.description.substring(0, 50)}...` : note.description}
                </p>
                {hasFiles(note) && (
                  <div className="file-icon-container">
                    {/*<img src={document} alt="File attached" className="file-icon" />*/}
                    {[...Array(note.attachments.length)].map((_, index) => (
                      <img key={index} src={document} alt="File attached" className="file-icon" />
                    ))}
                  </div>
                )}
              <div className="notes-item-footer">
                <div className='date-info'><p>{note.dateCreated}</p></div>
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
            ))}
        
          </div>
        </div>
      </div>
    </div>
    );
  };
  export default NoteListView;