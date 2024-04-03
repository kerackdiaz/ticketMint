import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { TiArrowRightOutline } from "react-icons/ti";
import { postAlert } from "../../utils/Db";
import { io } from "socket.io-client";
import { format } from 'date-fns';



const Inbox = () => {
  const events = useSelector((state) => state.authReducer.user.events);
  console.log(events);
  const token = useSelector((state) => state.authReducer.token.token);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState("");


  useEffect(() => {
    const socket = io('http://localhost:9092');

    socket.on('notification', (newNotification) => {

      alert('Nueva notificación: ' + newNotification);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleNotify = async (e) => {
    e.preventDefault();
    const id = selectedEvent.id;
    const subjet = message;
    try {
      const response = await postAlert({ subjet, id }, token);
      if (response.success) {
        setMessage('');
        const date = format(new Date(), 'HH:mm eee dd MMM');
        setSelectedEvent(currentEvent => {
          const updatedEvent = {
            ...currentEvent,
            notifications: currentEvent.notifications ? [...currentEvent.notifications, { message, id, date }] : [{ message, id, date }]
          };
          return updatedEvent;
        });
      } else {

      }
    } catch (error) {
    }
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="laptop:translate-x-[10vw] laptop:translate-y-[15vh] laptop:w-4/5 movil:w-full max-h-[80vh]  movil:translate-x-[-8vw] movil:translate-y-[18vh] rounded-lg flex justify-center">
      <div class="flex laptop:flex-wrap laptop:flex-row movil:flex-col h-full w-full  overflow-x-hidden ">
        <div className="laptop:w-2/5 movil:w-full">
          <label className="mb-5">
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Search event" className="w-full laptop:w-1/2 py-1 rounded-lg border border-[#55347B]" />
          </label>
          <div className=" items-start flex flex-col gap-4 h-4/5 overflow-y-scroll mt-5 ">
            {filteredEvents.map((event) => (<div key={event.id} className="flex cursor-pointer items-center justify-start gap-5 border-b border-[#55347B]  tablet:w-full py-3 px-5  " onClick={() => handleEventSelect(event)} >
              <img className="object-cover w-7 h-7 rounded-full " src={event.imageURL} alt="" />
              <h2 className="line-clamp-1 font-bold text-white self-start">{event.name}</h2>
            </div>
            ))}
          </div>
        </div>
        <div className="laptop:w-3/5 movil:w-full px-4">
        <div className="mt-12 py-3 px-5 border rounded-xl border-[#55347B] flex flex-col justify-between laptop:h-4/5 movil:h-full">
          {selectedEvent && (
            <>
              <div>
                <h2 className="font-bold text-white text-xl border-b border-[#55347B] py-3 mb-3">{selectedEvent.name}</h2>
                <ul className=" flex flex-col gap-2 items-end laptop:h-[45vh] movil:h-[30vh] overflow-y-scroll">
                  {selectedEvent.notifications && selectedEvent.notifications.map((notification, i) => (
                    <>
                      <li className="text-white bg-[#6651c3] px-5 py-2 rounded-md" key={i}>{notification.message}</li>
                      <p className=" text-right text-white text-xs">{notification.date}</p>
                    </>
                  ))}
                </ul>
              </div>
              <form onSubmit={handleNotify} className="flex items-center">
                <input className="w-4/5 mx-4 border py-2 outline-none px-3 rounded-lg" type="text" value={message} onChange={handleMessageChange} placeholder="Escribir notificación" maxLength="499" />
                <button className="flex align-middle h-7 items-center gap-2 border rounded-lg px-6 bg-[#CA67F5] text-white hover:bg-indigo-800" type="submit">Send <TiArrowRightOutline /></button>
              </form>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
