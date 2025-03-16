import React, { useState, useEffect } from 'react';
import './styles/hours-page.css';
import Sidebar from './components/sidebar';
import BurgerMenu from './components/burger';
import hourLogService from '../services/hourLogService';
import { format } from 'date-fns'; // Add this package for date formatting

const TimeCard = () => {
    const [subject, setSubject] = useState(""); 
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [comments, setComments] = useState("");
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch existing entries when component mounts
    useEffect(() => {
        const fetchHourLogs = async () => {
            try {
                setLoading(true);
                const data = await hourLogService.getHourLogs();
                setEntries(data);
                setError(null);
            } catch (err) {
                setError('Failed to load hour logs. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHourLogs();
    }, []);

    const handleAddEntry = async () => {
        try {
            setLoading(true);
            
            // Format data to match backend expectations
            const newEntryData = {
                subject: subject,
                date_logged: date,
                start_time: startTime,
                end_time: endTime,
                comments: comments
            };
            
            const savedEntry = await hourLogService.createHourLog(newEntryData);
            
            // Add the new entry to the list
            setEntries([savedEntry, ...entries]);
            setError(null);
            
            // Reset the form fields
            setSubject("");
            setDate("");
            setStartTime("");
            setEndTime("");
            setComments("");
        } catch (err) {
            setError('Failed to save entry. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Add a state for the current user
    const [currentUser, setCurrentUser] = useState(null);
    
    // Update useEffect to also get the current user
    useEffect(() => {
        const fetchHourLogs = async () => {
            try {
                setLoading(true);
                const data = await hourLogService.getHourLogs();
                setEntries(data);
                
                // Get user info from localStorage or a user service
                const userInfo = JSON.parse(localStorage.getItem('userInfo')) || { name: 'User' };
                setCurrentUser(userInfo);
                
                setError(null);
            } catch (err) {
                setError('Failed to load hour logs. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHourLogs();
    }, []);

    return (
        <div className="hours-container">
            <div className="hours-header">
                <h2>Time Card: Tutor Hours</h2>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-section">
                <h3 className='form-header'>New Entry</h3>
                <div className="grid">
                    <div className="input-group" style={{gridColumn: "1 / span 2"}}>
                        <label>Subject</label>
                        <input
                            type="text"
                            placeholder="Enter Subject or Class"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
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
                            setSubject("");
                            setDate("");
                            setStartTime("");
                            setEndTime("");
                            setComments("");
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button 
                        className="button add" 
                        onClick={handleAddEntry}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Add Entry'}
                    </button>
                </div>
            </div>

            <div className="recent-entries">
                <h3>Recent Entries</h3>
                {loading && <div>Loading entries...</div>}
                <div className="entries-container">
                    {entries.map((entry, index) => (
                        <div key={entry.id || index} className="entry-card">
                            <div className="entry-header">
                                <strong>Subject:</strong> {entry.subject}
                            </div>
                            <div className="entry-details">
                                <p><strong>User:</strong> {entry.user}</p>
                                <p><strong>Date:</strong> {entry.date_logged}</p>
                                <p><strong>Time:</strong> {entry.start_time} - {entry.end_time}</p>
                                <p><strong>Hours:</strong> {entry.hours_worked}</p>
                                <p><strong>Comments:</strong> {entry.comments}</p>
                            </div>
                        </div>
                    ))}
                    {entries.length === 0 && !loading && <div>No entries found</div>}
                </div>
            </div>
        </div>
    );
};

const HoursContent = ({ handleLogout }) => {
    return (
        <div className="hours-page-container">
            <div className="burger-menu-container">
                <BurgerMenu />
            </div>
            <Sidebar handleLogout={handleLogout} />
            <TimeCard />
        </div>
    );
};

const HoursPage = ({ handleLogout }) => {
    return <HoursContent handleLogout={handleLogout} />;
};

export default HoursPage;

