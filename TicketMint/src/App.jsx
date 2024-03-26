import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Event from './pages/Event.jsx'
import UserLayout from './layouts/UserLayout.jsx'
import Details from './pages/Details.jsx'
import MyTickets from './pages/MyTickets.jsx'

function App() {


  return (
    <BrowserRouter>
      <UserLayout>
      <Routes>
        <Route path='/event' element={<Event/>}/>
        <Route path='/details/:id' element={<Details/>}/>
        <Route path='/myTickets' element={<MyTickets/>}/>
      </Routes>
    </UserLayout>
    </BrowserRouter>
  )
}

export default App
