import React, { useState } from "react";

const CreateEvent = ({ onEventCreated }) => {
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [tutors, setTutors] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [repeatDays, setRepeatDays] = useState([]);
  const [repeatUntil, setRepeatUntil] = useState("");

  const authToken = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      class_name: className,
      date,
      start_time: startTime,
      end_time: endTime,
      location,
      tutors: tutors.split(",").map((id) => parseInt(id.trim())),
      is_recurring: isRecurring,
      repeat_days: isRecurring ? repeatDays : null,
      repeat_until: isRecurring ? repeatUntil : null,
    };

    try {
      const response = await fetch("http://localhost:8000/api/schedule/events/create/", {
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
      } else {
        alert("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event.");
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event (Admin Only)</h2>
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

        <label>Tutors (Enter Tutor IDs separated by commas):</label>
        <input type="text" value={tutors} onChange={(e) => setTutors(e.target.value)} required />

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
  );
};

export default CreateEvent;
