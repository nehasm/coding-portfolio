import React from 'react';
import EditDirectory from './edit-directory';

function Directory({ data }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [directory, setDirectory] = React.useState(data);
    const addNewChangesHandler = (value) => {
        const newChildren = [...directory.children, value]
        setDirectory((prev) => ({ ...prev, children: newChildren }))
    }
    const openDirectoryHandler = () => {
        setIsOpen(true)
    }
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation()
        const data = e.dataTransfer.getData('transfer-dir');
        const newChildren = [...directory.children, JSON.parse(data)]
        setDirectory((prev) => ({ ...prev, children: newChildren }))
    }
    const handleDragStart = (e, dir) => { 
        e.stopPropagation()
        e.dataTransfer.setData("transfer-dir", JSON.stringify(dir));
    }
    return (
        <>
        <div draggable={true} onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
        }} id={directory.name} onDrop={(e) => handleDrop(e)} onDragStart={(e) => handleDragStart(e,directory)}>
            <div>
                    <span className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>{directory.name}</span>
                    {directory.type === 'directory' && <EditDirectory addNewChanges={addNewChangesHandler} openDirectory={openDirectoryHandler}/>}
                </div>
                {isOpen
                    &&
                    <ul>
                        {directory.children?.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Directory data={item} />
                                </li>
                            )
                        })}
                    </ul>
                }
            </div>
        </>

    )
};
export default Directory
