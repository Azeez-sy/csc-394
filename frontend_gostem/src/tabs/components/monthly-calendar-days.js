import React from 'react';

const CalendarDays = ({day, changeCurrentDay}) => {
    let firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    const currentDays = [];

    // generating days of the calendar
    for(let i = 0; i < 42; i++){
        if(i === 0 && weekdayOfFirstDay === 0){
            firstDayOfMonth.setDate(firstDayOfMonth.getDate()-7)
        } else if (i === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (i - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1)
        }

        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === day.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === day.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }

        currentDays.push(calendarDay)
    }

    return (
        <div className='table-content'>
            {
                currentDays.map((day) => {
                    return (
                        <div className={`calendar-day${day.currentMonth ? " current" : ""}${day.selected ? " selected" : ""}`}
                            onClick={() => changeCurrentDay(day)}>
                        <p>{day.number}</p>
                        </div>
                    )
                })
            }
        </div>
    );


};

export default CalendarDays;
