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
    <div className="laptop:w-[78%] relative laptop:left-[14%] tablet:left-[25%] tablet:w-1/2 w-[90%] h-[80%] md:w-[490px] top-32 right-12 py-6 px-6 rounded-xl border border-[#55347B] bg-[#DBC1FA] mt-10 flex flex-wrap gap-10 dark:bg-[#0B0B1C]">
        <div class="flex flex-col h-full w-full overflow-x-hidden ">
          <div className="w-1/5 flex flex-col gap-4 ">
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Search event" className="w-[150px] rounded-lg border border-[#55347B]" />
            {filteredEvents.map((event) => (<div key={event.id} className="flex items-center justify-start gap-5 border-b border-[#55347B] w-[300px] py-3 px-5 lg:w-[800px] desktop:w-[1073px]" onClick={() => handleEventSelect(event)} >
              <img className="object-cover w-7 h-7 rounded-full " src="https://firebasestorage.googleapis.com/v0/b/homebankingapp-4b70f.appspot.com/o/AssetsHomebanking%2Fpp-ulver-bank.jpg?alt=media&token=3ce9d213-9ef4-488f-845a-cdbeea119785" alt="" />
              <h2 className="line-clamp-1 font-bold">{event.name}</h2>
            </div>
            ))}
          </div>
          <div className="w-[100%]  py-3 px-5 border border-[#55347B] flex flex-col justify-between">
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
                  <button className="flex align-middle h-7 items-center gap-2 border rounded-lg px-6 bg-[#CA67F5] text-white hover:bg-indigo-800" type="submit">Send <TiArrowRightOutline /></button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
  );
};

export default Inbox;
