import React, { useEffect, useState, useMemo, useCallback } from 'react'
import CardEvent from '../../components/CardEvent'
import { TiStarFullOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { CategortiesProvider, CitiesProvider, ClientProvider, EventProvider } from '../../utils/Db'
import { useSelector } from 'react-redux'
import { IoSearchOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";


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
  
  const isEmpty = useCallback((data) => !data || data.length === 0 || data === undefined || data === null, []);
  
  const handleFav = useCallback((id) => {
    setOnFav(prevOnFav => ({
      ...prevOnFav,
      [id]: !prevOnFav[id]
    }));
  }, []);
    
    const getEvents = useMemo(() => {
      if(isEmpty(events)){
        return (
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          )}

          let filterEvent = Object.values(events)
          .filter(event => location ? event.city.name === location : true)
          .filter(event => genre ? event.categories.some(category => category.name === genre) : true)
          .filter(event => search ? event.name.toLowerCase().includes(search.toLowerCase()) : true);

          let quantity = 0
          let price = 0

          return filterEvent.length > 0 ? filterEvent.map((even, index) => {
            quantity = 0;
            price = even.ticketTypes.length > 0 ? even.ticketTypes[0].basePrice : 0;
            
            even.ticketTypes.forEach(ticket => {
              quantity += ticket.availableQuantity;
              price = ticket.basePrice < price ? ticket.basePrice : price;
            });
          
            return (
              <CardEvent 
                handleFav={() => handleFav(even.id)}
                onFav={onFav[even.id]}
                date={even.date} 
                image={even.imageURL} 
                name={even.name} 
                id={even.id} 
                key={index} 
                time={even.time}
                price={price}
                quantity={quantity}
                location={even.venueName}
              />
            );
          }) : <h1 className='text-white'>No events</h1>
        }, [events, location, genre, search, isEmpty]);
/* 
    const nextEvent =Object.values(events)?.reduce((min, event) => event.date < min ? event.date : min, new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()); */
    const getNextEvent = useMemo(() => {
      if(isEmpty(events)){
        return
      }
      const nowDate = new Date().getFullYear() + '-' + (new Date().getMonth()) + '-' + new Date().getDate()
      const dateNextEvent = Object.values(events).reduce((min, event) => event.date < min ? event.date : min,  nowDate);
      const nextEvent = Object.values(events).find((event) => event.date === dateNextEvent);
      return <CardEvent key={nextEvent.name} idProx={"ProxEvent"} date={nextEvent.date} image={nextEvent.imageURL} name={nextEvent.name} id={nextEvent.id} price={nextEvent.basePrice} />
    }, [events, isEmpty]);

    const handleGenre = useCallback((e) => {
      genre == e.target.value ? setGenre('') : setGenre(e.target.value)
    }, [genre]);
    
    const getCategories = useMemo(() => {
      if(isEmpty(cat)){
        return 
      }
      return Object.values(cat).map((category, index) => {
          return <button onClick={handleGenre} value={category.name} key={index} className={genre === category.name ? 'text-white py-1 px-3 rounded-xl bg-[#0B0B1C]':'text-white py-1 px-3 rounded-xl dark:bg-[#bbabff] bg-[#0B0B1C]'}>{category.name}</button>
        })
      }, [cat, genre, handleGenre, isEmpty]);

      const getCities = useMemo(() => {
        if(isEmpty(city)){
          return <option className='text-white '>Location</option>
        }
      return Object.values(city).map((cit, index) => {
          return <option value={cit.name} key={index}>{cit.name}</option>
        })
      }, [city, isEmpty]);

 const handleSearch = useCallback((e) => {
    setSearch(e.target.value)
  }, []);

  const handleLocation = useCallback((e) => {
    setLocation(e.target.value)
  }, []);


  useEffect(() => {
    
  },[])

  return (
    <main className='flex flex-1 flex-col desktop:mt-20 desktop:flex-wrap items-center desktop:'>
      <section className='flex flex-col gap-3 justify-around w-screen items-center desktop:self-start desktop:w-[30%]'>
        <h1 className='text-lg md:text-5xl py-1 dark:text-white text-[#0b0b1c] font-bold  desktop:fixed desktop:top-20 desktop:left-5'>Events</h1>
        <Link to={'/favorites'}>
        <button type="button" className='text-white  font-medium desktop:fixed desktop:left-64 desktop:top-24 dark:bg-[#8468fb] bg-[#0B0B1C] py-1 px-3 flex items-center gap-2 rounded-xl'>Favorites <TiStarFullOutline/></button>
        </Link>
        <div className='flex desktop:flex-wrap desktop:items-start desktop:fixed desktop:overflow-y-auto desktop:justify-start desktop:left-5 desktop:top-36 desktop:w-[25%] desktop:min-h-[12%]  md:justify-center gap-2 overflow-x-auto w-[80%] px-5 desktop:px-0 my-4'>
        {
        getCategories
        }
        
        </div>
        <section className='desktop:fixed desktop:flex desktop:gap-4 desktop:items-center  desktop:flex-col hidden desktop:left-0 desktop:bottom-5 desktop:w-[28%]'>
          <h2 className='dark:text-white text-[#0b0b1c]  desktop:text-4xl'>Upcoming event</h2>
          {
            getNextEvent
          }
        </section>
      </section>
      <div className='flex justify-center items-around w-full desktop:w-[70%] gap-4 mb-10 mt-3 desktop:ml-[30%] desktop:self-start px-5 md:w-[450px]'>
        <select name="location" onChange={handleLocation} className='bg-[#0B0B1C] text-white py-2 px-4 flex '>
            <option className='text-white ' value={''} >Location</option>
            {
                getCities
            }
        </select>
      <label className=' desktop:w-[70%] flex justify-center desktop:mt-0 md:w-[450px]'>
      <div className='flex justify-between items-center w-[90%] px-3 py-1 border dark:border-[#6651c3] border-[#0b0b1c] rounded-lg'>
                    <IoSearchOutline className='text-xl dark:text-white text-[#0b0b1c]'/>
                    <input onInput={handleSearch} type="search" className="appearance-none text-white placeholder:text-start w-full px-1 border-none bg-transparent  outline-none text-xs placeholder:text-[#0B0B1C]" placeholder=' Search currency' />
            </div>
      </label>
      </div>
      
      <div className='flex flex-wrap gap-4 mb-20 desktop:mb-3 desktop:ml-[29%] justify-center desktop:w-[70%] desktop:mt-10 desktop:self-start'>
      {getEvents }

      </div>
    </main>
  )
}

export default Event