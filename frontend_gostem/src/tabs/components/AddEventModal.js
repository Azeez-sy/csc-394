import React, { useState } from 'react';

const AddEventModal = ({ isOpen, onClose, onAddEvent }) => {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [tutorId, setTutorId] = useState('');
  const [location, setLocation] = useState(''); // Optional, if your model has a location field

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!subject || !date || !startTime || !endTime || !tutorId) {
      alert("Please fill in all required fields.");
      return;
    }

    // If your Schedule model expects a numeric ID for 'tutor', parse it here.
    // If your model uses strings for tutor, adjust accordingly.
    const parsedTutorId = parseInt(tutorId, 10);
    if (isNaN(parsedTutorId)) {
      alert("Tutor ID must be a number.");
      return;
    }

    // Match your Django model fields exactly.
    // 'tutor' is the ForeignKey field name in your model,
    // not 'tutor_id'.
    const eventData = {
      subject,
      date,
      start_time: startTime,
      end_time: endTime,
      tutor: parsedTutorId,
      location, // Include only if your model/form expects it
    };

    // Pass data up to the parent so it can POST to the backend
    onAddEvent(eventData);

    // Reset fields and close the modal
    setSubject('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setTutorId('');
    setLocation('');
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
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tutorId">Tutor ID:</label>
            <input
              type="text"
              id="tutorId"
              value={tutorId}
              onChange={(e) => setTutorId(e.target.value)}
              required
            />
          </div>

          {/* Optional Location Field (if your model has 'location') */}
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="modal-buttons">
            <button type="submit">Add Event</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
