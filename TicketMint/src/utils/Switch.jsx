import React from 'react'
import '../utils/Switch.css'

const Switch = ({ isToggle, onToggle}) => {

    const handleToggle = () => {
        // Invertir el estado del interruptor
        onToggle(!isToggle);
    };
    return (
        <label className='switch'>
            <input type='checkbox' checked={isToggle} onChange={handleToggle} />
            <span className='slider'></span>
        </label>
    )
}

export default Switch;