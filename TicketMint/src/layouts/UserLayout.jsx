import React from 'react'
import Header from '../components/Header'


function UserLayout(props) {
  return (
    <>
        <div className='flex flex-1 min-h-screen'>
          
            {props.children}
        </div>
    </>
  )
}

export default UserLayout