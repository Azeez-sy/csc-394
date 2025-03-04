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
    const [currentPeriod, setCurrentPeriod] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    // Calculate the biweekly date constraints and fetch entries when component mounts
    useEffect(() => {
        calculateBiweeklyPeriod();
        fetchEntries();
    }, []);

    // Calculate the current biweekly period (1st-15th or 16th-end of month)
    const calculateBiweeklyPeriod = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        let startDate, endDate;
        
        // First half of the month (1st-15th)
        if (today.getDate() <= 15) {
            startDate = new Date(year, month, 1);
            endDate = new Date(year, month, 15);
            setCurrentPeriod(`Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
        } 
        // Second half of the month (16th-end)
        else {
            startDate = new Date(year, month, 16);
            // Get the last day of the current month
            endDate = new Date(year, month + 1, 0);
            setCurrentPeriod(`Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
        }
        
        // Format dates for the date input min/max attributes
        setMinDate(formatDateForInput(startDate));
        setMaxDate(formatDateForInput(endDate));
    };

    // Format a date as YYYY-MM-DD for input value/min/max attributes
    const formatDateForInput = (date) => {
        return date.toISOString().split('T')[0];
    };

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
                tutor: 1,
                period: currentPeriod // Store the period information
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
                {currentPeriod && <div className="current-period">{currentPeriod}</div>}
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
                        <label>Date (Limited to current biweekly period)</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            disabled={loading}
                            min={minDate}
                            max={maxDate}
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