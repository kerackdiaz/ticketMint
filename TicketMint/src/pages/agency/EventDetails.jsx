import React,{ useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoCameraReverse } from "react-icons/io5";
import { changeData, changeAvatar, EventProvider, deleteTicket } from "../../utils/Db";
import { createTicket } from "../../utils/Db";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { set } from "date-fns";


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
  const [banner , setBanner] = useState(even.imageURL || "")
  const [selectedType, setSelectedType] = useState("");
  const [ticketId, setTicketId] = useState("");
  const Navigate = useNavigate();
  console.log(event);
  const ticketTypes = useSelector((state) => state.authReducer.ticketTypes);

  const nameRef = useRef();
  const quantityRef = useRef();
  const basePriceRef = useRef();
  const typeRef = useRef();

  useEffect(() => {
    if (even) {
      setLocation(even.venueUrl || "");
      setDescription(even.description || "");
      setDate(even.date || "");
      setLocationURL(even.venueURL || "");
      setBanner(even.imageURL || "");
    }
  }, [even]);

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const toggleOtherTypeInput = (event) => {
    setShowOtherTypeInput(event.target.value === "others");
  };

  const deleteTicketId = async (idTicket) => {
    console.log(idTicket);
    const response = await deleteTicket(idTicket, token);
    if (response.success) {
      navigate("/Events")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("banner: " +banner, "description: "+description, "date: "+date, "location: "+location, "url: "+locationURL);
    // const response = await changeData(
    //   { location, description, date, locationURL, banner},
    //   token
    // );
    // if (response.success) {
    //   reloadData();
    // }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const ticket = {
      name: nameRef.current.value,
      availableQuantity: quantityRef.current.value,
      basePrice: basePriceRef.current.value,
      type: selectedType,
    };
    console.log(ticket);
    const response = await createTicket(even.id, token, ticket);

    if(response.susscess){
      Navigate("/Events")
    }
  };



  return (
    <div id="EventDetails" className=" laptop:translate-x-[10vw] laptop:translate-y-[15vh] laptop:w-4/5 movil:w-full  movil:translate-x-[-8vw] movil:translate-y-[18vh] rounded-lg flex justify-center max-h-[80vh]">
      <div className="w-full bg-white px-5 py-4 overflow-y-scroll">
        <div class="px-6">

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
                    <dl class=" flex laptop:flex-wrap movil:flex-col laptop:flex-row ">
                      <div class="py-3 sm:py-5  sm:gap-4 sm:px-6 w-full">
                        <dt class="text-sm font-medium text-gray-500">
                          Categories
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-center">
                            <ul className="text-center flex flex-wrap gap-4 justify-center  py-2.5 px-0  w-4/5 text-sm  bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700">
                              {even.categories.map((category) => (
                                <li key={category.id}>{category.name} </li>
                              ))}
                            </ul>
                          </dd>
                        </dt>
                      </div>
                      <div className="laptop:w-9/12 movil:w-full">
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

                          <dt class="text-sm font-medium text-gray-500">
                            Description
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <textarea
                              placeholder={
                                even.description == null
                                  ? "Description"
                                  : even.description
                              }
                              className=" text-center  py-2.5 px-0 w-[50%] f text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700"
                              value={description}
                              onChange={(e) => handleInputChange(e, setDescription)}
                            />
                          </dd>
                        </div>

                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">Date</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="date"
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
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Location URL
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <lu className="flex justify-center flex-wrap gap-2">
                            {even.ticketTypes.map((type) => (
                                <li key={type.id} className="flex gap-5 justify-center bg-gray-200 w-4/5"><span>Name: {type.name}</span> <span>Quantity :{type.availableQuantity}</span> <span>Location: {type.type}</span> <span>Price: ${type.basePrice}</span> <button onClick={() => deleteTicketId(type.id)}><MdDelete className="text-red-500" /> </button></li>
                                ))}
                            </lu>
                          </dd>
                        </div>
                      </div>
                      <div className="laptop:w-3/12 movil:w-full laptop:border-l border-gray-200">
                        <h3 className="w-full text-center text-gray-500">Event banner</h3>
                        <img className="w-full h-auto object-contain group-hover:opacity-0" src={even.imageURL} alt="" />
                        <label form="changepic" className="cursor-pointer hover:opacity-100 opacity-0 relative z-10 w-full h-[85%] translate-y-[-100%] flex justify-center items-center  bg-[#80808073] text-5xl" >
                          <div>
                            <IoCameraReverse />
                          </div>
                          <input type="file" id="changepic" class="hidden" onChange={handleInputChange} />
                        </label>
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
        <form onSubmit={handleSubmit2} className="mt-5">
          <div className=" ">
            <div className="container  mx-auto">
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
                            <label htmlFor="Type">Type</label>
                            <select
                                name="Type"
                                id="Type"
                                value={selectedType}
                                onChange={handleTypeChange}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            >
                                {["Select a location", "GENERAL", "VIP", "PLATINO", "PREFERENTIAL", "FRONT_ROW", "BACKSTAGE_PASS", "MEET_AND_GREET", "BALCONY", "ALL_ACCESS_PASS", "VIP_EXPERIENCE", "ULTIMATE_FAN_PACKAGE"].map((option, index) => (
                              
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
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
    </div>
  );
};

export default EventDetails;
