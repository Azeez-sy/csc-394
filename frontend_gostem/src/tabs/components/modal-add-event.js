import React, { use, useState } from 'react';
import Modal from './modal';
import "../styles/modal-add-event.css"

const ModalAddEvent = ({ isOpen, onClose, onAddEvent }) => {
    const [eventTitle, setEventTitle] = useState("");
    const [tutorName, setTutorName] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [subject, setSubject] = useState("");
    const [location, setLocation] = useState("");
    const [errors, setErrors] = useState({
        eventTitle: "",
        tutorName: "",
        date: "",
        startTime: "",
        endTime: "",
        subject: "",
        location: "",
        general: ""
    });

    const handleAddEvent = () => {
        if (validateFields()) {
            const newEvent = {
                title: eventTitle,
                start: `${date}T${startTime}`,
                end: `${date}T${endTime}`,
                extendedProps: {
                    tutor: tutorName,
                    subject: subject,
                    location: location
                }
            };
            
            onAddEvent(newEvent);
            resetForm();
        }
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    }

    const resetForm = () => {
        setEventTitle("");
        setTutorName("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setSubject("");
        setLocation("");
        setErrors({
            eventTitle: "",
            tutorName: "",
            date: "",
            startTime: "",
            endTime: "",
            subject: "",
            location: "",
            general: ""
        });
    };

    const validateFields = () => {
        const newErrors = {
            eventTitle: "",
            tutorName: "",
            date: "",
            startTime: "",
            endTime: "",
            subject: "",
            location: "",
            general: ""
        };
        
        let isValid = true;
        if (!eventTitle.trim()) {
            newErrors.eventTitle = "Event title is required";
            isValid = false;
        }
        if (!tutorName) {
            newErrors.tutorName = "Please select a tutor";
            isValid = false;
        }
        if (!date) {
            newErrors.date = "Date is required";
            isValid = false;
        }
        if (!startTime) {
            newErrors.startTime = "Start time is required";
            isValid = false;
        }
        if (!endTime) {
            newErrors.endTime = "End time is required";
            isValid = false;
        }
        if (!subject.trim()) {
            newErrors.subject = "Subject is required";
            isValid = false;
        }
        if (!location.trim()) {
            newErrors.location = "Location is required";
            isValid = false;
        }
        
        // Check if end time is after start time
        if (startTime && endTime) {
            if (startTime >= endTime) {
                newErrors.endTime = "End time must be after start time";
                isValid = false;
            }
        }
        
        setErrors(newErrors);
        
        if (!isValid) {
            newErrors.general = "Please fill in all required fields";
        }
        
        return isValid;
    };


    return (
        <Modal isOpen={isOpen} onClose={handleCancel}>
            <div className="eventModal-wrapper">
                <div className="eventModal-header">
                    <h1 className="event-header-text">Add Event</h1>
                </div>
                <div className="event-form-container">
                    {errors.general && (
                        <div className="error-message general">{errors.general}</div>
                    )}
                    <div className="event-input-group">
                        <label>Event Title</label>
                        <input
                            type="text"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className={errors.eventTitle ? "error-input" : ""}
                        />
                        {errors.eventTitle && (
                            <div className="error-message">{errors.eventTitle}</div>
                        )}
                    </div>
                    <div className="event-input-group">
                        <label>Tutor Name</label>
                        <select value={tutorName} onChange={(e) => setTutorName(e.target.value)} className={errors.tutorName ? "error-input" : ""}>
                            <option value="">Select a Tutor</option>
                            <option value="TutorName 1">Tutor 1</option>
                            <option value="TutorName 2">Tutor 2</option>
                        </select>
                        {errors.tutorName && (
                            <div className="error-message">{errors.tutorName}</div>
                        )}
                    </div>

                    <div className="event-input-group">
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={errors.date ? "error-input" : ""}
                            />
                            {errors.date && (
                                <div className="error-message">{errors.date}</div>
                            )}
                    </div>
                    <div className="time-grid">
                        <div className="event-input-group">
                            <label>Start Time</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className={errors.startTime ? "error-input" : ""}
                            />
                            {errors.startTime && (
                            <div className="error-message">{errors.startTime}</div>
                            )}
                        </div>
                        <div className="event-input-group">
                            <label>End Time</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className={errors.endTime ? "error-input" : ""}
                            />
                            {errors.endTime && (
                            <div className="error-message">{errors.endTime}</div>
                            )}
                        </div>
                    </div>
                    <div className="event-input-group">
                        <label>Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className={errors.subject ? "error-input" : ""}
                        />
                        {errors.subject && (
                            <div className="error-message">{errors.subject}</div>
                        )}
                    </div>
                    <div className="event-input-group">
                        <label>Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className={errors.location ? "error-input" : ""}
                        />
                        {errors.location && (
                            <div className="error-message">{errors.location}</div>
                        )}
                    </div>
                    <div className="event-button-group">
                        <button className="button cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="button add" onClick={handleAddEvent}>
                            Add
                        </button>
                    </div>

                </div>
            </div>
        </Modal>
    );
};
export default ModalAddEvent;