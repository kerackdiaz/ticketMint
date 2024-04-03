import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const AllUser = () => {
    const user = useSelector((state) => state.authReducer.user);
    const [clients, setClients] = useState(user.clients);

    const filteredClients = clients.filter((client) => client.role === "AGENCY");

    const handleStatusChange = (id) => {
      setClients((prevClients) =>
        prevClients.map((client) => {
          if (client.id === id) {
            return {
              ...client,
              status: client.status === "true" ? "false" : "true",
            };
          }
          return client;
        })
      );
    };

  return (
    <div className="laptop:w-[77%] relative laptop:left-[14%] tablet:left-[25%] tablet:w-1/2 w-[410px] h-[80%] md:w-[490px] top-32 right-16 py-6 px-6 rounded-xl border border-gray-200 bg-[#DBC1FA] mt-10 flex flex-wrap gap-10 dark:bg-[#0B0B1C]">
      <div className="bg-white flex flex-wrap justify-around items-center gap-y-5 lg:gap-10 p-2 rounded-lg right-3.5 relative w-[380px] tablet:w-[600px] tablet:right-0.5 laptop:w-[900px] desktop:w-[1100px] ">
        <table className="font-medium border-1">
          <thead>
            <tr className="bg--green-500 ">
              <th className="border-b py-5 border-gray-600 text-start bg--blue-500 laptop:w-[300px] desktop:w-[500px]">
                Agency Name
              </th>
              <th className="border-b border-gray-600 text-start pl-3 ">Role</th>
              <th className="border-b border-gray-600 text-start pl-2 laptop:w-[100px]">Status</th>
              <th className="border-b border-gray-600 text-start pl-3 laptop:w-[100px]">Balance</th>
         
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="flex items-center py-5 border-b">
                  
                  <div className="mr-3">
                    <p className="text-sm font-medium text-gray-900">{`${client.firstname} ${client.lastname}`}</p>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </td>
                <td className="border-b">
                <button
                    className={`rounded-full py-1 px-2  mr-3 ${
                      client.status ? "bg-green-500" : "bg-red-500"
                    }`}
                    onClick={() => handleStatusChange(client.id)}
                  >
                    {client.status ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="border-b pl-2">{client.role}</td>
                <td className="border-b pl-3 ">${client.balance.toLocaleString('en-US')}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
