import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

function UserLayout(props) {


  return (
    <>
        <div className='flex flex-1 min-h-screen bg-white dark:bg-[#55347B]'>
            {props.children}
        </div>
    </>
  )
}

export default UserLayout