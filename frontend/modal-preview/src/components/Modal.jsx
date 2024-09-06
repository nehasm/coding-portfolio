import React from 'react';

const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null; // Early return if the modal is not shown

    return (
        <>
            <div style={overlayStyle} onClick={onClose}></div>
            <div style={modalStyle}>
                <div style={headerStyle}>
                    <div>{title}</div>
                    <div onClick={onClose} style={closeButtonStyle}>X</div>
                </div>
                <div style={bodyStyle}>
                    {children}
                </div>
            </div>
        </>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1000, 
};

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '400px',
    backgroundColor: 'white',
    color: 'black',
    zIndex: 1001, 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
    borderRadius: '4px',
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid #ddd', 
};

const closeButtonStyle = {
    cursor: 'pointer',
};

const bodyStyle = {
    padding: '16px',
};

export default Modal;
