import React from 'react'
import CardEvent from '../components/CardEvent'

function Event() {
  return (
    <div className='bg-[#0b0b1c] flex flex-1 flex-col items-center'>
      <h1 className='text-3xl text-white '>Events</h1>
      <div className='flex justify-between w-screen px-5'>
        <select name="" id="" className='bg-[#0b0b1c] text-white '>
            <option value="Bogota">Bogota</option>
        </select>
        <button type="button" className='text-white bg-[#8468fb] py-1 px-3 rounded-xl'>Favorites</button>
      </div>
      <label className='w-screen flex justify-center mt-5'>
        <input type="search" placeholder='Search' className='bg-[#0b0b1c] text-white py-1 px-3 rounded-xl border-2 border-[#8468fb] w-[80%]' />
      </label>
      <div className='flex gap-2 my-4'>
      <button type="button" value={'Metal'} className='text-white py-1 px-3 rounded-xl bg-[#8468fb]'>Metal</button>
      <button type="button" value={'Rock'} className='text-white py-1 px-3 rounded-xl bg-[#bbabff]'>Rock</button>
      <button type="button" value={'Techno'} className='text-white py-1 px-3 rounded-xl bg-[#bbabff]'>Techno</button>
      </div>
      <CardEvent/>
    </div>
  )
}

export default Event