import React from 'react'

const Input = ({type , btnName, onChange, openDirectory}) => {
    const [openInput, setOpenInput] = React.useState(false);
    const addChanges = (event) => {
        if(event.key !== 'Enter') return
        onChange({type,name: event.target.value,children: []})
        setOpenInput(false)
    }
    const openDirectoryOnBtnClick = () => {
        setOpenInput(true)
        openDirectory();
    }
  return (
    <>
        {
            openInput ? (
                <span className='m-8'>
                    <input type='text' placeholder='Enter Name'onKeyDown={(e) => addChanges(e)}/>
                </span>
            ) : (
                <button className='m-8' onClick={openDirectoryOnBtnClick}>{btnName}</button>
            )
        }
    </>

  )
}

export default Input