import React, { useRef, useState} from 'react'

const PhoneForm = ( {showOtpPage} ) => {
  const [disabled, setDisabled] = useState(true)
    const numberRef = useRef('')
    const handleSubmit = (e) => { 
        e.preventDefault()
        console.log('Phone number:', numberRef.current.value)
        showOtpPage(numberRef.current.value)
    }
    const validateNumber = () => {
        if (numberRef.current.value.length === 10) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }
  return (
    <form>
        <input type="number" className='number-input' onChange={validateNumber} ref={numberRef} placeholder="Phone" />
        <button 
            type="submit" 
            disabled={disabled} 
            onClick={handleSubmit} 
            className={`btn ${disabled ? 'btn-disable' : 'btn-enable'}`}
        >
            Register
        </button>
    </form>
  )
}

export default PhoneForm;