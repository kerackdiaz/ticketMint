import React, { useEffect, useState } from 'react'
import CardEvent from '../components/CardEvent'
import { TiStarFullOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { ClientProvider, EventProvider } from '../utils/Db'

function Event() {
  const [location, setLocation] = useState('Select location')
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [onFav, setOnFav] = useState(false)

  const client = ClientProvider()
  console.log(client);

  const events = EventProvider()
  console.log(events);

    const handleFav = () => {
        setOnFav(!onFav)
    }


  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleLocation = (e) => {
    setLocation(e.target.value)
  }

  const handleGenre = (e) => {
    setGenre(e.target.value)
  }

  return (
    <div className='bg-[#0b0b1c] flex flex-1 flex-col items-center'>
      <h1 className='text-lg font-medium py-1 text-white '>Events</h1>
      <div className='flex justify-between w-full px-5 md:w-96'>
        <select name="location" onChange={handleLocation} className='bg-[#0b0b1c] text-white '>
            <option value="Bogota">Bogota</option>
        </select>
        <Link to={'/favorites'}>
        <button type="button" className='text-white bg-[#8468fb] py-1 px-3 flex items-center gap-2 rounded-xl'>Favorites <TiStarFullOutline/></button>
        </Link>
      </div>
      <label className='w-screen flex justify-center mt-5 px-5 md:w-96'>
        <input onInput={handleSearch} type="search" placeholder='Search' className='bg-[#0b0b1c] text-white py-1 px-3 rounded-xl border-2 border-[#8468fb] w-full' />
      </label>
      <div className='flex gap-2 my-4'>
      <button onClick={handleGenre} type="button" value={'Metal'} className={genre === 'Metal' ? 'text-white py-1 px-3 rounded-xl bg-[#8468fb]':'text-white py-1 px-3 rounded-xl bg-[#bbabff]'}>Metal</button>
      <button onClick={handleGenre} type="button" value={'Rock'} className={genre === 'Rock' ? 'text-white py-1 px-3 rounded-xl bg-[#8468fb]':'text-white py-1 px-3 rounded-xl bg-[#bbabff]'}>Rock</button>
      <button onClick={handleGenre} type="button" value={'Techno'} className={genre === 'Techno' ? 'text-white py-1 px-3 rounded-xl bg-[#8468fb]':'text-white py-1 px-3 rounded-xl bg-[#bbabff]'}>Techno</button>
      </div>
      <div className='flex flex-wrap  gap-4 justify-center'>
      <CardEvent handleFav={handleFav} onFav={onFav} />
      <CardEvent handleFav={handleFav} onFav={onFav}/>
      <CardEvent handleFav={handleFav} onFav={onFav}/>
      <CardEvent handleFav={handleFav} onFav={onFav}/>
      </div>
    </div>
  )
}

export default Event