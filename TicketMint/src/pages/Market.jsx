import React from 'react'
import CardCollectibles from '../components/CardCollectibles'
import { Link } from 'react-router-dom'

function Market() {
  return (
    <div className='bg-[#0b0b1c] flex flex-1 gap-5 flex-col items-center p-4'>
    <h2 className='text-3xl text-white pt-3'>Sell</h2>
      <CardCollectibles/>
      <div className='flex justify-between items-center w-full  md:w-1/2 xl:w-1/3'>
        <p className='text-sm text-white opacity-70'>Current maximum selling price:</p>
        <p className='text-xl text-white opacity-70'>150.000 COP</p>
      </div>
      <div className='flex justify-center opacity-90'>
        <p className='text-sm text-white md:w-1/2 xl:w-1/3'>Arch Enemy is a Swedish melodic death metal band formed in Halmstad in 1995. In its beginnings it explored the original death metal, but suffered a musical transformation after the change of members they had, and began to make a more melodic death metal, which they continue to do today.</p>
      </div>
        <Link to={`/sell/${1}`} className='md:w-1/2 xl:w-1/3 w-full flex justify-center items-center'><button type="button" className='text-white bg-[#8468fb] py-2 w-2/3 rounded-xl'>Sell</button></Link>
  </div>
  )
}

export default Market