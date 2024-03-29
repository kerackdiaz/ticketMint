import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Event from '../pages/user/Event.jsx'
import DetailsEvent from '../pages/user/DetailsEvent.jsx'
import MyTickets from '../pages/user/MyTickets.jsx'
import DetailTicket from '../pages/user/DetailTicket.jsx'
import QrScan from '../pages/user/QrScan.jsx'
import Collectibles from '../pages/user/Collectibles.jsx'
import Market from '../pages/user/Market.jsx'
import SellTicket from '../pages/user/SellTicket.jsx'
import Favorites from '../pages/user/Favorites.jsx'
import Configurations from '../pages/user/Configurations'
import Contact from '../pages/user/Contact'
import Help from '../pages/user/Help'
import Privacity from '../pages/user/Privacity'
import Wallet from '../pages/user/Wallet'
import Report from "../pages/agency/Report.jsx";
import Events from "../pages/agency/Events.jsx";
import ToDo from "../pages/agency/ToDo.jsx";
import NewEvent from "../pages/agency/NewEvent.jsx";
import InBox from "../pages/agency/Inbox.jsx";
import Profile from "../pages/agency/Profile.jsx";
import Layout from '../components/Layout.jsx'
import { useSelector } from 'react-redux'
import { ClientProvider } from './Db.jsx'
import { useEffect } from 'react'

const RoleRender = () => {
  const userdata = ClientProvider();
  const role = useSelector((state) => state.authReducer.user.role);
  console.log(role);

      switch (role) {

        case 'CLIENT': {
          return user();
        }
        case 'AGENCY': {
          return agency();
          
        }
        default: {
          break;
        }
      }
}

export default RoleRender



 const user = () => {
  return (
  <>
    <Header />
    <Routes>
      <Route path='/' element={<Event />} />
      <Route path='/details/:id' element={<DetailsEvent />} />
      <Route path='/myTickets' element={<MyTickets />} />
      <Route path='/detailTicket/:id' element={<DetailTicket />} />
      <Route path='/scan/:id' element={<QrScan />} />
      <Route path='/collectibles' element={<Collectibles />} />
      <Route path='/market/:id' element={<Market />} />
      <Route path='/sell/:id' element={<SellTicket />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path="/Configurations" element={<Configurations />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Help" element={<Help />} />
      <Route path="/Privacity" element={<Privacity />} />
      <Route path="/Wallet" element={<Wallet />} />
    </Routes>
  </>
  )

}


const agency = () => {
  return <>
  <Layout/>
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/ToDo" element={<ToDo />} />
      <Route path="/NewEvent" element={<NewEvent />} />
      <Route path="/Inbox" element={<InBox />} />
      <Route path='/Profile' element={<Profile/>} />   
    </Routes>
  </>
}

