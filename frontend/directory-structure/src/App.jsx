import  React from 'react'
import { directory } from './data/directory';
import Directory from './components/directory';
import './App.css';
function App() {

  return (
    <>
      <div>Directory Structure</div>
      <Directory data={directory}/>
    </>
  )
}

export default App
