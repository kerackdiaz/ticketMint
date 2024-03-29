import React,{useState, useEffect} from 'react'
import {  Routes, Route, useNavigate } from 'react-router-dom'
import UserLayout from './layouts/UserLayout.jsx'
import Login from './pages/Login';
// import Event from './pages/user/Event.jsx'
// import DetailsEvent from './pages/user/DetailsEvent.jsx'
// import MyTickets from './pages/user/MyTickets.jsx'
// import DetailTicket from './pages/user/DetailTicket.jsx'
// import QrScan from './pages/user/QrScan.jsx'
// import Collectibles from './pages/user/Collectibles.jsx'
// import Market from './pages/user/Market.jsx'
// import SellTicket from './pages/user/SellTicket.jsx'
// import Favorites from './pages/user/Favorites.jsx'
// import Configurations from './pages/user/Configurations'
// import Contact from './pages/user/Contact'
// import Help from './pages/user/Help'
// import Privacity from './pages/user/Privacity'
// import Wallet from './pages/user/Wallet'
// import Header from './components/Header.jsx'
import ActivateAccountComponent from './components/ActivateAccountComponent';
import { useDispatch, useSelector } from 'react-redux';
import RoleRender from './utils/RoleRender.jsx'

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
  }else{
    navigate('/')
  }
},[auth])
  return (
      <UserLayout>
      {isLoggedIn ? (
        <>
        <RoleRender/>
        </>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/verifyAccount" element={<ActivateAccountComponent />} />
          </Routes>
        )}
      </UserLayout>

  )
}

export default App
