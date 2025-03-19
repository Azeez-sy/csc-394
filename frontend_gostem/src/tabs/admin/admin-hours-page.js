import React, { useState, useEffect } from 'react';
import '../styles/hours-page.css';
import Sidebar from '../components/sidebar';
import BurgerMenu from '../components/burger';


const TimeCard = () => {
    const [campus, setCampus] = useState("");
    const [tutorName, setTutorName] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [comments, setComments] = useState("");
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPeriod, setCurrentPeriod] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    // JUST A TESTTT
    useEffect(() => {
        const testEntry = {
            tutorName: "John Doe",
            campus: "Main Campus",
            date: "2025-03-15",
            start_time: "13:00",
            end_time: "15:00",
            period: "Test Period",
            comments: "This is a test."
        };      
        setEntries([testEntry]);
    }, []); 

    return (
        <div className="hours-container">
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <div className="hours-header">
                
                <h2>Time Card: Tutor Hours</h2>
                {currentPeriod && <div className="current-period">{currentPeriod}</div>}
            </div>

            <div className="admin-entries">
                <h3>Entries</h3>
                <div className="entries-container">
                    {loading && <div>Loading...</div>}
                    {!loading && entries.length === 0 && <div>No entries found</div>}
                    {entries.map((entry, index) => (
                        <div key={index} className="entry-card">
                            <div className="entry-header">
                                {entry.tutorName}
                            </div>
                            <div className="entry-details">
                                <p><strong>Campus:</strong> {entry.campus}</p>
                                <p><strong>Date:</strong> {entry.date}</p>
                                <p><strong>Time:</strong> {entry.start_time} - {entry.end_time}</p>
                                {entry.period && <p><strong>Period:</strong> {entry.period}</p>}
                                <p><strong>Comments:</strong> {entry.comments}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AdminHoursPage = () => {
    return (
        <div className="hours-page-container">
            <div className="burger-menu-container">
                <BurgerMenu />
            </div>
            <Sidebar />
            <TimeCard />
        </div>
    );
};

export default AdminHoursPage;