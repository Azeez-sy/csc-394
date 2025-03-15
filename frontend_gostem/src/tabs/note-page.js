// Created by Mya Von Behren, Feb 12th, 2025
import React, { useState } from 'react';
import "./styles/notes-page.css"
import Sidebar from './components/sidebar';
import NoteListView from './components/note-list-view';
import ModalAddNote from './components/modal-add-note';
import ModalEditNote from './components/modal-edit-note';
import ModalViewNote from './components/modal-view-note';
import BurgerMenu from './components/burger';

const NotesPage = () => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(null)
  const [isViewNote, setIsViewNote] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [notes, setNotes] = useState([]);

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

  const handleCloseView = () => {
    setIsViewNote(false);
  }
  const handleViewNote = (note) => {
    setSelectedNote(note);
    setIsViewNote(true);
  };

  const addNote = (newNote) => {
    const newId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1;

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
      note.id === updatedNote.id ? { ...updatedNote, dateModified: getCurrentDate() } : note
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
    const updatedNotes = notes.filter(note => note.id !== noteId)
    setNotes(updatedNotes);
  }



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
        onViewNote={handleViewNote} />

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
