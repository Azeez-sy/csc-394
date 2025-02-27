import React, { useState } from 'react';
import './styles/hours-page.css';
import Sidebar from './components/sidebar';
import BurgerMenu from './components/burger';  

const TimeCard = () => {
    const [campus, setCampus] = useState("");
    const [tutorName, setTutorName] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [comments, setComments] = useState("");
    const [entries, setEntries] = useState([]);

    const handleAddEntry = () => {
        const newEntry = { campus, tutorName, date, startTime, endTime, comments };
        setEntries([...entries, newEntry]);

        // Reset the form fields
        setCampus("");
        setTutorName("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setComments("");
    };

    return (
        <div className="hours-container">
            <div className="hours-header">
                <h2>Time Card: Tutor Hours</h2>
            </div>
            <div className="form-section">
                <h3 className='form-header'>New Entry</h3>
                <div className="grid">
                    <div className="input-group">
                        <label>Campus</label>
                        <select value={campus} onChange={(e) => setCampus(e.target.value)}>
                            <option value="">Select a Campus</option>
                            <option value="Campus A">Campus A</option>
                            <option value="Campus B">Campus B</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Tutor Name</label>
                        <input
                            type="text"
                            placeholder="Enter Tutor Name"
                            value={tutorName}
                            onChange={(e) => setTutorName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid">
                    <div className="input-group">
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="grid">
                        <div className="input-group">
                            <label>Start Time</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>End Time</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label>Comments</label>
                    <textarea
                        rows="3"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    ></textarea>
                </div>

                <div className="button-group">
                    <button
                        className="button cancel"
                        onClick={() => {
                            setCampus("");
                            setTutorName("");
                            setDate("");
                            setStartTime("");
                            setEndTime("");
                            setComments("");
                        }}
                    >
                        Cancel
                    </button>
                    <button className="button add" onClick={handleAddEntry}>
                        Add Entry
                    </button>
                </div>
            </div>

            <div className="recent-entries">
                <h3>Recent Entries</h3>
                <div className="entries-container">
                    {entries.map((entry, index) => (
                        <div key={index} className="entry-card">
                            <div className="entry-header">
                                <strong>Campus:</strong> {entry.campus}
                            </div>
                            <div className="entry-details">
                                <p><strong>Tutor Name:</strong> {entry.tutorName}</p>
                                <p><strong>Date:</strong> {entry.date}</p>
                                <p><strong>Time:</strong> {entry.startTime} - {entry.endTime}</p>
                                <p><strong>Comments:</strong> {entry.comments}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const HoursPage = () => {
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

export default HoursPage;

