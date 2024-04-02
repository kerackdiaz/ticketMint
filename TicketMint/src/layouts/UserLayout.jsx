import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

function UserLayout(props) {
  const role = useSelector((state) => state.authReducer.user.role);
  let bg ;
  switch (role) {

    case 'CLIENT': {
      bg= 'bg-[#0b0b1c] dark:bg-[#0b0b1c]';
      break
    }
    default: {
      bg= 'dark:bg-[#55347B] bg-white';
      break;
    }
  }

  return (
    <>
        <div className={`flex flex-1 min-h-screen + ${bg}`}>
            {props.children}
        </div>
    </>
  )
}

export default UserLayout