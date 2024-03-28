import React, { useEffect, useState } from 'react'
import CardEvent from '../components/CardEvent'
import { TiStarFullOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { CategortiesProvider, CitiesProvider, ClientProvider, EventProvider } from '../utils/Db'
import { useSelector } from 'react-redux'

function Event() {
  const [location, setLocation] = useState('Select location')
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [onFav, setOnFav] = useState(false)
  const event = useSelector((state) => state.authReducer.events)
  const cat = useSelector((state) => state.authReducer.categories)
  const city = useSelector((state) => state.authReducer.cities)


  const client = ClientProvider()

  const events = EventProvider()

  const categories = CategortiesProvider()

  const cities = CitiesProvider()
    const handleFav = () => {
        setOnFav(!onFav)
    }

    
    const getEvents = () => {
      if(!event || event.length === 0 || event === undefined || event === null){
        console.log(event);
        return <h1 className='text-white'>No events</h1>
      }
      return Object.values(event)?.map((even, index) => {
          return <CardEvent handleFav={handleFav} onFav={onFav} date={even.date} image={even.imageURL} name={even.name} id={even.id} key={index} />
        })
    }

    const getCategories = () => {
      if(!cat || cat.length === 0 || cat === undefined || cat === null){
        console.log(cat);
        return <h1 className='text-white'>No categories</h1>
      }
      console.log(cat);
      return Object.values(cat).map((category, index) => {
          return <button value={category.name} key={index} className={genre === category.name ? 'text-white py-1 px-3 rounded-xl bg-[#8468fb]':'text-white py-1 px-3 rounded-xl bg-[#bbabff]'}>{category.name}</button>
        })
    }

    const getCities = () => {
      if(!city || city.length === 0 || city === undefined || city === null){
        console.log(city);
        return <option className='text-white'>No cities</option>
      }
      console.log(city);
      return Object.values(city).map((cit, index) => {
          return <option value={cit.name} key={index}>{cit.name}</option>
        })
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
            {
                getCities()
            }
        </select>
        <Link to={'/favorites'}>
        <button type="button" className='text-white bg-[#8468fb] py-1 px-3 flex items-center gap-2 rounded-xl'>Favorites <TiStarFullOutline/></button>
        </Link>
      </div>
      <label className='w-screen flex justify-center mt-5 px-5 md:w-96'>
        <input onInput={handleSearch} type="search" placeholder='Search' className='bg-[#0b0b1c] text-white py-1 px-3 rounded-xl border-2 border-[#8468fb] w-full' />
      </label>
      <div className='flex gap-2 my-4'>
        {
            getCategories()
        }
      </div>
      <div className='flex flex-wrap  gap-4 justify-center'>
      {getEvents() }
      </div>
    </div>
  )
}

export default Event