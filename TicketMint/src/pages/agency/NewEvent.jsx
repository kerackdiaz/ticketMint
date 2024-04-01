import React, { useState, useRef } from "react";
import { useSelector} from "react-redux";
import { createEvent,CategortiesProvider,CitiesProvider } from "../../utils/Db";


const NewEvent = () => {
  const [showOtherCategoryInput, setShowOtherCategoryInput] = useState(false);
  const [showOtherCityInput, setShowOtherCityInput] = useState(false);
  const categories1 = CategortiesProvider();
  const cat = useSelector((state) => state.authReducer.categories)
  const city = useSelector((state) => state.authReducer.cities)
  const cities = CitiesProvider();
  const token = useSelector((state) => state.authReducer.token.token);
 
 

  const full_nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const user_avatarRef = useRef(null);
  const dateRef = useRef(null);
  const LocationRef = useRef(null);
  const Location_UrlRef = useRef(null);
  const CitRef = useRef(null);

  const toggleOtherCategoryInput = (event) => {
    setShowOtherCategoryInput(event.target.value === "others");
  };
  const toggleOtherCityInput = (event) => {
    setShowOtherCityInput(event.target.value === "others");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categoryRef.current.value;
    const categoriesArray =
      selectedCategory === "others" ? ["others"] : [selectedCategory];
    const formattedDate = new Date(dateRef.current.value).toISOString();
    const formData = {
      name: full_nameRef.current.value,
      description: descriptionRef.current.value,
      categories: categoriesArray,
      imageURL: "https://via.placeholder.com/150",
      date: formattedDate,
      venueName: LocationRef.current.value,
      venueURL: Location_UrlRef.current.value,
      city: CitRef.current.value,
    };

    console.log("formData", formData);
    const response = await createEvent(formData, token);
    alert("Event created successfully");
    console.log("response", response);

    if (response && response.success === true) {
      window.location.href = `/EventDetails/${response.event}`;
    }
  
  }
  const getCategories = () => {
    if(!cat || cat.length === 0 || cat === undefined || cat === null){
      return 
    }
    return Object.values(cat).map((category, index) => {
        return <option value={category.name} key={index}>{category.name}</option>
      })
  }

  const getCities = () => {
    if(!city || city.length === 0 || city === undefined || city === null){
      return}
    return Object.values(city).map((cit, index) => {
        return <option value={cit.name} key={index}>{cit.name}</option>
    })}
  

  return (
    <div className="lg:w-[78%] relative lg:left-[14%] tablet:left-[25%] tablet:w-1/2 w-[80%] h-[80%] md:w-[490px]   top-32 right-8 py-6 px-6 rounded-xl border border-gray-200 bg-[#DBC1FA] mt-10 flex flex-wrap gap-10 dark:bg-[#0B0B1C]">
      <div className=" flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Create New Event</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <input type="text" />

                      <div className="md:col-span-5">
                        <label for="full_name">Name</label>
                        <input
                          type="text"
                          id="full_name"
                          ref={full_nameRef}
                          className="h-10 border mt-1 rounded px-4 w-[100%] bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label for="Description">Description</label>
                        <input
                          type="text"
                          id="Description"
                          ref={descriptionRef}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Festival"
                         
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="category">Category</label>
                        <select
                          name="category"
                          id="category"
                          ref={categoryRef}
                          onChange={toggleOtherCategoryInput}
                          className=" h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        >
                          {getCategories()}
                        
                          <option value="others" className="w-full">Others</option>
                          <option value="None" disabled >None</option>
                        </select>
                        {showOtherCategoryInput && (
                          <input
                            type="text"
                            id="otherCategoryInput"
                            name="otherCategory"
                            ref={categoryRef}
                            placeholder="Enter other category"
                            className=" h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        )}
                       
                      </div>
                      <div className="md:col-span-5">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="user_avatar"
                        >
                          Upload file
                        </label>
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          aria-describedby="user_avatar_help"
                          id="user_avatar"
                          type="file"
                          ref={user_avatarRef}
                        />
                        <div
                          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                          id="user_avatar_help"
                        >
                          A photo is useful to promote your event
                        </div>
                      </div>
                      <div className="col-span5 block tablet:w-[375px] desktop:w-[630px] laptop:w-[450px]">
                        <input
                          type="datetime-local"
                          name="date"
                          id="date"
                          ref={dateRef}
                          className=" h-10 border mt-1 rounded px-4 w-full bg-gray-50 w-full"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label for="Location">Location</label>
                        <input
                          type="text"
                          name="Location"
                          id="Location"
                          ref={LocationRef}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="222 Ave Flower"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label for="Location Url">Location Url</label>
                        <input
                          type="text"
                          name="Location Url"
                          id="Location Url"
                          ref={Location_UrlRef}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="url"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="Cit">City</label>
                        <select
                          name="Cit"
                          id="Cit"
                          ref={CitRef}
                          onChange={toggleOtherCityInput}
                          className=" h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        >
                          {getCities()}
                        
                          <option value="others" className="w-full">Others</option>
                          <option value="None" disabled >None</option>
                        </select>
                        {showOtherCityInput && (
                          <input
                            type="text"
                            id="otherCityInput"
                            name="otherCity"
                            ref={CitRef}
                            placeholder="Enter other city"
                            className=" h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        )}
                       
                      </div>
                      <div className="md:col-span-5">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                            required
                          />
                        </div>

                        <label
                          for="remember"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >
                          I agree with the{" "}
                          <a
                            href="#"
                            className="text-[#CA67F5] hover:underline dark:text-blue-500"
                          >
                            terms and conditions
                          </a>
                          .
                        </label>
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default NewEvent;
