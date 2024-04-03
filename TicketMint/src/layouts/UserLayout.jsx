import React, { useState, useEffect } from 'react'


function UserLayout(props) {


  return (
    <>
      <main className={`flex flex-1 min-h-screen bg-white dark:bg-[#0b0b1c]`}>
        {props.children}
      </main>
    </>
  )
}

export default UserLayout