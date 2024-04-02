import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

function UserLayout(props) {


  return (
    <>
        <div className='flex flex-1 min-h-screen bg-[#0B0B1C]'>
            {props.children}
        </div>
    </>
  )
}

export default UserLayout