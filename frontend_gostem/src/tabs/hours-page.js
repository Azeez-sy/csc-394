import "./styles/hours-page.css"
import React, { useState } from 'react';

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

        setCampus("");
        setTutorName("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setComments("");
    };

    return (
        <div className="body">
            <div className="container">
                <div className="header">
                    <h2>Time Card: Tutor Hours</h2>
                </div>

                <div className="form-section">
                    <h3>New Entry</h3>

                    <div className="grid">
                        <div className="input-group">
                            <label>Campus</label>
                            <select
                                value={campus}
                                onChange={(e) => setCampus(e.target.value)}
                            >
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
                        <button
                            className="button add"
                            onClick={handleAddEntry}
                        >
                            Add Entry
                        </button>
                    </div>
                </div>

                <div className="recent-entries">
                    <h3>Recent Entries</h3>
                    <ul>
                        {entries.map((entry, index) => (
                            <li key={index} className="entry-item">
                                <strong>Campus:</strong> {entry.campus} | <strong>Tutor Name:</strong> {entry.tutorName} | <strong>Date:</strong> {entry.date} | <strong>Time:</strong> {entry.startTime} - {entry.endTime} | <strong>Comments:</strong> {entry.comments}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TimeCard;

