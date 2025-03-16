import React, { useState, useEffect } from 'react';
import './styles/hours-page.css';
import Sidebar from './components/sidebar';
import BurgerMenu from './components/burger';
import hourLogService from '../services/hourLogService';

const TimeCard = () => {
    const [subject, setSubject] = useState(""); 
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [comments, setComments] = useState("");
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [showFacultyView, setShowFacultyView] = useState(false);
    
    // Faculty view states
    const [allEntries, setAllEntries] = useState([]);
    const [filterUser, setFilterUser] = useState('');
    const [filterSubject, setFilterSubject] = useState('');
    const [filterDate, setFilterDate] = useState('');

    // Check if user is faculty
    useEffect(() => {
        // Get user data from localStorage (match the key used in schedule-page.js)
        const userInfo = JSON.parse(localStorage.getItem("user"));
        setUser(userInfo);
        // If faculty is detected, fetch all logs
        if (userInfo && userInfo.role === 'faculty') {
            fetchAllHourLogs();
        }
    }, []);

    // Fetch existing entries when component mounts
    useEffect(() => {
        fetchHourLogs();
    }, []);

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

    const fetchAllHourLogs = async () => {
        try {
            setLoading(true);
            const data = await hourLogService.getAllHourLogs();
            setAllEntries(data);
            setError(null);
        } catch (err) {
            setError('Failed to load all hour logs. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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

    const handleDeleteEntry = async (id) => {
        // Ask for confirmation before deleting
        if (!window.confirm("Are you sure you want to delete this entry?")) {
            return;
        }
        
        try {
            setLoading(true);
            await hourLogService.deleteHourLog(id);
            
            // Remove the deleted entry from the state
            setEntries(entries.filter(entry => entry.id !== id));
            setError(null);
        } catch (err) {
            setError('Failed to delete entry. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Filter entries based on search criteria
    const filteredEntries = allEntries.filter(entry => {
        return (
            (filterUser === '' || entry.user.toLowerCase().includes(filterUser.toLowerCase())) &&
            (filterSubject === '' || entry.subject.toLowerCase().includes(filterSubject.toLowerCase())) &&
            (filterDate === '' || entry.date_logged === filterDate)
        );
    });

    // Calculate total hours worked for faculty view
    const totalHours = filteredEntries.reduce((total, entry) => total + parseFloat(entry.hours_worked), 0);

    return (
        <div className="hours-container">
            <div className="hours-header">
                <h2>Time Card: Tutor Hours</h2>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            {/* Toggle between personal and all hours views for faculty */}
            {user && user.role === 'faculty' && (
                <div className="view-toggle">
                    <button 
                        className={!showFacultyView ? "active" : ""} 
                        onClick={() => setShowFacultyView(false)}
                    >
                        My Hours
                    </button>
                    <button 
                        className={showFacultyView ? "active" : ""}
                        onClick={() => setShowFacultyView(true)}
                    >
                        All Hours
                    </button>
                </div>
            )}
            
            {/* Show either personal hours view or faculty view */}
            {!showFacultyView ? (
                // Personal hours view
                <>
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
                        <h3>My Recent Entries</h3>
                        {loading && <div>Loading entries...</div>}
                        <div className="entries-container">
                            {entries.map((entry, index) => (
                                <div key={entry.id || index} className="entry-card">
                                    <div className="entry-header">
                                        <strong>Subject:</strong> {entry.subject}
                                        <button 
                                            onClick={() => handleDeleteEntry(entry.id)}
                                            className="delete-button"
                                            disabled={loading}
                                        >
                                            Delete
                                        </button>
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
                </>
            ) : (
                // Faculty view - only show if user is faculty
                user && user.role === 'faculty' && (
                    <>
                        <div className="form-section">
                            <h3 className='form-header'>Filter Entries</h3>
                            <div className="grid">
                                <div className="input-group">
                                    <label>Filter by User</label>
                                    <input
                                        type="text"
                                        placeholder="Enter username"
                                        value={filterUser}
                                        onChange={(e) => setFilterUser(e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Filter by Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Enter subject"
                                        value={filterSubject}
                                        onChange={(e) => setFilterSubject(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Filter by Date</label>
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="hours-summary">
                            <h3>Summary</h3>
                            <p><strong>Total Entries:</strong> {filteredEntries.length}</p>
                            <p><strong>Total Hours:</strong> {totalHours.toFixed(2)}</p>
                        </div>

                        <div className="recent-entries faculty-view">
                            <h3>All Hour Logs</h3>
                            {loading && <div>Loading entries...</div>}
                            <div className="entries-container">
                                {filteredEntries.map((entry) => (
                                    <div key={entry.id} className="entry-card">
                                        <div className="entry-header">
                                            <strong>User:</strong> {entry.user}
                                        </div>
                                        <div className="entry-details">
                                            <p><strong>Subject:</strong> {entry.subject}</p>
                                            <p><strong>Date:</strong> {entry.date_logged}</p>
                                            <p><strong>Time:</strong> {entry.start_time} - {entry.end_time}</p>
                                            <p><strong>Hours:</strong> {entry.hours_worked}</p>
                                            <p><strong>Comments:</strong> {entry.comments}</p>
                                        </div>
                                    </div>
                                ))}
                                {filteredEntries.length === 0 && !loading && <div>No entries found</div>}
                            </div>
                        </div>
                    </>
                )
            )}
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

