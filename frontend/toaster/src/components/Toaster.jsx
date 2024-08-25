import React, { useState} from 'react';
import { RxCross2 } from "react-icons/rx";

const Toaster = ({ children }) => {
    const [showToast, setShowToast] = useState(false);
    const showToaster = () => { 
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 2000)
    }
  return (
    <>
        <button onClick={showToaster}>Show toast</button>
        {
            showToast && (
                <div className={`toast-container animate-border`}>
                    <div>
                        {children}
                    </div>
                    <RxCross2 onClick={() => setShowToast(false)} className='cursor-pointer'/>
                </div>
            )
        }
    </>
  )
}

export default Toaster