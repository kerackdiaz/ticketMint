import React from 'react'

import Layout from '../components/Layout'
import Balance from '../components/Balance'
import Events from '../pages/Events'


function UserLayout(props) {
  return (
    <>
        <div className='flex flex-1 min-h-screen'>
          <Layout/>
            {props.children}
           
        </div>
    </>
  )
}

export default UserLayout