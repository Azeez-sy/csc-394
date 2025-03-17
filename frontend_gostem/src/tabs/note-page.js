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
  // Add this with other state variables
  const [programFilter, setProgramFilter] = useState('all-programs');

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchNotes();
  }, [showAllNotes, programFilter]); // Re-fetch when view or program filter changes

  const fetchNotes = async () => {
    try {
      // Start with base URL without query parameters
      let endpoint = "http://localhost:8000/api/notes/";
      
      // Create array to hold query parameters
      const queryParams = [];
      
      // Add the "all" parameter when showing all notes
      if (showAllNotes) {
        queryParams.push("all=true");
      }
      
      // Add program filter if selected and it's not "All Programs"
      if (programFilter && programFilter !== 'all-programs') {
        const programValue = programFilter === 'program-1' ? 'Program 1' : 'Program 2';
        queryParams.push(`program=${encodeURIComponent(programValue)}`);
      }
      
      // Append query parameters to endpoint if we have any
      if (queryParams.length > 0) {
        endpoint += `?${queryParams.join('&')}`;
      }
      
      console.log("Fetching notes from:", endpoint); // For debugging
      
      const response = await fetch(endpoint, {
        headers: { "Authorization": `Token ${authToken}` }
      });
      
      const data = await response.json();
      
      // Transform backend field names to match frontend expectations
      const transformedNotes = Array.isArray(data) ? data.map(note => ({
        id: note.id,
        title: note.title,
        description: note.content,
        dateCreated: note.date_created,
        dateModified: note.date_modified,
        authorName: note.author_name,
        programName: note.program || "All Programs",
        files: []
      })) : [];
      
      setNotes(transformedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  const addNote = async (newNote) => {
    try {
      // Extract program name from the frontend-style program identifier
      let program = null;
      if (newNote.program) {
        program = newNote.program === 'program-1' ? 'Program 1' : 'Program 2';
      }
      
      // Create a backend-compatible object
      const noteData = {
        title: newNote.title,
        content: newNote.content,
        program: program
      };
      
      const response = await fetch("http://localhost:8000/api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authToken}`
        },
        body: JSON.stringify(noteData)
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
      // Add program information from frontendData
      const noteDataForBackend = {
        ...updatedNote,
        program: frontendData?.programName || null
      };
      
      const response = await fetch(`http://localhost:8000/api/notes/${updatedNote.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authToken}`
        },
        body: JSON.stringify(noteDataForBackend)
      });
      
      if (response.ok) {
        fetchNotes();
        setIsEditingNote(false);
        setCurrentNote(null);
      } else {
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
        headers: {
          "Authorization": `Token ${authToken}`
        }
      });
      
      if (response.ok) {
        fetchNotes(); // Refresh notes after successful deletion
        return { success: true };
      } else {
        const errorData = await response.json();
        return { 
          error: errorData.detail || "You can only delete your own notes."
        };
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      return { 
        error: "Failed to delete note. You can only delete your own notes."
      };
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
          programFilter={programFilter}
          onProgramFilterChange={setProgramFilter}
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
