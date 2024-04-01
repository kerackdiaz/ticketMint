import React from 'react'



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