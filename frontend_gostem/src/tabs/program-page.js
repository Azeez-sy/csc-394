/*
 * Simple programs page to add or delete a program name - sky 
 */

import React, { useState, useEffect } from 'react';
import noteService from '../services/noteService';
import { Link } from 'react-router-dom';

const ProgramsManager = () => {
    const [programs, setPrograms] = useState([]);
    const [newProgramName, setNewProgramName] = useState('');
    const [error, setError] = useState(null);

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

    const handleAddProgram = async () => {
        try {
            await noteService.createProgram({ program: newProgramName }); // Assuming you add createProgram to noteService
            fetchPrograms();
            setNewProgramName('');
            setError(null);
        } catch (err) {
            setError('Failed to add program.');
            console.error('Error adding program:', err);
        }
    };

    const handleDeleteProgram = async (programId) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await noteService.deleteProgram(programId); // Assuming you add deleteProgram to noteService
                fetchPrograms();
                setError(null);
            } catch (err) {
                setError('Failed to delete program.');
                console.error('Error deleting program:', err);
            }
        }
    };


    return (
        <div>
            <h2>Manage Programs</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <input
                    type="text"
                    value={newProgramName}
                    onChange={(e) => setNewProgramName(e.target.value)}
                    placeholder="Program Name"
                />
                <button onClick={handleAddProgram}>Add Program</button>
            </div>

            <ul>
                {programs.map((program) => (
                    <li key={program.id}>
                        <button onClick={() => handleDeleteProgram(program.id)}>Delete</button>
                        {program.program}
                    </li>
                ))}
            </ul>
            <Link className="link" to="/note-page">
                <button className="burger-image-button">
                    <span className="burger-button-text">Back to Notes</span>
                </button>
            </Link>
        </div>
    );
};

export default ProgramsManager;