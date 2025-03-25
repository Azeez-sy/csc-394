import React, { useState, useEffect } from "react";
import "../styles/create-event.css";

const CreateEvent = ({ onEventCreated, onClose }) => {
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [repeatDays, setRepeatDays] = useState([]);
  const [repeatUntil, setRepeatUntil] = useState("");
  const [availableTutors, setAvailableTutors] = useState([]);
  const [selectedTutors, setSelectedTutors] = useState([]);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchTutors = async () => {
      const authToken = localStorage.getItem("authToken");
      
      // Use environment variable instead of hardcoded localhost
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL.startsWith('http') 
        ? process.env.REACT_APP_API_BASE_URL 
        : `http://${process.env.REACT_APP_API_BASE_URL}`;
        
      try {
        const response = await fetch(`${apiBaseUrl}/api/users/all-users/`, {
          headers: {
            "Authorization": `Token ${authToken}`
          }
        });
        if (response.ok) {
          const tutors = await response.json();
          setAvailableTutors(tutors);
        }
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };
    
    fetchTutors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      class_name: className,
      date,
      start_time: startTime,
      end_time: endTime,
      location,
      tutor_ids: selectedTutors,
      is_recurring: isRecurring,
      repeat_days: isRecurring ? repeatDays : null,
      repeat_until: isRecurring ? repeatUntil : null,
    };

    try {
      // Use environment variable instead of hardcoded localhost
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL.startsWith('http') 
        ? process.env.REACT_APP_API_BASE_URL 
        : `http://${process.env.REACT_APP_API_BASE_URL}`;
        
      const response = await fetch(`${apiBaseUrl}/api/schedule/events/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authToken}`,
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert("Event created successfully!");
        onEventCreated();
        onClose(); // Close the modal after successful creation
      } else {
        alert("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Event</h2>
          <button 
            className="close-button" 
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Class Name:</label>
          <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} required />

          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

          <label>Start Time:</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />

          <label>End Time:</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />

          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

          <div className="form-group">
            <label>Select Tutors:</label>
            <div className="tutor-checkbox-container">
              {availableTutors.map(tutor => (
                <div key={tutor.id} className="tutor-checkbox-item">
                  <input 
                    type="checkbox" 
                    id={`tutor-${tutor.id}`}
                    value={tutor.id}
                    checked={selectedTutors.includes(tutor.id.toString())}
                    onChange={(e) => {
                      const tutorId = e.target.value;
                      if (e.target.checked) {
                        setSelectedTutors([...selectedTutors, tutorId]);
                      } else {
                        setSelectedTutors(selectedTutors.filter(id => id !== tutorId));
                      }
                    }}
                  />
                  <label htmlFor={`tutor-${tutor.id}`}>
                    {tutor.first_name} {tutor.last_name} 
                    <span className="tutor-email">({tutor.email})</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <label>Is Recurring?</label>
          <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />

          {isRecurring && (
            <>
              <label>Select Repeat Days:</label>
              <div className="checkbox-group">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      value={day}
                      checked={repeatDays.includes(day)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRepeatDays([...repeatDays, day]);
                        } else {
                          setRepeatDays(repeatDays.filter((d) => d !== day));
                        }
                      }}
                    />
                    {day}
                  </label>
                ))}
              </div>

              <label>Repeat Until:</label>
              <input type="date" value={repeatUntil} onChange={(e) => setRepeatUntil(e.target.value)} />
            </>
          )}

          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
