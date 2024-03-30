import React, { useEffect, useState } from 'react'
import CardEvent from '../../components/CardEvent'
import { TiStarFullOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { CategortiesProvider, CitiesProvider, ClientProvider, EventProvider } from '../../utils/Db'
import { useSelector } from 'react-redux'

function Event() {
  const [location, setLocation] = useState('')
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [onFav, setOnFav] = useState(false)
  const events = useSelector((state) => state.authReducer.events)
  const cat = useSelector((state) => state.authReducer.categories)
  const city = useSelector((state) => state.authReducer.cities)


  const clientProvider = ClientProvider()

  const eventsProvider = EventProvider()
  
  const categoriesProvider = CategortiesProvider()

  const cities = CitiesProvider()
    const handleFav = () => {
        setOnFav(!onFav)
    }
    
    const getEvents = () => {
      if(!events || events.length === 0 || events === undefined || events === null){
        return (
          <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          )}

          let filterEvent = Object.values(events)
          .filter(event => location ? event.city.name === location : true)
          .filter(event => genre ? event.categories.some(category => category.name === genre) : true)
          .filter(event => search ? event.name.toLowerCase().includes(search.toLowerCase()) : true);
      
        return filterEvent.length > 0 ? filterEvent.map((even, index) => (
          <CardEvent 
            handleFav={handleFav} 
            onFav={onFav} 
            date={even.date} 
            image={even.imageURL} 
            name={even.name} 
            id={even.id} 
            key={even.id} 
          />
        )) : <h1 className='text-white'>No events</h1> 
    }

    const getCategories = () => {
      if(!cat || cat.length === 0 || cat === undefined || cat === null){
        return 
      }
      return Object.values(cat).map((category, index) => {
          return <button onClick={handleGenre} value={category.name} key={index} className={genre === category.name ? 'text-white py-1 px-3 rounded-xl bg-[#8468fb]':'text-white py-1 px-3 rounded-xl bg-[#bbabff]'}>{category.name}</button>
        })
    }

    const getCities = () => {
      if(!city || city.length === 0 || city === undefined || city === null){
        return <option className='text-white'>Location</option>
      }
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
    genre == e.target.value ? setGenre('') : setGenre(e.target.value)
  }

  useEffect(() => {
    
  },[])

  return (
    <div className='bg-[#0b0b1c] flex flex-1 flex-col items-center'>
      <h1 className='text-lg font-medium py-1 text-white '>Events</h1>
      <div className='flex justify-between w-full px-5 md:w-96'>
        <select name="location" onChange={handleLocation} className='bg-[#0b0b1c] text-white '>
            <option className='text-white' value={''}>Location</option>
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