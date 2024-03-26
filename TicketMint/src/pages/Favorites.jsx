import React, { useState } from 'react'
import CardEvent from '../components/CardEvent'

function Favorites() {
  const [onFav, setOnFav] = useState(true)

    const handleFav = () => {
        setOnFav(!onFav)
    }

  return (
    <div className='bg-[#0b0b1c] flex flex-1 flex-col gap-4 items-center'>
        <h2 className='text-3xl text-white py-5'>Your favorites</h2>
        <div className='flex flex-wrap justify-center gap-4'>
        <CardEvent handleFav={handleFav} onFav={onFav}/>
        <CardEvent handleFav={handleFav} onFav={onFav}/>
        <CardEvent handleFav={handleFav} onFav={onFav}/>
        </div>
    </div>
  )
}

export default Favorites