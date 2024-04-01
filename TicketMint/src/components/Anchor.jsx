import React from 'react'
import { NavLink } from 'react-router-dom'

const Anchor = (props) => {
    const Icon = props.icon;
    return (
        <NavLink id={props.content} className={`flex flex-col items-center text-white`}  to={props.href}>
            <Icon className="text-2xl" />
            <p className="text-xs">{props.content} </p>
        </NavLink>
    )
}

export default Anchor