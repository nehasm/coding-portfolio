import React, { createContext, useState, useContext } from 'react';
import Toaster from '../components/Toaster'; 

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = ({ heading, content, delay = 2000 }) => {
        const id = Date.now(); 
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, heading, content, delay }
        ]);

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
        }, delay);
    };

    return (
        <ToastContext.Provider value={ {addToast} }>
            {children}
            <div className='toast-container'>
                {toasts.map(({ id, heading, content, delay }) => (
                    <Toaster key={id} heading={id} content={content} delay={delay} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
