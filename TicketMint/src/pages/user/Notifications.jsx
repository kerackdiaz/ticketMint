import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

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
    <div className='bg-[#0b0b1c] desktop:mt-20 flex flex-1 flex-col items-center'>
      <h1 className='text-lg font-medium py-1 text-white desktop:text-5xl'>Notifications</h1>
      <div className='flex justify-between w-full px-5 md:w-96'>
      <label className=' desktop:w-[70%] flex justify-center desktop:mt-0 md:w-[450px]'>
      <div className='flex justify-between items-center w-[90%] px-3 py-1 border border-[#6651c3] rounded-lg'>
                <div className="flex gap-2">
                    <IoSearchOutline className='text-xl text-white'/>
                    <input onInput={handleSearch} type="search" className="appearance-none text-white border-none bg-transparent outline-none text-xs" placeholder=' Search currency' />
                </div>
            </div>
        {/* <input onInput={handleSearch} type="search" placeholder='Search' className='bg-[#0b0b1c] text-white py-1 px-3 rounded-xl border-2 border-[#8468fb] w-full' /> */}
      </label>
      </div>
        <div className='mt-20 w-4/5'>
        {viewNotifications()}
        </div>
    </div>
  )
}

export default Notifications