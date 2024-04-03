import React from "react";

import { useSelector } from "react-redux";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from "react";

import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa6";

const AllEvent = () => {
  const user = useSelector((state) => state.authReducer.user);
  const [clients, setClients] = useState(user.clients);

  const filteredClients = clients.filter((client) => client.role === "AGENCY");
  

  return (
    <div className="laptop:w-[77%] relative laptop:left-[14%] tablet:left-[25%] tablet:w-1/2 w-[410px] h-[80%] md:w-[490px] top-32 right-16 py-6 px-6 rounded-xl border border-gray-200 bg-[#DBC1FA] mt-10 flex flex-wrap gap-10 dark:bg-[#0B0B1C]">
      <section className=" relative bg-white w-[120%] h-[100%] md:w-[467px] laptop:w-[700px] desktop:w-[1030px] laptop:left-[20px] shadow-lg rounded-md latptop:w-[55%] latptop:ml-44 p-2">
        <h1 className="text-3xl font-thin">Events</h1>
        <table className="font-medium border-1 w-full">
          <thead>
            <tr className="bg--green-500">
              <th className="border-b py-5 border-gray-600 text-start bg--blue-500 w-[100px]">
                Event Name
              </th>
              <th className="border-b py-5 border-gray-600 text-start bg--blue-500 pr-3 ">
                Owner
              </th>

          
              <th className="border-b border-gray-600 text-start  pr-3">Date</th>
              <th className="border-b border-gray-600 text-start">Status</th>
            </tr>
          </thead>
          <tbody>
          {filteredClients.map((client) => (
              client.events.map((event) => (
                <tr key={event.id}>
                  <td className="flex items-center py-5 border-b w-150">
                    <span className="ml-1 pr-8">{event.name}</span>
                  </td>
                  <td className="border-b">
                    <p className="text-sm font-medium text-gray-900">
                      {event.owner}
                    </p>
                  </td>
                  <td className="border-b pr-3">
                    <p className="text-sm font-medium text-gray-900">
                      {event.date}
                    </p>
                  </td>
                  <td className="border-b">
                    <button
                      className={`rounded-full py-1 px-2 ${
                        event.status ? "bg-green-500" : "bg-red-500"
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
  );
};

export default AllEvent;
