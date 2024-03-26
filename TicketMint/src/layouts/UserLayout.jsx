import React from 'react'


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