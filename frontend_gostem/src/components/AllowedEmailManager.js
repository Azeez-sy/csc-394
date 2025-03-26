import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../tabs/styles/admin-email-manager.css'; // Reuse the CSS

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json'
  };
};

const AllowedEmailManager = () => {
  const [allowedEmails, setAllowedEmails] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAllowedEmails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/users/allowed-emails/`, {
          headers: getAuthHeader()
        });
        setAllowedEmails(response.data.allowed_emails || []);
        setError('');
      } catch (err) {
        console.error('Error fetching allowed emails:', err.response || err);
        setError('Failed to load allowed emails. You may not have permission.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllowedEmails();
  }, []);

  const handleAddEmail = async (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/users/allowed-emails/`,
        { email: newEmail },
        { headers: getAuthHeader() }
      );
      setAllowedEmails(response.data.allowed_emails || []);
      setNewEmail('');
      setSuccess('Email added to allowed list successfully!');
      setError('');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add email');
      console.error('Error adding allowed email:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEmail = async (emailToRemove) => {
    if (window.confirm(`Are you sure you want to remove ${emailToRemove} from allowed users?`)) {
      try {
        setLoading(true);
        const response = await axios.delete(`${API_URL}/api/users/allowed-emails/`, {
          headers: getAuthHeader(),
          data: { email: emailToRemove }
        });
        setAllowedEmails(response.data.allowed_emails || []);
        setSuccess('Email removed from allowed list successfully!');
        setError('');
        
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to remove email');
        console.error('Error removing allowed email:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="admin-email-manager">
      <h3>Manage Allowed Email Addresses</h3>
      <p className="help-text">
        Only users with these email addresses will be able to sign in to the application.
        Faculty emails are automatically allowed.
      </p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleAddEmail} className="email-form">
        <div className="input-group">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter email address to allow"
            required
            disabled={loading}
          />
          <button 
            type="submit" 
            className="add-button" 
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Allow Email'}
          </button>
        </div>
      </form>

      <div className="email-list-container">
        <h4>Current Allowed Emails:</h4>
        {loading && <p className="loading">Loading emails...</p>}
        {!loading && (!allowedEmails || allowedEmails.length === 0) ? (
          <p className="no-emails">No allowed emails configured other than faculty emails.</p>
        ) : (
          <ul className="email-list">
            {allowedEmails && allowedEmails.map((email) => (
              <li key={email} className="email-item">
                <span>{email}</span>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveEmail(email)}
                  disabled={loading}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllowedEmailManager;