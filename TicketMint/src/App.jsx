import React,{useState, useEffect} from 'react'
import {  Routes, Route, useNavigate } from 'react-router-dom'
import UserLayout from './layouts/UserLayout.jsx'
import Login from './pages/Login';
import ActivateAccountComponent from './components/ActivateAccountComponent';
import { useDispatch, useSelector } from 'react-redux';
import RoleRender from './utils/RoleRender.jsx'
import AcceptTicketTransaction from './components/AcceptTicketTransaction.jsx';
import DenyTicketTransaction from './components/DenyTicketTransaction.jsx';
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
        <RoleRender onLogin={handleLogout} />
        </>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/verifyAccount" element={<ActivateAccountComponent />} />
            <Route path="/verifyTransaction" element={<AcceptTicketTransaction />} />
            <Route path="/denyTransaction" element={<DenyTicketTransaction />} />
          </Routes>
        )}
      </UserLayout>

  )
}

export default App
