// Created by Mya Von Behren, Feb 12th, 2025
import React, { useState } from 'react';
import "./styles/notes-page.css"
import Sidebar from './components/sidebar';
import NoteListView from './components/note-list-view';
import ModalAddNote from './components/modal-add-note';
//import AddNoteView from './components/add-note-view';

const NotesPage = () => {
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddClick = () => {
    setIsAddingNote(true);
  };

  const handleCancel = () => {
    setIsAddingNote(false);
  };

  return (
    <div className="notes-page-container">
      <Sidebar />
      <NoteListView onAddClick={handleAddClick} />
      <ModalAddNote isOpen={isAddingNote} onClose={handleCancel} />
    </div>
  );
}



export default NotesPage;
