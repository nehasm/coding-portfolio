import { useState } from 'react'
import PhoneForm from './components/phone-form';
import './App.css'
import OtpForm from './components/otp-form';

function App() {
  const [showOtp, setShowOtp] = useState(false)
  const showOtpPage = (value) => { 
    console.log('Phone number:', value)
    setShowOtp(true)
  }
  const onOtpSubmit = (value) => { 
    console.log('OTP:', value)
  }
  return (
    <>
      <h1>OTP UI</h1>
      {true ? <OtpForm onOtpSubmit={onOtpSubmit}></OtpForm> : <PhoneForm showOtpPage={showOtpPage}></PhoneForm>}
    </>
  )
}

export default App
