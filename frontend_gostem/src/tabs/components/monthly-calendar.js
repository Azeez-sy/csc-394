import React from 'react';
import { useState } from 'react';
import CalendarDays from './monthly-calendar-days';
import "../styles/monthly-calendar.css"

// creating calendar with current day, full list of months, and a list of weekdays
// laying out HTML with a header and table
const MonthlyCalendar = ({ currentDay, changeCurrentDay }) => {
  const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="monthly-view">
      <div className="calendar-body">
        <div className="table-header">
          {weekdays.map((weekday) => (
            <div className="weekday" key={weekday}><p>{weekday}</p></div>
          ))}
        </div>
        <div>
          <CalendarDays 
            day={currentDay} 
            changeCurrentDay={changeCurrentDay} 
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalendar;