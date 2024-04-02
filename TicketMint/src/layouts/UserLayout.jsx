import React,{useState, useEffect} from 'react'


function UserLayout(props) {

  return (
    <>
        <div className={`flex flex-1 min-h-screen bg-white dark:bg-[#0b0b1c]`}>
            {props.children}
        </div>
    </>
  )
}

export default UserLayout