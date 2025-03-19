import React, { useState, useEffect } from 'react';
import "./styles/notes-page.css"
import Sidebar from './components/sidebar';
import NoteListView from './components/note-list-view';
import ModalAddNote from './components/modal-add-note';
import ModalEditNote from './components/modal-edit-note';
import ModalViewNote from './components/modal-view-note';
import BurgerMenu from './components/burger';
import noteService from '../services/noteService';

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
  const [programs, setPrograms] = useState([]);

  //const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchPrograms();
    fetchNotes();
  }, [showAllNotes, programFilter]); // Re-fetch when view or program filter changes

  const fetchPrograms = async () => {
    try {
        const fetchedPrograms = await noteService.getPrograms(); // Assuming you have getPrograms in your service
        setPrograms(fetchedPrograms);
    } catch (error) {
        console.error("Error fetching programs:", error);
    }
  };

  const fetchNotes = async () => {
    try {
        let fetchedNotes;
        if (showAllNotes) {
            fetchedNotes = await noteService.getAllNotes();
        } else {
            fetchedNotes = await noteService.getMyNotes();
        }

        // Filter notes based on programFilter
        let filteredNotes = fetchedNotes;
            if (programFilter && programFilter !== 'all-programs') {
                filteredNotes = fetchedNotes.filter(note => 
                    note.program && note.program.id === parseInt(programFilter)
                );
            }
        
        setNotes(filteredNotes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]);
    }
  };

  const addNote = async (newNote) => {
    try {
        /*let program = null;
        if (newNote.program) {
            program = newNote.program === 'program-1' ? 'Program 1' : 'Program 2';
        }*/

        const noteData = {
            title: newNote.title,
            content: newNote.content,
            program_id: newNote.program_id
        };

        await noteService.createNote(noteData);
        fetchNotes();
        setIsAddingNote(false);
    } catch (error) {
        console.error("Error adding note:", error);
    }
  };

  const updateNote = async (updatedNote) => {
    //console.log("Updated note received:", updatedNote); // Add this line
    try {
        const noteDataForBackend = {
            title: updatedNote.title,
            content: updatedNote.content,
            program_id: updatedNote.program_id
            //program: frontendData?.programName || null
        };

        await noteService.updateNote(updatedNote.id, noteDataForBackend);
        fetchNotes();
        setIsEditingNote(false);
        setCurrentNote(null);
    } catch (error) {
        console.error("Error updating note:", error);
        alert("May be because you can only update your own notes.");
        alert("Error updating note: ", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
        await noteService.deleteNote(noteId);
        fetchNotes();
        return { success: true };
    } catch (error) {
        console.error("Error deleting note:", error);
        return {
            error: "Failed to delete note. You can only delete your own notes."
        };
    }
  };

  const viewNote = async (note) => {
    try {
        const detailedNote = await noteService.getNote(note.id);
        setSelectedNote(detailedNote);
        setIsViewNote(true);
    } catch (error) {
        console.error("Error fetching note details:", error);
    }
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
          programs={programs}
        />
        {isAddingNote && <ModalAddNote isOpen={isAddingNote} onClose={() => setIsAddingNote(false)} onAddNote={addNote} />}
        {isEditingNote && currentNote && 
          <ModalEditNote 
            isOpen={isEditingNote} 
            onClose={() => setIsEditingNote(false)} 
            onUpdateNote={updateNote} 
            note={currentNote}
            programs={programs} 
          />}
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
