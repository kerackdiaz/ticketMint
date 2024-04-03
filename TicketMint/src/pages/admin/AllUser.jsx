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
    <div className=" laptop:translate-x-[10vw] laptop:translate-y-[15vh] laptop:w-4/5 movil:w-full max-h-[80vh]  movil:translate-x-[-8vw] movil:translate-y-[18vh] rounded-lg flex justify-center">
      <div className="w-full  rounded-xl mt-10 flex flex-wrap gap-10 p-5 text-[#0B0B1C]">
        <section className=" bg-white w-full p-5">
        <table className="font-medium border-1 w-full">
          <thead className="w-full">
            <tr className="bg--green-500 flex gap-3 laptop:justify-around border-b border-gray-600">
              <th className="py-5 flex justify-start items-center md:w-[150px] w-[60px] laptop:w-[300px] desktop:w-[500px] border-gray-600 text-start bg--blue-500">
                Agency Name
              </th>
              <th className="py-5 flex justify-center items-center text-start w-[51px] laptop:w-[60px] bg--blue-500 ">Role</th>
              <th className="py-5 flex justify-center md:w-[100px] laptop:w-[170px] items-center text-start bg--blue-500 ">Status</th>
              <th className="py-5 flex justify-center items-center laptop:w-[60px] text-start">Balance</th>
         
            </tr>
          </thead>

          <tbody className="overflow-y-scroll">
            {filteredClients.map((client) => (
              <tr key={client.id} className=" flex gap-2 laptop:justify-around border-b">
                <td className="flex items-center py-5  ">
                  
                  <div className="mr-3">
                    <p className="text-sm font-medium text-gray-900 laptop:w-[300px] desktop:w-[500px]">{`${client.firstname} ${client.lastname}`}</p>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </td>
                <td className=" flex justify-center items-center laptop:w-[60px] ">
                <button
                    className={`text-xs laptop:text-sm font-medium text-gray-900 rounded-full px-2 py-1 ${
                      client.status ? "bg-green-500" : "bg-red-500"
                    }`}
                    onClick={() => handleStatusChange(client.id)}
                  >
                    {client.status ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className=" flex justify-center w-[60px] md:w-[100px] laptop:w-[170px] items-center">{client.role}</td>
                <td className=" flex justify-center laptop:w-[60px] items-center">${client.balance.toLocaleString('en-US')}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        </section>
      </div>
    </div>
  );
};

export default AllUser;
