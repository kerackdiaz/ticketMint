import React,{useState, useEffect} from 'react'
import {  Routes, Route, useNavigate } from 'react-router-dom'
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
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authReducer.user.loggedIn);
  const dispatch = useDispatch();


  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const handleLogin = () => {
    if(auth===null){
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    dispatch(logout());

  };
useEffect(() => {
  if(auth){
    navigate('/')
    console.log(auth)
  }else{
    navigate('/')
  }
},[auth])
  return (
      <UserLayout>
      {isLoggedIn ? (
        <>
        <Header />
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
        </>
        ) : (
          <Routes>
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        )}
      </UserLayout>

  )
}

export default App
