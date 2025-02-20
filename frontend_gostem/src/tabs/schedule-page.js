import React from "react";
import "./styles/schedule-page.css"
import Sidebar from './components/sidebar';

import { useState } from 'react';

import MonthlyCalendar from "./components/monthly-calendar";
import WeeklyCalendar from "./components/weekly-calendar";

const ScheduleContent = () => {
  const [currentView, setCurrentView] = useState('week')

  const [currentDay, setCurrentDay] = useState(new Date());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
  };

  // Goes to the current day
  const goToToday = () => setCurrentDay(new Date());

  // Functions to change the month to the previous or next month
  const goToNextMonth = () => {
    const nextMonth = new Date(currentDay);
    nextMonth.setMonth(currentDay.getMonth() + 1);
    setCurrentDay(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = new Date(currentDay);
    prevMonth.setMonth(currentDay.getMonth() - 1);
    setCurrentDay(prevMonth);
  };

  // Function to change the calendar view - monthly or weekly
  const handleViewChange = (view) => {
    setCurrentView(view);
  }
  
  return (
    <div className="schedule-content-container">
      {/* Setting up the calendar buttons */}
      <div className="calendar-controls">
        {/* Today button - goes to today's date */}
        {/* Prev and Next button - goes to previous or next month */}
        <div className="calender-controls--navigation">
          <button className = "cc-btn cc-btn--today" onClick={goToToday}>Today</button>
          <button className="cc-btn cc-btn--prev" onClick={goToPrevMonth}>Prev</button>
          <button className="cc-btn cc-btn--next"onClick={goToNextMonth}>Next</button>
        </div>

        <h2 className="calendar-controls--date">{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>

        {/* Week and Month button - goes to selected view */}
        {/* + button - adds events */}
        <div className="calendar-controls--view">
          <button 
            className={`cc-btn cc-btn--week ${
              currentView === 'week' ? 'is-active' : ''
            }`}
            onClick={() => handleViewChange('week')}
          >
            Week
          </button>

          <button 
            className={`cc-btn cc-btn--month ${
              currentView === 'month' ? 'is-active' : ''
            }`}
            onClick={() => handleViewChange('month')}
          >
            Month
          </button>

          <button className="cc-btn cc-btn--add">+</button>
        </div>
      </div>

      <div className="calendar-view">
        {currentView === 'week' ? 
        (
          <WeeklyCalendar 
            currentDay={currentDay}
            changeCurrentDay={changeCurrentDay}
          /> 
        ):
        (
          <MonthlyCalendar 
            currentDay={currentDay}
            changeCurrentDay={changeCurrentDay}
          /> 
        )
        }
        


      </div>
    </div>
  );
};

const SchedulePage= () => {
  return (
    <div className="schedule-page-container">
      <Sidebar />
      <ScheduleContent />
    </div>
  );
};

export default SchedulePage;