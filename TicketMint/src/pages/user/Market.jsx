import React from 'react'
import CardCollectibles from '../../components/CardCollectibles'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Market() {
  const tickets = useSelector((state) => state.authReducer.events)
  const {id} = useParams()

  const ticket = Object.values(tickets)?.find((ticket) => ticket.id === id)

  return (
    <div className='bg-[#0b0b1c] desktop:mt-20 flex flex-1 gap-5 flex-col items-center p-4'>
    <h2 className='text-3xl text-white pt-3 desktop:text-5xl'>Sell</h2>
      <CardCollectibles/>
      <div className='flex justify-between items-center w-full lg:w-1/3 md:w-1/2 desktop:w-[420px]'>
        <p className='text-sm text-white opacity-70'>Current maximum selling price:</p>
        <p className='text-xl text-white opacity-70'>150.000 COP{/* event.price */}</p>
      </div>
      <div className='flex justify-center opacity-90'>
        <p className='text-sm text-white md:w-1/2 lg:w-1/3 desktop:w-[420px]'>{/* Arch Enemy is a Swedish melodic death metal band formed in Halmstad in 1995. In its beginnings it explored the original death metal, but suffered a musical transformation after the change of members they had, and began to make a more melodic death metal, which they continue to do today. */}{ticket.description}</p>
      </div>
        <Link to={`/sell/${id}`} className='md:w-1/2 xl:w-1/3 w-full flex justify-center items-center desktop:mt-40 '><button type="button" className='text-white bg-[#8468fb] py-2 w-2/3 rounded-xl'>Sell</button></Link>
  </div>
  )
}

export default Market