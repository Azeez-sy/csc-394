/*
 * Enhanced programs page with improved UI - sky 
 */

import React, { useState, useEffect } from 'react';
import noteService from '../services/noteService';
import { Link } from 'react-router-dom';
import './styles/program-page.css'; // Create this CSS file after

const ProgramsManager = () => {
    const [programs, setPrograms] = useState([]);
    const [newProgramName, setNewProgramName] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const data = await noteService.getPrograms();
            setPrograms(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch programs.');
            console.error('Error fetching programs:', err);
        }
    };

    const handleAddProgram = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        
        if (!newProgramName.trim()) {
            setError('Program name cannot be empty');
            return;
        }
        
        setIsSubmitting(true);
        try {
            await noteService.createProgram({ program: newProgramName });
            fetchPrograms();
            setNewProgramName('');
            setError(null);
            setSuccessMessage('Program added successfully!');
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Failed to add program.');
            console.error('Error adding program:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProgram = async (programId, programName) => {
        if (window.confirm(`Are you sure you want to delete this program: "${programName}"?`)) {
            try {
                await noteService.deleteProgram(programId);
                fetchPrograms();
                setError(null);
                setSuccessMessage('Program deleted successfully!');
                
                // Clear success message after 3 seconds
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (err) {
                setError('Failed to delete program.');
                console.error('Error deleting program:', err);
            }
        }
    };

    return (
        <div className="program-container">
            <div className="program-header">
                <h2>Manage Programs</h2>
                <Link className="back-link" to="/note-page">
                    <button className="back-button">
                        Back to Notes
                    </button>
                </Link>
            </div>
            
            {/* Message display area */}
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            {/* Program creation form */}
            <div className="program-form-container">
                <h3>Add New Program</h3>
                <form onSubmit={handleAddProgram} className="program-form">
                    <input
                        type="text"
                        value={newProgramName}
                        onChange={(e) => setNewProgramName(e.target.value)}
                        placeholder="Enter program name"
                        className="program-input"
                        disabled={isSubmitting}
                    />
                    <button 
                        type="submit" 
                        className="add-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Program'}
                    </button>
                </form>
            </div>

            {/* Programs list */}
            <div className="programs-list-container">
                <h3>Current Programs</h3>
                {programs.length === 0 ? (
                    <p className="empty-message">No programs found. Add one using the form above.</p>
                ) : (
                    <ul className="programs-list">
                        {programs.map((program) => (
                            <li key={program.id} className="program-item">
                                <span className="program-name">{program.program}</span>
                                <button 
                                    onClick={() => handleDeleteProgram(program.id, program.program)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProgramsManager;