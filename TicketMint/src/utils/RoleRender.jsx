import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Event from '../pages/user/Event.jsx'
import DetailsEvent from '../pages/user/DetailsEvent.jsx'
import MyTickets from '../pages/user/MyTickets.jsx'
import DetailTicket from '../pages/user/DetailTicket.jsx'
import Notifications from '../pages/user/Notifications.jsx'
import MessageEvent from '../pages/user/MessageEvent.jsx'
import QrScan from '../pages/user/QrScan.jsx'
import Collectibles from '../pages/user/Collectibles.jsx'
import SellTicket from '../pages/user/SellTicket.jsx'
import Favorites from '../pages/user/Favorites.jsx'
import Configurations from '../pages/user/Configurations'
import Contact from '../pages/user/Contact'
import Help from '../pages/user/Help'
import Privacity from '../pages/user/Privacity'
import Wallet from '../pages/user/Wallet'
import Payment from '../pages/gateway/Payment'
import Report from "../pages/agency/Report.jsx";
import Events from "../pages/agency/Events.jsx";
import NewEvent from "../pages/agency/NewEvent.jsx";
import InBox from "../pages/agency/Inbox.jsx";
import Profile from "../pages/agency/Profile.jsx";
import Layout from '../components/Layout.jsx'
import AllUser from '../pages/admin/AllUser.jsx'
import AllEvent from '../pages/admin/AllEvent.jsx'
import LayoutAdmin from '../components/LayoutAdmin.jsx'
import { useSelector } from 'react-redux'
import { ClientProvider } from './Db.jsx'
import { useEffect } from 'react'
import EventDetails from '../pages/agency/EventDetails.jsx'
import Transactions from '../pages/agency/Transactions.jsx'
import OldEvents from '../pages/agency/OldEvents.jsx'


const RoleRender = ({ onLogin }) => {
  const userdata = ClientProvider();
  const role = useSelector((state) => state.authReducer.user.role);

  const handleLogout = () => {
    onLogin();
  }


      switch (role) {

        case 'CLIENT': {
          return user(onLogin);
        }
        case 'AGENCY': {
          return agency(onLogin);
          
        }case 'ADMIN': {
          return admin(onLogin);
          
        }
        default: {
          break;
        }
      }
}

export default RoleRender



 const user = (onLogin) => {
  localStorage.setItem('tourMode', 'false');
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
      <Route path='/sell/:id' element={<SellTicket />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='notifications' element = {<Notifications/>}/>
      <Route path='messages/:id' element = {<MessageEvent/>}/>
      <Route path="/Configurations" element={<Configurations onLogin={onLogin} />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Help" element={<Help />} />
      <Route path="/Privacity" element={<Privacity />} />
      <Route path="/Wallet" element={<Wallet />} />
      <Route path="/Payment" element={<Payment />} />
    </Routes>
  </>
  )

}


const agency = (onLogin) => {
  const tourMode = localStorage.getItem('tourMode');
  if (!tourMode ) {
    localStorage.setItem('tourMode', 'true');
  }else if (tourMode === 'true') {
    localStorage.setItem('tourMode', 'false');
  }
  return <>
  <Layout onLogin={onLogin}/>
    <Routes>
    <Route path="/" element={<Report />} />
      <Route path="/Events" element={<Events />} />
      <Route path="/OldEvents" element={<OldEvents/>} />
      <Route path="/Report" element={<Report />} />
      <Route path="/NewEvent" element={<NewEvent />} />
      <Route path="/Inbox" element={<InBox />} />
      <Route path='/Profile' element={<Profile/>} />   
      <Route path='/EventDetails/:id' element = {<EventDetails/>}/>
      <Route path='/Transactions' element = {<Transactions/>}/>
    </Routes>
  </>
}

const admin = (onLogin) => {
  localStorage.setItem('tourMode', 'false');
  return <>
  <LayoutAdmin onLogin={onLogin}/>
    <Routes>
      <Route path="/AllUser" element={<AllUser />} />
      <Route path="/" element={<AllEvent />} /> 
      <Route path='/Transaction' element = {<Transactions/>}/>
    </Routes>
  </>
}

