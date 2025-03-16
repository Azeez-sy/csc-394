import React, { useState, useEffect } from "react";
import "./styles/schedule-page.css";
import Sidebar from './components/sidebar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import CreateEvent from "./components/CreateEvent"; // Import admin-only event creation form

const SchedulePage = ({ handleLogout }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Read user role from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const isFaculty = user?.role === "faculty";  // Only faculty can add events

  
  // Fetch schedules from the Django backend
  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:8000/api/schedule/events/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw data from API:", data);

      if (!Array.isArray(data)) {
        console.error("Invalid data format:", data);
        setError("Invalid data format received from server");
        return;
      }

      const formattedEvents = data.map(event => ({
        id: event.id,
        title: event.class_name,
        start: `${event.date}T${event.start_time}`,
        end: `${event.date}T${event.end_time}`,
        extendedProps: {
          location: event.location,
          // Format tutor names properly
          tutors: event.tutors.map(tutor => 
            `${tutor.first_name} ${tutor.last_name || ''}`).join(", "),
          is_recurring: event.is_recurring
        },
        color: event.is_recurring ? "#FFB347" : "#afdcd5",
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShowPopup(true);
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    const authToken = localStorage.getItem("authToken");

    const response = await fetch(`http://localhost:8000/api/schedule/events/${selectedEvent.id}/delete/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${authToken}`,
      },
    });

    if (response.ok) {
        alert("Event deleted successfully!");
        setShowPopup(false);
        fetchSchedules(); // Refresh calendar
      } else {
        alert("Failed to delete event.");
      }
    };

  const renderEventContent = (eventInfo) => {
    const isMonthView = eventInfo.view.type === 'dayGridMonth';
    const start = eventInfo.event.start;
    const end = eventInfo.event.end;
    
    const durationMinutes = end 
      ? Math.round((end.getTime() - start.getTime()) / (1000 * 60)) 
      : 0;

    if (isMonthView) {
      return (
        <div className="event-content-month">
          <div className="event-title">{eventInfo.event.title}</div>
        </div>
      );
    }

    if (durationMinutes <= 75) {
      return (
        <div className="event-content event-content-short">
          <div className="event-title">{eventInfo.event.title}</div>
        </div>
      );
    }

    const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <div className="event-content">
        <div className="event-title">{eventInfo.event.title}</div>
        <div className="event-tutor-name">{eventInfo.event.extendedProps.tutors}</div>
        <div className="event-location">{eventInfo.event.extendedProps.location}</div>
        <div className="event-time">{startTime} - {endTime}</div>
      </div>
    );
  };

  return (
    <div className="schedule-page-container">
      <Sidebar handleLogout={handleLogout} />

      {showCreateEvent && isFaculty && (
        <CreateEvent 
          onEventCreated={() => {
            fetchSchedules();
            setShowCreateEvent(false);
          }}
          onClose={() => setShowCreateEvent(false)}
        />
      )}

      <div className="calendar-wrapper">
        {loading && <div>Loading schedules...</div>}
        {error && <div className="error-message">Error: {error}</div>}

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView='timeGridWeek'
          slotMinTime={"07:00:00"}
          slotMaxTime={"20:00:00"}
          allDaySlot={false}
          expandRows={true}
          height='100%'
          headerToolbar={{
            left: 'today,prev,next',
            center: 'title',
            right: isFaculty ? 'addEventButton,dayGridMonth,timeGridWeek' : 'dayGridMonth,timeGridWeek'
          }}
          customButtons={{
            addEventButton: {
              text: showCreateEvent ? 'Close Event Form' : 'Add Event',
              click: () => setShowCreateEvent(!showCreateEvent)
            }
          }}
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week'
          }}
          eventColor="#afdcd5"
          eventTextColor="#000000"
          eventContent={renderEventContent}
          eventDisplay="block"
          events={events}
          eventClick={handleEventClick}
        />
      </div>

      {/* Event Details Popup */}
      {showPopup && selectedEvent && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <h3>{selectedEvent.title}</h3>
            <p><strong>Date:</strong> {new Date(selectedEvent.start).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {new Date(selectedEvent.start).toLocaleTimeString()} - {new Date(selectedEvent.end).toLocaleTimeString()}</p>
            <p><strong>Location:</strong> {selectedEvent.extendedProps.location}</p>
            <p><strong>Tutors:</strong> {selectedEvent.extendedProps.tutors}</p>

            <div className="popup-buttons">
              {isFaculty && (
                <button className="delete-button" onClick={handleDelete}>
                  🗑️ Delete Event
                </button>
              )}
              <button className="close-button" onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default SchedulePage;
