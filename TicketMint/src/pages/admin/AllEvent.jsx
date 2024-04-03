import React,{ useState } from "react";
import { useSelector } from "react-redux";
import { FaUserAstronaut } from "react-icons/fa";
import { EventProvider, statusEvent } from "../../utils/Db";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa6";

const AllEvent = () => {
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.token.token);
  const [clients, setClients] = useState(user.clients);
  const [status, setStatus] = useState(false);
  const [eventId, setEventId] = useState("");
  console.log(clients);

  const events = EventProvider();

  const filteredClients = clients.filter((client) => client.role === "AGENCY");
  const handleChangeStatus = async (e) => {
    e.preventDefault();
    const selectId = e.target.value;   
     console.log(e.target.value);
    const response = await statusEvent(selectId, token);
    if (response.success) {
      setStatus(true);
    }
  }

  return (
    <div id="oldEvents" className=" laptop:translate-x-[10vw] laptop:translate-y-[15vh] laptop:w-4/5 movil:w-full max-h-[80vh]  movil:translate-x-[-8vw] movil:translate-y-[18vh] rounded-lg flex justify-center">
      <div className="w-full  rounded-xl mt-10 flex flex-wrap gap-10 p-5 text-[#0B0B1C]">
        <section className=" bg-white w-full p-5">
          <h1 className="text-3xl font-thin">Events</h1>
          <table className="font-medium border-1 w-full">
            <thead className="w-full">
              <tr className="bg--green-500 flex gap-3 laptop:justify-around border-b border-gray-600">
                <th className="py-5 flex justify-start items-center md:w-[150px] w-[60px] laptop:w-[300px] desktop:w-[500px] border-gray-600 text-start bg--blue-500">
                  Event Name
                </th>
                <th className="py-5 flex justify-center items-center text-start w-[51px] laptop:w-[80px] bg--blue-500 ">
                  Owner
                </th>
                <th className="py-5 flex justify-center md:w-[100px] laptop:w-[170px] items-center text-start bg--blue-500 ">Date</th>
                <th className="py-5 flex justify-center items-center laptop:w-[60px] text-start">Status</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
            {filteredClients.map((client) => (
                client.events.map((event) => (
                  <tr key={event.id} className=" flex gap-2 laptop:justify-around border-b">
                    <td className="flex items-center py-5  ">
                      <span className="ml-1 text-xs laptop:text-sm w-[60px] md:w-[150px] px-1 line-clamp-2 laptop:w-[300px] desktop:w-[500px]" >{event.name}</span>
                    </td>
                    <td className=" flex justify-center items-center laptop:w-[80px] ">
                      <p className="text-xs laptop:text-sm font-medium text-gray-900">
                        {event.owner}
                      </p>
                    </td>
                    <td className=" flex justify-center w-[60px] md:w-[100px] laptop:w-[170px] items-center">
                      <p className="text-xs laptop:text-sm font-medium text-gray-900 line-clamp-1 laptop:line-clamp-2 ml-1">
                        {event.date}
                      </p>
                    </td>
                    <td className=" flex justify-center laptop:w-[60px] items-center">
                      <button
                      onClick={handleChangeStatus}
                      value={event.id}
                        className={`rounded-full py-1 px-2 text-xs laptop:text-sm ${event.status ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {event.status ? "Active" : "Inactive"}
                      </button>
                    </td>
                  
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AllEvent;
