import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function MessageEvent() {
    const {id} = useParams()
    const events = useSelector((state) => state.authReducer.events)
    const notifications = useSelector((state) => state.authReducer.user.notifications)
    const event = Object.values(events)?.find((event) => event.id === id)
    const notificationsEvent = Object.values(notifications)?.filter((notification) => notification.eventId === id)
    const getMessage = () => {
        return notificationsEvent?.map((notification, index) => (
        <div key={index} className='mb-1 flex flex-col items-start'>
            <div  className=' rounded-lg bg-[#6651c3] '>
                <p className='text-white p-1 px-3'>{notification.message}</p>
            </div>
                <p className='dark:text-white text-[#0b0b1c] text-sm'>{notification.date}</p>
        </div>
        )
        )
    }

  return (
    <main  className=' flex flex-1 desktop:mt-20 flex-col items-center'>
        <div className='flex justify-center gap-2 desktop:justify-start w-[90%] desktop:w-[90%] tablet:w-96 mt-2 items-center pb-4 border-b-2 border-[#6651c3]'>
            <img className='w-16 h-16 object-cover object-center rounded-full bg-black'  src={event.imageURL}/>
            <h1 className='text-lg font-medium py-1 dark:text-white text-[#0b0b1c] text-center desktop:text-5xl'>{event.name}</h1>
        </div>
        <div className=' w-[90%] desktop:w-[90%] tablet:w-96 mt-2 desktop:mb-0 mb-20  py-1 desktop:pt-3 overflow-y-auto h-[400px] rounded-lg h-max-[80%]'>
            {
                getMessage()
            }
        </div>
        
    </main>
  )
}

export default MessageEvent