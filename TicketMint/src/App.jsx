import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Event from './pages/Event.jsx'
import UserLayout from './layouts/UserLayout.jsx'
import DetailsEvent from './pages/DetailsEvent.jsx'
import MyTickets from './pages/MyTickets.jsx'
import DetailTicket from './pages/DetailTicket.jsx'
import QrScan from './pages/QrScan.jsx'
import Collectibles from './pages/Collectibles.jsx'
import Market from './pages/Market.jsx'
import SellTicket from './pages/SellTicket.jsx'
import Favorites from './pages/Favorites.jsx'
import Configurations from './pages/Configurations'
import Contact from './pages/Contact'
import Help from './pages/Help'
import Privacity from './pages/Privacity'
import Wallet from './pages/Wallet'

function App() {


  return (
    <BrowserRouter>
      <UserLayout>
        <Routes>
          <Route path='/event' element={<Event />} />
          <Route path='/details/:id' element={<DetailsEvent />} />
          <Route path='/myTickets' element={<MyTickets />} />
          <Route path='/detailTicket/:id' element={<DetailTicket />} />
          <Route path='/scan/:id' element={<QrScan />} />
          <Route path='/collectibles' element={<Collectibles />} />
          <Route path='/market/:id' element={<Market />} />
          <Route path='/sell/:id' element={<SellTicket />} />
          <Route path='/favorites' element={<Favorites />} />
          {/*pepe*/}
          <Route path="/Configurations" element={<Configurations />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Privacity" element={<Privacity />} />
          <Route path="/Wallet" element={<Wallet />} />
        </Routes>
      </UserLayout>
    </BrowserRouter>
  )
}

export default App
