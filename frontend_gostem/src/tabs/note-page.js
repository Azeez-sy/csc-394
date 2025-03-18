// Created by Mya Von Behren, Feb 12th, 2025
import React, { useEffect, useState } from 'react';
import "./styles/notes-page.css"
import Sidebar from './components/sidebar';
import NoteListView from './components/note-list-view';
import ModalAddNote from './components/modal-add-note';
import ModalEditNote from './components/modal-edit-note';
import ModalViewNote from './components/modal-view-note';
import BurgerMenu from './components/burger';
import axios from 'axios';

const NotesPage = () => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(null)
  const [isViewNote, setIsViewNote] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [notes, setNotes] = useState([]);
  const [programs, setPrograms] = useState([]); // New state for programs

  //const [notes, setNotes] = useState([]);

    useEffect(() => {
      fetchNotes();
      fetchPrograms();
    }, []);
    const authToken = localStorage.getItem("authToken");

    const fetchNotes = async () => {
        try {
            //const authToken = localStorage.getItem("authToken");
            const response = await axios.get('http://127.0.0.1:8000/api/notes/', {
              headers: { "Authorization": `Token ${authToken}` }
            });
            console.log("Response Data:", response.data); // Inspect response data
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const fetchPrograms = async () => { //New fetch program function.
      try {
          const response = await axios.get('http://127.0.0.1:8000/api/programs/', {
            headers: { "Authorization": `Token ${authToken}` }
          });
          setPrograms(response.data);
      } catch (error) {
          console.error('Error fetching programs:', error);
      }
    };

    const handleEditClick = (note) => {
      setCurrentNote(note);
      setIsEditingNote(true);
    };

    const handleEditClose = () => {
      setIsEditingNote(false);
      setCurrentNote(null);
    };

    const handleAddClick = () => {
      setIsAddingNote(true);
    };

    const handleCancel = () => {
      setIsAddingNote(false);
    };

    /*const addNote = (newNote) => {
      const newId = Math.max(...notes.map(note => note.id)) + 1;
      
      const today = new Date();
      const date = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
      
      const completeNote = {
        ...newNote,
        id: newId,
        dateCreated: date,
        dateModified: date,
        authorName: "name" 
      };
      
      setNotes([...notes, completeNote]);
      setIsAddingNote(false);
    };*/
    const addNote = async (formData) => {
      console.log("adding note...")
      console.log(formData.entries())
      try {
        console.log("Sending FormData:", formData.get('file')); // Debugging
        const response = await axios.post('http://127.0.0.1:8000/api/notes/', formData, { // Send formData
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Token ${authToken}`
            },
        });
        console.log("Response:", response.data);
        if (response.ok) {
          fetchNotes();
          setIsAddingNote(false);
        }
      } catch (error) {
        if (error.response) {
            console.error('Error adding note:', error.response.data);
        } else {
            console.error('Error adding note:', error);
        }
      }
    };
    

    // Add a new note by sending post request to backend - Sky
    
    /*const updateNote = (updatedNote) => {
      const updatedNotes = notes.map(note => 
        note.id === updatedNote.id ? {...updatedNote, dateModified: getCurrentDate()} : note
      );
      
      setNotes(updatedNotes);
      
      setIsEditingNote(false);
      setCurrentNote(null);
    };*/
    const updateNote = async (updatedNote) => {
      try {
          const response = await axios.put(`http://127.0.0.1:8000/api/notes/${currentNote.id}/`, updatedNote, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`
              },
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
          console.error('Error updating note:', error.response.data);
      }
    };

    //Update a note by sending a post request

    const getCurrentDate = () => {
      const today = new Date();
      return `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
    }

    
    /*const deleteNote = (noteId) => {
      const updatedNotes = notes.filter(note=> note.id !== noteId)
      setNotes(updatedNotes);
    }*/

    const deleteNote = async (noteId) => {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
          headers: {  
            "Authorization": `Token ${authToken}`
          }
        }); // Correct URL
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
        console.error('Error deleting note:', error);
      }
    };

    const handleCloseView = () => {
      setIsViewNote(false);
    };

    const handleViewNote = (note) => {
      setSelectedNote(note);
      setIsViewNote(true);
    };

    return (
      <div className="notes-page-container">
      <div className="burger-menu-container">
        {!isAddingNote && !isEditingNote && !isViewNote && <BurgerMenu />}
      </div>
      <Sidebar />
      <ModalViewNote
        isOpen={isViewNote}
        onClose={handleCloseView}
        note={selectedNote}
      />
      <NoteListView
        notes={notes}
        onAddClick={handleAddClick}
        onDeleteNote={deleteNote}
        onEditNote={handleEditClick}
        onViewNote={handleViewNote} 
        programs={programs}
      />

      {isAddingNote && (
        <ModalAddNote
          isOpen={isAddingNote}
          onClose={handleCancel}
          onAddNote={addNote}
          programs={programs}
        />
      )}
      {isEditingNote && currentNote && (
        <ModalEditNote
          isOpen={isEditingNote}
          onClose={handleEditClose}
          onUpdateNote={updateNote}
          note={currentNote}
          programs={programs}
        />
      )}
    </div>
    );
  }



  export default NotesPage;
