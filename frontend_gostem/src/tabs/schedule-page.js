import React, { useState, useEffect } from "react";
import "./styles/schedule-page.css";
import Sidebar from './components/sidebar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import AddEventModal from './components/AddEventModal'; 

const SchedulePage = ({ userRole }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [csrfToken, setCsrfToken] = useState(""); // State to store CSRF token

  // Check if user is an admin
  const isAdmin = userRole === 'admin';

  // Function to fetch CSRF token from Django backend
  const fetchCSRFToken = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/get-csrf-token/', {
        credentials: 'include', // Ensures cookies (session) are sent
      });
      const data = await response.json();
      console.log("CSRF Token fetched:", data.csrfToken);
      setCsrfToken(data.csrfToken); // Store CSRF token in state
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  // Fetch schedules from the backend
  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/schedule/');
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();
      if (!data.schedules || !Array.isArray(data.schedules)) {
        setError("Invalid data format received from server");
        return;
      }

      // Convert API data to FullCalendar format
      const formattedEvents = data.schedules.map(schedule => ({
        title: schedule.subject,
        start: `${schedule.date}T${schedule.start_time}`,
        end: `${schedule.date}T${schedule.end_time}`,
        extendedProps: { tutor: schedule.tutor_id, location: "TBD" }
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchCSRFToken(); // Fetch CSRF token on page load
  //   fetchSchedules(); // Fetch schedule data on page load
  // }, []);

  useEffect(() => {
    async function init() {
      await fetchCSRFToken(); // Wait for the token to be fetched
      await fetchSchedules(); // Then fetch schedules
    }
    init();
  }, []);


  // Function to add events dynamically
  const addEventToSchedule = async (eventData) => {
    console.log("CSRF Token fetched:", csrfToken);

    try {
      const response = await fetch('http://localhost:8000/api/schedule/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,  // Include CSRF token
        },
        credentials: 'include', // Required for authentication
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      console.log("Event added successfully, re-fetching schedules...");
      fetchSchedules(); // Ensure updated events are loaded
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="schedule-page-container">
      <Sidebar />
      <div className="calendar-wrapper">
        <AddEventModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAddEvent={addEventToSchedule} 
        />

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView='timeGridWeek'
          slotMinTime={"07:00:00"}
          slotMaxTime={"20:00:00"}
          allDaySlot={false}
          expandRows={true}
          height='100%'
          
          // Custom admin button to add events
          headerToolbar={{
            left: isAdmin ? 'today prev next addEventButton' : 'today prev next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          customButtons={ isAdmin ? {
            addEventButton: {
              text: 'Add Event',
              click: () => setIsModalOpen(true),
            },
          } : {} }

          buttonText={{ today: 'Today', month: 'Month', week: 'Week' }}
          eventColor="#afdcd5"
          eventTextColor="#000000"
          events={events}
        />
      </div>
    </div>
  );
};

export default SchedulePage;
