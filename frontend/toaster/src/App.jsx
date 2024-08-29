import React from 'react'
import { useToast } from './store/toast-context';
function App() {
  const { addToast } = useToast();

  const handleClick = () => {
    addToast({ heading: 'Hello', content: 'This is a toast message', delay: 2000 });
};

  return (
    <>
      <h3>My Toaster</h3>
      <button onClick={handleClick}>Show Toast</button>
    </>
  )
}

export default App
