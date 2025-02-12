import React from 'react';
import CalendarDays from './monthly-calendar-days';
import "../styles/weekly-calendar.css"


const WeeklyCalendar = ({ currentDay, changeCurrentDay }) => {
    const weekdays = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri'];
    const hours = Array.from({length:13}, (element, index) => index+7);

    const getWeekStart = (date) => {
        const newDate = new Date(date);
        const day = newDate.getDay();

        // Have to skip over Sunday and Saturday
        const daysToSubtract = day === 0 ? 6 : day - 1;
        newDate.setDate(newDate.getDate() - daysToSubtract);
        return newDate;
    }

    const getWeekDays = (date) => {
        const weekStart = getWeekStart(date);
        return Array.from({length:5}, (element, index) => {
            const day = new Date(weekStart);
            day.setDate(weekStart.getDate() + index)
            return day;
        });
    }

    const formatHour = (hour) => {
        const period = hour >= 12 ? ' PM' : ' AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `${displayHour}${period}`;
    }

    const weekDays = getWeekDays(currentDay);

  return (
    <div className='week-view'>
        <div className='time-column'>
            <div className='time-header'></div>
            {hours.map((hour) => (
                <div key ={hour} className='time-slot'>
                    <span className='time-label'>
                        {formatHour(hour)}
                    </span>
                </div>
            )
        )}
        </div>

        

        <div className='days-grid'>
            <div className='days-header'>
                {weekDays.map((date, index) => (
                    <div
                    key ={index}
                    className={`day-header ${date.toDateString() === currentDay.toDateString() ? 'current' : ''}`} 
                    >
                    <div className='weekday'>{weekdays[index]}</div>
                    <div className='date'>{date.getDate()}</div>
                    </div>
                ))}
            </div>

            <div className='time-grid'>
                {hours.map((hour) => (
                    <div key={hour} className='grid-row'>
                        {weekDays.map((date, index) => (
                            <div
                                key={`${date}-${hour}`}
                                className='grid-cell'
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

        </div>
    </div>
  );
};

export default WeeklyCalendar;