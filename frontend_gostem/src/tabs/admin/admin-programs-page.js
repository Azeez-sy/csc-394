import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPrograms = () => {
    const [programs, setPrograms] = useState([]);
    const [newProgram, setNewProgram] = useState('');

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = () => {
        axios.get('http://127.0.0.1:8000/api/programs/')
            .then(response => setPrograms(response.data))
            .catch(error => console.error('Error fetching programs:', error));
    };

    const addProgram = () => {
        axios.post('http://127.0.0.1:8000/api/programs/', { name: newProgram })
            .then(() => {
                fetchPrograms();
                setNewProgram('');
            })
            .catch(error => console.error('Error adding program:', error));
    };

    const deleteProgram = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/programs/${id}/`)
            .then(() => fetchPrograms())
            .catch(error => console.error('Error deleting program:', error));
    };

    return (
        <div>
            <h2>Manage Programs</h2>
            <div>
                <input
                    type="text"
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    placeholder="New Program Name"
                />
                <button onClick={addProgram}>Add Program</button>
            </div>
            <ul>
                {programs.map(program => (
                    <li key={program.id}>
                        {program.name}
                        <button onClick={() => deleteProgram(program.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPrograms;