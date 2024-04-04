import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';

const Notifications = () => {
  const notifications = useSelector((state) => state.authReducer.user.notifications)
    const [search, setSearch] = useState('')

  const events = useSelector((state) => state.authReducer.user.events);
  const notify = useSelector((state) => state.authReducer.notify);

    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value);
      }


      const eventIds = Array.from(new Set(notifications?.map((notification) => notification.eventId)));
      const notificationEvents = Object.values(events)?.filter(event => eventIds.includes(event.id));
      const fiterNameNotify = notificationEvents?.filter(event => event.name.toLowerCase().includes(search.toLowerCase()))

      const viewNotifications = () => {
        return fiterNameNotify ? fiterNameNotify?.map((event, index) => (
        <Link to={`/messages/${event.id}`} key={index}>
          <div className='border-b-2 border-[#6651c3] flex justify-around items-center py-5'>
            <img className='w-8 h-8 desktop:w-16 desktop:h-16 object-cover object-center rounded-full bg-black' src={event.imageURL}  />
            <div className='w-4/5 ml-5'>
              <p className='dark:text-white text-[#0b0b1c]'>{event.name}</p>
              <p className='text-sm dark:text-white text-[#0b0b1c] line-clamp-1'>{notifications[notifications.length -1].message}</p>
            </div>
            <p className='text-sm dark:text-white text-[#0b0b1c]'>{notifications[notifications.length -1].date}</p>
          </div>
        </Link>
        )) : <p className='text-sm dark:text-white text-[#0b0b1c] w-full text-center desktop:text-xl'>No event notifications</p>
      }
  return (
    <div className=' desktop:mt-20 flex flex-1 flex-col items-center min-h-screen'>
      <h1 className='text-lg font-bold py-1 dark:text-white text-[#0b0b1c] mb-10 desktop:text-5xl movil:mt-5 movil:text-2xl laptop:mt-0'>Notifications</h1>
      <div className='flex justify-between items-center w-1/2 px-3 py-1 border border-[#6651c3] rounded-lg'>
                <div className="flex gap-2 w-full">
                    <IoSearchOutline className='text-xl dark:text-white text-[#0B0B1C]' />
                    <input type="text" onInput={handleSearch} value={search} className="w-full text-white appearance-none border-none bg-transparent outline-none text-xs placeholder:text-[#0B0B1C] dark:placeholder:text-gray-500" placeholder=' Search currency' />
                </div>
                < IoMdCloseCircle onClick={() => {setSearch('')}} className='text-lg text-[#e8635c]' />
            </div>
        <div className='mt-20 w-4/5'>
        {viewNotifications()}
        </div>
    </div>
  )
}

export default Notifications