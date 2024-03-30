import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { TiArrowRightOutline } from "react-icons/ti";
import { postAlert } from "../../utils/Db";
import { io } from "socket.io-client";
import { format } from 'date-fns';



const Inbox = () => {
  const events = useSelector((state) => state.authReducer.user.events);
  const token = useSelector((state) => state.authReducer.token.token);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState("");

  console.log(selectedEvent)
  useEffect(() => {
    const socket = io('http://localhost:9092');

    socket.on('notification', (newNotification) => {
      // Aquí actualizas el estado con la nueva notificación
      // Esto dependerá de cómo estés manejando el estado en tu aplicación
      // Por ejemplo, podrías tener una acción de Redux para hacer esto
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
        console.log(response);
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
        console.log("Error sending notification: " + response.message);
      }
    } catch (error) {
      console.log("Error sending notification: " + error);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-4/5 pl-[6vw] pt-[13vh]">
      <div className="mx-24 my-20 w-[80vw] min-h-[60vh]  top-32 right-8 py-6 px-6 rounded-xl border border-gray-200 bg-white mt-10 ">
        <div class="flex flex-row h-full w-full overflow-x-hidden">
          <div className="w-1/5 flex flex-col gap-4 border-r">
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Search event" />
            {filteredEvents.map((event) => (<div key={event.id} className="flex items-center justify-start gap-5 border-b w-full py-3 px-5" onClick={() => handleEventSelect(event)} >
              <img className="object-cover w-7 h-7 rounded-full " src="https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/AssetsHomebanking%2Fpp-ulver-bank.jpg?alt=media&token=3ce9d213-9ef4-488f-845a-cdbeea119785" alt="" />
              <h2 className="line-clamp-1 font-bold">{event.name}</h2>
            </div>
            ))}
          </div>
          <div className="w-4/5 mx-5 py-3 px-5 border flex flex-col justify-between">
            {selectedEvent && (
              <>
                <div>
                  <h2 className="font-bold text-xl mb-3">{selectedEvent.name}</h2>
                  <ul className="px-10 flex flex-col gap-2 h-[57vh] overflow-y-scroll">
                    {selectedEvent.notifications && selectedEvent.notifications.map((notification, i) => (
                      <>
                      <li className="w-full bg-gray-200 px-5 py-2 rounded-md" key={i}>{notification.message}</li>
                      <p className="w-full text-right text-xs">{notification.date}</p>
                      </>
                    ))}
                  </ul>
                </div>
                <form onSubmit={handleNotify} className="flex items-center">
                  <input className="w-4/5 mx-4 border py-2 outline-none px-3 rounded-lg" type="text" value={message} onChange={handleMessageChange} placeholder="Escribir notificación" maxLength="180"  />
                  <button className="flex align-middle h-7 items-center gap-2 border rounded-lg px-6 bg-green-600 text-white hover:bg-indigo-800" type="submit">Send <TiArrowRightOutline /></button>
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
