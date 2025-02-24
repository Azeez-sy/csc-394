import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/hours-page.css';
import Sidebar from './components/sidebar';
import BurgerMenu from './components/burger';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

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

    // Fetch entries when component mounts
    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/hourlog/');
            setEntries(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching entries:', error);
            setError('Failed to load entries');
        } finally {
            setLoading(false);
        }
    };

    const handleAddEntry = async () => {
        try {
            const newEntry = {
                campus: campus,
                date: date,
                start_time: startTime,
                end_time: endTime,
                comments: comments,
                tutor: 1
            };
    
            console.log('📤 Sending to backend:', newEntry);
    
            const response = await axios.post('/hourlog/', newEntry);
            console.log('✅ Backend response:', response.data);
            console.log('🔄 Refreshing entries list...');
            
            await fetchEntries();
            console.log('✨ Entries refreshed successfully');
    
            // Reset form
            setCampus("");
            setDate("");
            setStartTime("");
            setEndTime("");
            setComments("");
    
        } catch (error) {
            console.error('X Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
        }
    };
    

    return (
        <div className="hours-container">
            <div className="hours-header">
                <h2>Time Card: Tutor Hours</h2>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="form-section">
                <h3 className='form-header'>New Entry</h3>
                <div className="grid">
                    <div className="input-group">
                        <label>Campus</label>
                        <select 
                            value={campus} 
                            onChange={(e) => setCampus(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select a Campus</option>
                            <option value="Campus A">Campus A</option>
                            <option value="Campus B">Campus B</option>
                        </select>
                    </div>
                </div>

                <div className="grid">
                    <div className="input-group">
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="grid">
                        <div className="input-group">
                            <label>Start Time</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className="input-group">
                            <label>End Time</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                disabled={loading}
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
                        disabled={loading}
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
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button 
                        className="button add" 
                        onClick={handleAddEntry}
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Entry'}
                    </button>
                </div>
            </div>

            <div className="recent-entries">
                <h3>Recent Entries</h3>
                <div className="entries-container">
                    {loading && <div>Loading...</div>}
                    {!loading && entries.length === 0 && <div>No entries found</div>}
                    {entries.map((entry, index) => (
                        <div key={index} className="entry-card">
                            <div className="entry-header">
                                <strong>Campus:</strong> {entry.campus}
                            </div>
                            <div className="entry-details">
                                <p><strong>Date:</strong> {entry.date}</p>
                                <p><strong>Time:</strong> {entry.start_time} - {entry.end_time}</p>
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