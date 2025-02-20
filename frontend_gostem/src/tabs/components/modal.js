import React from "react";
import "../styles/modal.css"

const Modal = ({ isOpen, onCancel, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    );
  };
export default Modal;
  