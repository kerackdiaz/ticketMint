import React, { useEffect, useState } from 'react'
import CardMyTickets from '../../components/CardMyTickets'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ClientProvider, ClientTicketsProvider, EventProvider } from '../utils/Db'
import axios from "axios";


const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const token = useSelector((state) => state.authReducer.token.token);

  // const clientTickets = ClientTicketsProvider();

  useEffect(()=>{
    axios.get("http://localhost:8080/api/tickets/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setTickets(res.data)
    })
  },[])

  const getClientTickets = () => {
    if(!tickets || tickets === undefined || tickets === null){
      console.log(tickets);
      return <h1 className='text-white'>No Tickets</h1> //ToDo: Implement loading animation fallback
    }
    console.log(tickets);
    return Object.values(tickets).map((ticket, index) => {
        return <CardMyTickets key={index} ticket={ticket}/>
      })
  }

  getClientTickets();

  return (
    <div className='bg-[#0b0b1c] flex flex-1 gap-6 flex-col items-center'>
    <h2 className='text-3xl text-white pt-3'>Manage Tickets</h2>
      <div className='flex  justify-center  bg-[#bbabff] w-3/4 rounded-lg md:w-1/2 '>
        <button className='bg text-white bg-[#8468fb] w-1/2 border md:py-1 border-[#bbabff] rounded-lg' 
        type="button">My tickets</button>
        <Link to={'/collectibles'} className='w-1/2 text-center flex justify-center'>
        <button className='text-white' type="button">Sell</button>
        </Link>
        <Link to={'/sell'} className='w-1/2 text-center flex justify-center'>
        <button className='text-white' type="button">On Sale</button>
        </Link>
        
      </div>
      <div className='flex flex-wrap gap-5 justify-center'>
        {getClientTickets()}

      </div>
  </div>
  )
}

export default ManageTickets