import React, { useState } from 'react';

const AddEventModal = ({ isOpen, onClose, onAddEvent }) => {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [tutorId, setTutorId] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject || !date || !startTime || !endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    const eventData = { subject, date, start_time: startTime, end_time: endTime, tutor_id: tutorId };

    onAddEvent(eventData);  // Update schedule
    setSubject('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setTutorId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time:</label>
            <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="tutorId">Tutor ID:</label>
            <input type="text" id="tutorId" value={tutorId} onChange={(e) => setTutorId(e.target.value)} required />
          </div>
          <div className="modal-buttons">
            <button type="submit">Add Event</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
