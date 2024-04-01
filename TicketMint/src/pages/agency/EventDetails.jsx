import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoCameraReverse } from "react-icons/io5";
import { changeData, changeAvatar, EventProvider } from "../../utils/Db";
import { useState, useRef } from "react";
import { createTicket } from "../../utils/Db";


const EventDetails = () => {
  const token = useSelector((state) => state.authReducer.token.token);
  const event = useSelector((state) => state.authReducer.events);
  const { id } = useParams();
  const even = Object.values(event).find((event) => event.id === id);
  const reloadData = EventProvider();
  const [location, setLocation] = useState(even.venueUrl || "");
  const [description, setDescription] = useState(even.description || "");
  const [date, setDate] = useState(even.date || "");
  const [locationURL, setLocationURL] = useState(even.venueURL || "");
  const [showOtherTypeInput, setShowOtherTypeInput] = useState(false);

  const ticketTypes = useSelector((state) => state.authReducer.ticketTypes);

  const nameRef = useRef();
  const quantityRef = useRef();
  const basePriceRef = useRef();
  const typeRef = useRef();

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const toggleOtherTypeInput = (event) => {
    setShowOtherTypeInput(event.target.value === "others");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(address);
    const response = await changeData(
      { location, description, date, locationURL },
      token
    );
    if (response.success) {
      reloadData();
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const ticket = {
      name: nameRef.current.value,
      availableQuantity: quantityRef.current.value,
      basePrice: basePriceRef.current.value,
      TicketType: typeRef.current.value,
    };
    console.log(ticket);
    const response = await createTicket(even.id, token, ticket);

    console.log(response);
  };

  const getTypeOptions = () => {
    if (!ticketTypes || ticketTypes.length === 0) {
      return <option value="">Type</option>;
    }
    return ticketTypes.map((type, index) => (
      <option value={type.name} key={index}>
        {type.name}
      </option>
    ));
  };

  return (
    <div className="laptop:w-[78%] relative laptop:left-[14%] tablet:left-[25%] tablet:w-1/2 w-[80%] h-[80%] md:w-[490px] top-32 right-8 py-6 px-6 rounded-xl border border-gray-200 bg-[#DBC1FA] mt-10 flex flex-wrap gap-10 dark:bg-[#0B0B1C]">
      <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative ">
                {/* <img
                  src={even.imageURl}
                  className="shadow-xl group-hover:opacity-0 rounded-full object-center object-cover align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                /> */}
                <label
                  form="changepic"
                  className="  cursor-pointer hover:opacity-100 opacity-0 absolute flex justify-center items-center w-[150px] h-[150px] top-[-61px] right-[-86px] bg-[#80808073] text-5xl"
                >
                  <div>
                    <IoCameraReverse />
                  </div>
                  <input type="file" id="changepic" class="hidden" />
                </label>
              </div>
            </div>
            <div class="w-full text-center mt-20"></div>
          </div>
          <div class="text-center mt-2">
            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {even.name}
            </h3>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {even.city.name}
            </div>
          </div>
          <div class="mt-6 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                <div class="bg-white overflow-hidden shadow rounded-lg border">
                  <form
                    onSubmit={handleSubmit}
                    class="border-t border-gray-200 px-4 py-5 sm:p-0"
                  >
                    <dl class="sm:divide-y sm:divide-gray-200 ">
                      <div class="py-3 sm:py-5  sm:gap-4 sm:px-6 ">
                        <dt class="text-sm font-medium text-gray-500">
                          Categories
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="text-center  relative left-[75px] lg:left-[140px]  py-2.5 px-0 w-[50%]  f text-sm  bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700">
                              {even.categories.map((category) => (
                                <li key={category.id}>{category.name} </li>
                              ))}
                            </ul>
                          </dd>
                        </dt>
                      </div>

                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Description
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            placeholder={
                              even.description == null
                                ? "Description"
                                : even.description
                            }
                            className=" text-center  py-2.5 px-0 w-[50%] f text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700"
                            value={description}
                            onChange={(e) =>
                              handleInputChange(e, setDescription)
                            }
                          />
                        </dd>
                      </div>

                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Date</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            placeholder={even.date == null ? "Date" : even.date}
                            className=" text-center  py-2.5 px-0 w-[50%] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700"
                            value={date}
                            onChange={(e) => handleInputChange(e, setDate)}
                          />
                        </dd>
                      </div>

                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Location
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            placeholder={
                              even.venueName == null
                                ? "Address"
                                : even.venueName
                            }
                            className=" text-center  py-2.5 px-0 w-[50%] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700"
                            value={location}
                            onChange={(e) => handleInputChange(e, setLocation)}
                          />
                        </dd>
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Location URL
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            placeholder={
                              even.venueName == null
                                ? "AddressURL"
                                : even.venueURL
                            }
                            className=" text-center  py-2.5 px-0 w-[50%] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700"
                            value={locationURL}
                            onChange={(e) =>
                              handleInputChange(e, setLocationURL)
                            }
                          />
                        </dd>
                      </div>
                    </dl>
                    <div>
                      <button
                        type="submit"
                        class="w-1/2 mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CA67F5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit2}>
        <div className="  flex items-center justify-center w-[300px] tablet:w-[440px] lg:w-[670px] lg:relative lg:left-10 desktop:w-[1030px] ">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">New Ticket</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label for="full_name">Name</label>
                        <input
                          type="text"
                          name="full_name"
                          id="full_name"
                          ref={nameRef}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label for="Quantity">Quantity</label>
                        <input
                          type="number"
                          name="Quantity"
                          id="Quantity"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          ref={quantityRef}
                          placeholder="1000"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label for="basePrice">Base Price</label>
                        <input
                          type="number"
                          name="basePrice"
                          id="basePrice"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          ref={basePriceRef}
                          placeholder="2000"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label for="Type">Type</label>
                        <select
                          name="Type"
                          id="Type"
                          ref={typeRef}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          onChange={toggleOtherTypeInput}
                        >
                          {getTypeOptions()}
                          {getTypeOptions()}
                          {getTypeOptions()}
                          <option value="others">Others</option>
                        </select>
                        {showOtherTypeInput && (
                          <input
                            type="text"
                            id="otherTypeInput"
                            name="otherType"
                            ref={typeRef}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="Enter other type"
                          />
                        )}
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            className="bg-[#CA67F5] hover:bg-[#9747FF] text-white font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventDetails;
