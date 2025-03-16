import React, { useState, useEffect } from 'react';
import "./styles/notes-page.css"
import Sidebar from './components/sidebar';
import NoteListView from './components/note-list-view';
import ModalAddNote from './components/modal-add-note';
import ModalEditNote from './components/modal-edit-note';
import ModalViewNote from './components/modal-view-note';
import BurgerMenu from './components/burger';

const NotesContent = ({ handleLogout }) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [isViewNote, setIsViewNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  // New state for toggling between My Notes and All Notes
  const [showAllNotes, setShowAllNotes] = useState(false);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchNotes();
  }, [showAllNotes]); // Re-fetch when view changes

  const fetchNotes = async () => {
    try {
      // Add query parameter for all notes
      const endpoint = showAllNotes 
        ? "http://localhost:8000/api/notes/?all=true" 
        : "http://localhost:8000/api/notes/";
      
      const response = await fetch(endpoint, {
        headers: { "Authorization": `Token ${authToken}` }
      });
      const data = await response.json();
      
      // Transform backend field names to match frontend expectations
      const transformedNotes = Array.isArray(data) ? data.map(note => ({
        id: note.id,
        title: note.title,
        description: note.content,          // Map content to description
        dateCreated: note.date_created,     // Map date_created to dateCreated
        dateModified: note.date_modified,   // Map date_modified to dateModified
        authorName: note.author_name,       // Map author_name to authorName
        programName: "All Programs",        // Default program name
        files: []                           // Default empty files array
      })) : [];
      
      setNotes(transformedNotes);
      console.log("Transformed notes:", transformedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]); 
    }
  };

  const addNote = async (newNote) => {
    try {
      const response = await fetch("http://localhost:8000/api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authToken}`
        },
        body: JSON.stringify(newNote)
      });
      if (response.ok) {
        fetchNotes();
        setIsAddingNote(false);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const updateNote = async (updatedNote, frontendData) => {
    try {
      // Send only the backend-compatible fields to the API
      const response = await fetch(`http://localhost:8000/api/notes/${updatedNote.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authToken}`
        },
        body: JSON.stringify(updatedNote)
      });
      
      if (response.ok) {
        // After successful update, refresh notes to get the latest data
        fetchNotes();
        setIsEditingNote(false);
        setCurrentNote(null);
      } else {
        // Add error handling for debugging
        const errorData = await response.json();
        console.error("API Error:", errorData);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/notes/${noteId}/`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${authToken}` }
      });
      if (response.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const viewNote = (note) => {
    setSelectedNote(note);
    setIsViewNote(true);
  };

  return (
    <div className="notes-page-container">
      <div className="burger-menu-container">
        <BurgerMenu />
      </div>
      <Sidebar handleLogout={handleLogout} />
      
      <div className="notes-content-area">
        {/* Updated view toggle to match hours-page style */}
        <div className="view-toggle">
          <button 
            className={!showAllNotes ? "active" : ""}
            onClick={() => setShowAllNotes(false)}
          >
            My Notes
          </button>
          <button 
            className={showAllNotes ? "active" : ""}
            onClick={() => setShowAllNotes(true)}
          >
            All Notes
          </button>
        </div>
        
        <NoteListView 
          notes={notes} 
          onAddClick={() => setIsAddingNote(true)} 
          onDeleteNote={deleteNote} 
          onEditNote={(note) => {
            setCurrentNote(note);
            setIsEditingNote(true);
          }}
          onViewNote={viewNote}
          showAllNotes={showAllNotes}
        />
        {isAddingNote && <ModalAddNote isOpen={isAddingNote} onClose={() => setIsAddingNote(false)} onAddNote={addNote} />}
        {isEditingNote && currentNote && <ModalEditNote isOpen={isEditingNote} onClose={() => setIsEditingNote(false)} onUpdateNote={updateNote} note={currentNote} />}
        {isViewNote && selectedNote && (
          <ModalViewNote 
            isOpen={isViewNote} 
            onClose={() => setIsViewNote(false)} 
            note={selectedNote} 
          />
        )}
      </div>
    </div>
  );
};

export default NotesContent;
