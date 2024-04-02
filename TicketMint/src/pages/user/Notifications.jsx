import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';

const Notifications = () => {
  const notifications = useSelector((state) => state.authReducer.user.notifications)
  console.log(notifications);

    const [search, setSearch] = useState('')

  const events = useSelector((state) => state.authReducer.user.events);
  const notify = useSelector((state) => state.authReducer.notify);
  console.log(notify)

    const handleSearch = (e) => {
        setSearch(e.target.value)
      }
      const eventIds = Array.from(
        new Set(notifications?.map((notification) => notification.eventId)));
      console.log(eventIds);
      
      const notificationEvents = Object.values(events)?.filter(event => event.id.includes(eventIds));
        console.log(notificationEvents);

      const viewNotifications = () => {
        return notificationEvents?.map((event, index) => (
        <Link to={`/messages/${event.id}`} key={index}>
          <div className='border-b-2 border-[#6651c3] flex justify-around items-center py-5'>
            <img className='w-8 h-8 desktop:w-16 desktop:h-16 object-cover object-center rounded-full bg-black' /* src={event.imageURL} */ src='/prueba.png' />
            <div className='w-4/5 ml-5'>
              <p className='text-white' >{event.name}</p>
              <p className='text-sm text-white line-clamp-1'>{notifications[notifications.length -1].message}</p>
            </div>
            <p className='text-sm text-white'>{notifications[notifications.length -1].date}</p>
          </div>
        </Link>
        ))
      }
      
      /* const viewNotifications = () => {
        if(!notify || notify==null || notify == undefined|| notify.length === 0 ){

        return <div className='border-b flex justify-around items-center py-10'>
            <img src="" alt="" className='w-16 h-16 object-cover object-center rounded-full bg-black' />
            <div className='w-4/5'>
                <h2 className='text-white text-3xl font-bold pb-3 '>Name Event</h2>
                <p className='text-white text-lg'> message extract</p>
            </div>
            <p className='text-sm text-white'>date</p>
        </div>
      }
    } */
  return (
    <div className='bg-[#0b0b1c] desktop:mt-20 flex flex-1 flex-col items-center'>
      <h1 className='text-lg font-medium py-1 text-white desktop:text-5xl'>Notifications</h1>
      <div className='flex justify-between px-1 w-[90%] tablet:w-96 mt-2 border-[#6651c3] border-2 py-1 rounded-lg'>
                <label className="flex gap-2 w-full border-[#6651c3]">
                    <IoSearchOutline className='text-xl text-white'/>
                    <input onInput={handleSearch} type="search" className="appearance-none w-full text-white border-none bg-[#0b0b1c] outline-none text-xs" placeholder=' Search currency' />
                </label>
            </div>
        {/* <input onInput={handleSearch} type="search" placeholder='Search' className='bg-[#0b0b1c] text-white py-1 px-3 rounded-xl border-2 border-[#8468fb] w-full' /> */}

        <div className='mt-20 w-4/5'>
        {viewNotifications()}
        </div>
    </div>
  )
}

export default Notifications