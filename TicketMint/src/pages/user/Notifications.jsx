import React,{useState} from 'react'
import { useSelector } from 'react-redux';

const Notifications = () => {
    const notify = useSelector((state) => state.authReducer.user.notifications);
    console.log(notify)
    const [search, setSearch] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const handleSearch = (e) => {
        setSearch(e.target.value)
      }

      const viewNotifications = () => {
        if(!notify || notify==null || notify == undefined|| notify.length === 0 ){
            console.log(search);
        return <div className='border-b flex justify-around items-center py-10'>
            <img src="" alt="" className='w-16 h-16 object-cover object-center rounded-full bg-black' />
            <div className='w-4/5'>
                <h2 className='text-white text-3xl font-bold pb-3 '>Name Event</h2>
                <p className='text-white text-lg'> message extract</p>
            </div>
            <p className='text-sm text-white'>date</p>
        </div>
      }
    }
  return (
    <div className='bg-[#0b0b1c] flex flex-1 flex-col items-center'>
      <h1 className='text-lg font-medium py-1 text-white '>Notifications</h1>
      <div className='flex justify-between w-full px-5 md:w-96'>
      <label className='w-screen flex justify-center mt-5 px-5 md:w-96'>
        <input onInput={handleSearch} value={search} type="search" placeholder='Search' className='bg-[#0b0b1c] text-white py-1 px-3 rounded-xl border-2 border-[#8468fb] w-full' />
      </label>
      </div>
        <div className='mt-20 w-4/5'>
        {viewNotifications()}
        </div>
    </div>
  )
}

export default Notifications