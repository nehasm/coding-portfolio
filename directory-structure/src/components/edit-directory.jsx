import React from 'react'
import Input from './input';

const EditDirectory = ({addNewChanges, openDirectory}) => {
  return (
    <>
        <Input type='directory' btnName='Add Directory' onChange={addNewChanges} openDirectory={openDirectory}/>
        <Input type='file' btnName='Add File' onChange={addNewChanges} openDirectory={openDirectory}/>
    </>
  )
}

export default EditDirectory;