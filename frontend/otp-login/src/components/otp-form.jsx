import React, { useEffect, useRef } from 'react'

//We are considering otp of length 4 for this example
const OtpForm = ( {onOtpSubmit} ) => {
    const [otp, setOtp] = React.useState(['', '', '', ''])
    const otpRefs = useRef([])


    useEffect(() => {
        // Focus on the first input on initial render
        if (otpRefs.current[0]) {
            otpRefs.current[0].focus();
        }
    }, []);
    
    const handleChange = (e, index) => { 
        if(isNaN(e.target.value)) return false
        const otpCopy = [...otp]
        otpCopy[index] = e.target.value
        setOtp(otpCopy)
        otpRefs.current[index+1].focus()
    }
    const handleClick = (index) => { 

    }
    const handleKeyDown = (e,index) => { 

    }
    return (
        <div>
            <div className='otp-input-container'>
                {otp.map((data, index) => {
                    return (
                        <input
                            key={index}
                            ref={(e) => (otpRefs.current[index] = e)}
                            className='otp-input'
                            type="text"
                            maxLength="1"
                            value={data}
                            onChange={() => handleChange(event, index)}
                            onClick={handleClick}
                            onKeyDown={handleKeyDown}
                            
                        />
                    )
                }
                )
                }
            </div>
            <button
                className={`btn ${otp.includes('') ? 'btn-disable' : 'btn-enable'}`}
                onClick={() => {
                    console.log('OTP:', otp.join(''))
                }}
            >Submit OTP</button>
        </div>

    )
}

export default OtpForm;