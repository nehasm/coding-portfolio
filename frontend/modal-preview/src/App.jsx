import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Modal from './components/Modal'

function App() {
  const [showModal, setShowModal] = useState(false)


  return (
    <>
      <button onClick={() => setShowModal(true)}>Show modal</button>
      <Modal show={showModal} title='Modal Heading' onClose={() => setShowModal(false)}>My modal content</Modal>
    </>
  )
}

export default App
