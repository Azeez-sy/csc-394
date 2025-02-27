// Created by Mya Von Behren, Feb 12th, 2025
import React, { useState } from 'react';
import "./styles/notes-page.css"
import Sidebar from './components/sidebar';
import NoteListView from './components/note-list-view';
import ModalAddNote from './components/modal-add-note';
import ModalEditNote from './components/modal-edit-note';

const NotesPage = () => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(null)

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "ACT Prep",
      dateCreated: "02-22-2025", // dateCreated is currently the only one being shown
      dateModified: "02-23-2025",
      authorName: "John Doe",
      programName: "Program 1",
      description: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
      file: "File names",
      isShared: true
    }
  ]);

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

  const addNote = (newNote) => {
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
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id ? {...updatedNote, dateModified: getCurrentDate()} : note
    );
    
    setNotes(updatedNotes);
    
    setIsEditingNote(false);
    setCurrentNote(null);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
  }

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note=> note.id !== noteId)
    setNotes(updatedNotes);
  }

  return (
    <div className="notes-page-container">
      <Sidebar />
      <NoteListView 
        notes={notes} 
        setNotes={setNotes} 
        onAddClick={handleAddClick} 
        onDeleteNote={deleteNote}
        onEditNote={handleEditClick} />

      {isAddingNote && (
        <ModalAddNote 
          isOpen={isAddingNote} 
          onClose={handleCancel} 
          onAddNote={addNote} 
        />
      )}
      {isEditingNote && currentNote && (
        <ModalEditNote 
          isOpen={isEditingNote}
          onClose={handleEditClose}
          onUpdateNote={updateNote}
          note={currentNote}
        />
      )}
    </div>
  );
}



export default NotesPage;
