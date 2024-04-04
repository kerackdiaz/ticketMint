import React from 'react'
import { NavLink } from 'react-router-dom'

const Anchor = (props) => {
    const Icon = props.icon;
    const IconSelect = props.iconSelect;

    return (
        <NavLink id={props.content} className={`flex flex-col items-center text-white hover:text-[#8468fb]`}  to={props.href}>
            {
            props.isActive ? (<>
            <IconSelect className="text-2xl text-[#8468fb]" /> 
            <p className="text-xs text-[#8468fb]">{props.content} </p>
            </>
            ) :<>
            <Icon className="text-2xl "/>
            <p className="text-xs ">{props.content} </p>
            </> 
            }
            
        </NavLink>
    )
}

export default Anchor