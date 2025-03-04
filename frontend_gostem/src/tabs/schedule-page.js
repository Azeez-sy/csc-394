import React, { useState, useEffect } from "react";
import "./styles/schedule-page.css";
import Sidebar from './components/sidebar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch schedules from backend
  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/schedule/');
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Raw data from API:", data); // Debug what we're getting
      
      if (!data.schedules || !Array.isArray(data.schedules)) {
        console.error("Invalid data format:", data);
        setError("Invalid data format received from server");
        return;
      }
      
      // Transform backend data to FullCalendar event format
      const formattedEvents = data.schedules.map(schedule => {
        console.log("Processing schedule:", schedule); // Debug individual record
        return {
          title: schedule.subject,
          start: `${schedule.date}T${schedule.start_time}`,
          end: `${schedule.date}T${schedule.end_time}`,
          extendedProps: {
            location: 'TBD',
            tutor: schedule.tutor_id,
            subject: schedule.subject
          }
        };
      });
      
      console.log("Formatted events:", formattedEvents); // Debug events after transformation
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSchedules();
  }, []);

  const renderEventContent = (eventInfo) => {
    const isMonthView = eventInfo.view.type === 'dayGridMonth';

    if (isMonthView) {
      return (
        <div className="event-content-month">
          <div className="event-title">{eventInfo.event.title}</div>
        </div>
      );
    }
    
    const startTime = eventInfo.event.start.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const endTime = eventInfo.event.end.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    return (
      <div className="event-content">
        <div className="event-title">{eventInfo.event.title}</div>
        <div className="event-location">{eventInfo.event.extendedProps.location}</div>
        <div className="event-time">{startTime} - {endTime}</div>
      </div>
    );
  };

  return (
    <div className="schedule-page-container">
      <Sidebar />
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
            right: 'dayGridMonth,timeGridWeek'
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
          eventClick={(info) => {
            console.log("Clicked event:", info.event);
            info.el.style.borderColor = '#afdcd5';
          }}
        />
      </div>
    </div>
  );
};

export default SchedulePage;