import { useState } from 'react'
import Toaster from './components/Toaster'

function App() {
  return (
    <>
      <h3>My Toaster</h3>
      <Toaster>
        <div>Toast Header</div>
        <div>Toast container</div>
      </Toaster>
    </>
  )
}

export default App
