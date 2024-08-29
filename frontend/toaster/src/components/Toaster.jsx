// Toaster.js
import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const Toaster = ({ heading, content, delay }) => {
    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToast(false);
        }, delay);

        return () => clearTimeout(timer); 
    }, [delay]);

    if (!showToast) return null;

    return (
        <div className="toaster">
            <div>
                <div>{heading}</div>
                <div>{content}</div>
            </div>
            <RxCross2 onClick={() => setShowToast(false)} className='cursor-pointer' />
        </div>
    );
};

export default Toaster;
