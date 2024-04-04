import React from "react";
import { EventProvider } from "../../utils/Db";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa6";


const OldEvents = () => {
  const events = EventProvider();
  const event = useSelector((state) => state.authReducer.events);
  console.log(event);

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

    return Object.values(event)
    .filter(even => new Date(even.date) < new Date())
    .map((even, index) => (
      <tr key={index} className=" flex gap-2 laptop:justify-around border-b">
        <td className="flex items-center py-5  ">
     
          <span className="ml-1 text-xs laptop:text-sm w-[60px] md:w-[150px] px-1 line-clamp-2 text-center" >{even.name}</span>
        </td>
        <td className=" flex justify-center items-center laptop:w-[60px] "> 
          <p className="text-xs laptop:text-sm font-medium text-gray-900 dark:text-white"> {format(new Date(even.date), "dd/MM/yy")}</p>
          
        </td>
        <td className=" flex justify-center w-[60px] md:w-[100px] laptop:w-[170px] items-center">
            <p className="text-xs laptop:text-sm font-medium text-gray-900 line-clamp-1 laptop:line-clamp-2 ml-1 dark:text-white text-center">{even.venueName}</p>
        </td>
        <td className=" flex justify-center laptop:w-[60px] items-center">
          <button
            className={`rounded-full py-1 px-2 text-xs laptop:text-sm ${
              even.status ? "bg-green-500" : "bg-red-500"
            }`}
          
          >
            {even.status ? "Active" : "Inactive"}
          </button>
        </td>
      </tr>
    ));
    F;
  };

  return (
    <div id="oldEvents" className="laptop:translate-x-[10vw] laptop:translate-y-[15vh] laptop:w-4/5 movil:w-full max-h-[80vh]  movil:translate-x-[-8vw] movil:translate-y-[18vh] rounded-3xl flex justify-center">
    <div className="w-full bg-[#dbc1fa] px-5 py-4 max-h-4/5 text-[#0B0B1C] dark:bg-gray-900 dark:border-2 dark:text-white rounded-3xl">
      <section className=" bg-[#dbc1fa] w-full dark:bg-gray-900  dark:text-white ">
        <h1 className="text-3xl font-thin">Old Events</h1>
        <table className="font-medium border-1 w-full">
          <thead className="w-full">
            <tr className="bg--green-500 flex gap-3 laptop:justify-around border-b border-gray-600">
              <th className="py-5 flex justify-center items-center md:w-[150px] w-[60px] border-gray-600 text-start bg--blue-500">
                Name
              </th>
              <th className="py-5 flex justify-center items-center text-start w-[51px] laptop:w-[60px] bg--blue-500 ">
              <FaCalendarCheck  className="text-xl hidden text-cyan-500 mr-1 laptop:inline "/>
                Date
               
              </th>
              <th className="py-5 flex justify-center md:w-[100px] laptop:w-[170px] items-center text-start bg--blue-500 ">
              <FaLocationDot className="text-xl hidden text-red-600 mr-1 laptop:inline ml-1" />
                Location
              
              </th>
              <th className="py-5 flex justify-center items-center laptop:w-[60px] text-start">Raise</th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">{renderEvents()}</tbody>
        </table>
      </section>
    </div>
    </div>
  );
};

export default OldEvents;
