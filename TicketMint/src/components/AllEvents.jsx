import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { EventProvider } from "../utils/Db";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa6";

const AllEvents = ({ clients }) => {
  const events = EventProvider();
  const event = useSelector((state) => state.authReducer.events);
 

  const renderEvents = () => {
    if (!event || event.length === 0 || event === undefined || event === null) {
      return (
        <tr>
          <td colSpan="4" className="text-center text-white">
            No events
          </td>
        </tr>
      );
    }

    return Object.values(event)?.map((even, index) => (
      <tr key={index}>
        <td className="flex items-center py-5 border-b w-150">
     
          <span className="ml-1 pr-8" >{even.name}</span>
        </td>
        <td className="border-b "> 
          <p className="text-sm font-medium text-gray-900"> {format(new Date(even.date), "dd/MM/yy")}</p>
          
        </td>
        <td className="border-b ">
            <p className="text-sm font-medium text-gray-900 ml-3.5">{even.venueName}</p>
        </td>
        <td className="border-b">
          <button
            className={`rounded-full py-1 px-2 ${
              even.status ? "bg-green-500" : "bg-red-500"
            }`}
           
          >
            {even.status ? "Active" : "Inactive"}
          </button>
        </td>
        <td className="border-b text-blue-500">
          <Link to={`/EventDetails/${even.id}`} className="text-blue-500 ml-2 cursor-pointer">EDIT</Link>
        </td>
      </tr>
    ));
    F;
  };

  return (
    <main className=" relative h-full  w-full md:w-[150%]  right-8 rounded-xl   mt-10 flex flex-wrap gap-10 p-5 text-[#0B0B1C]">
      <section className=" relative bg-white w-[120%] h-[100%] md:w-[467px] laptop:w-[700px] desktop:w-[1030px] laptop:left-[40px] shadow-lg rounded-md latptop:w-[55%] latptop:ml-44 p-2">
        <h1 className="text-3xl font-thin">Events</h1>
        <table className="font-medium border-1 w-full">
          <thead>
            <tr className="bg--green-500">
              <th className="border-b py-5 border-gray-600 text-start bg--blue-500">
                Name
              </th>
              <th className="border-b py-5 border-gray-600 text-start bg--blue-500 ">
              <FaCalendarCheck  className="text-xl text-cyan-500 mr-1 inline "/>
                Date
               
              </th>
              <th className="border-b py-5 border-gray-600 text-start bg--blue-500 ">
              <FaLocationDot className="text-xl text-red-600 mr-1 inline ml-1" />
                Location
              
              </th>
              <th className="border-b border-gray-600 text-start">Status</th>
              <th className="border-b border-gray-600 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>{renderEvents()}</tbody>
        </table>
      </section>
    </main>
  );
};

export default AllEvents;
