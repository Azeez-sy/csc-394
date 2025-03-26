import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../tabs/styles/admin-email-manager.css'; // Path to your CSS file

// Use the same pattern as other components
const getApiBaseUrl = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  return baseUrl?.startsWith('http') 
    ? baseUrl 
    : `http://${baseUrl}`;
};

// Update this function to match how other components get the token
const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json'
  };
};

const AdminEmailManager = () => {
  const [facultyEmails, setFacultyEmails] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  // Get current user's email when component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUserEmail(user.email || '');
  }, []);

  // Fetch current faculty emails
  useEffect(() => {
    const fetchFacultyEmails = async () => {
      try {
        setLoading(true);
        console.log("Attempting to fetch faculty emails...");
        
        // Fix URL construction
        const apiBaseUrl = getApiBaseUrl();
        const response = await axios.get(`${apiBaseUrl}/api/users/faculty-emails/`, {
          headers: getAuthHeader()
        });
        
        console.log("Response:", response.data);
        setFacultyEmails(response.data.faculty_emails || []);
        setError('');
      } catch (err) {
        console.error('Error fetching faculty emails:', err.response || err);
        setError('Failed to load admin emails. You may not have permission.');
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyEmails();
  }, []);

  // Add new faculty email - fix API URL
  const handleAddEmail = async (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    try {
      setLoading(true);
      const apiBaseUrl = getApiBaseUrl();
      const response = await axios.post(
        `${apiBaseUrl}/api/users/faculty-emails/`, // Fixed path
        { email: newEmail },
        { headers: getAuthHeader() }
      );
      setFacultyEmails(response.data.faculty_emails || []);
      setNewEmail('');
      setSuccess('Admin email added successfully!');
      setError('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add admin email');
      console.error('Error adding faculty email:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove faculty email - fix API URL
  const handleRemoveEmail = async (emailToRemove) => {
    // Check if user is trying to remove their own email
    if (emailToRemove.toLowerCase() === currentUserEmail.toLowerCase()) {
      setError("You cannot remove your own email from the faculty list");
      
      // Clear error after 5 seconds
      setTimeout(() => setError(''), 5000);
      return;
    }

    if (window.confirm(`Are you sure you want to remove ${emailToRemove}?`)) {
      try {
        setLoading(true);
        const apiBaseUrl = getApiBaseUrl();
        const response = await axios.delete(`${apiBaseUrl}/api/users/faculty-emails/`, { // Fixed path
          headers: getAuthHeader(),
          data: { email: emailToRemove }
        });
        setFacultyEmails(response.data.faculty_emails || []);
        setSuccess('Admin email removed successfully!');
        setError('');
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to remove admin email');
        console.error('Error removing faculty email:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="admin-email-manager">
      <h3>Manage Administrator Emails</h3>
      <p className="help-text">
        Users with these emails will be granted administrative privileges when they register.
      </p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleAddEmail} className="email-form">
        <div className="input-group">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter email address"
            required
            disabled={loading}
          />
          <button 
            type="submit" 
            className="add-button" 
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Admin'}
          </button>
        </div>
      </form>

      <div className="email-list-container">
        <h4>Current Administrator Emails:</h4>
        {loading && <p className="loading">Loading emails...</p>}
        {!loading && (!facultyEmails || facultyEmails.length === 0) ? (
          <p className="no-emails">No administrator emails configured.</p>
        ) : (
          <ul className="email-list">
            {facultyEmails && facultyEmails.map((email) => (
              <li key={email} className="email-item">
                <span>{email}</span>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveEmail(email)}
                  disabled={loading || email.toLowerCase() === currentUserEmail.toLowerCase()}
                  title={email.toLowerCase() === currentUserEmail.toLowerCase() ? 
                    "You cannot remove your own email" : ""}
                >
                  {email.toLowerCase() === currentUserEmail.toLowerCase() ? 
                    "Cannot Remove Self" : "Remove"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminEmailManager;