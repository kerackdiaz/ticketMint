import React from 'react'



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