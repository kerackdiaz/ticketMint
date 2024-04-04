import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  createEvent,
  CategortiesProvider,
  CitiesProvider,
} from "../../utils/Db";
import { uploadFile } from "../../utils/Firebase";
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
  const [showOtherCategoryInput, setShowOtherCategoryInput] = useState(false);
  const [showOtherCityInput, setShowOtherCityInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [otherCity, setOtherCity] = useState("");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueURL, setVenueURL] = useState("");
  const [cit, setCit] = useState([]);
  const categories1 = CategortiesProvider();
  const user = useSelector((state) => state.authReducer.user);
  const cat = useSelector((state) => state.authReducer.categories);
  const city = useSelector((state) => state.authReducer.cities);
  const cities = CitiesProvider();
  const token = useSelector((state) => state.authReducer.token.token);

  const toggleOtherCategoryInput = (event) => {
    setSelectedCategory(event.target.value);
    setShowOtherCategoryInput(event.target.value === "others");
  };

  const toggleOtherCityInput = (event) => {
    setSelectedCity(event.target.value);
    setShowOtherCityInput(event.target.value === "others");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const newId = "/agency/" + user.companyName + "/" + name;
    const url = await uploadFile(file, newId);
    console.log(url);
    setUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoriesArray =
      selectedCategory === "others" ? [otherCategory] : [selectedCategory];
    const cit = selectedCity === "others" ? otherCity : selectedCity;
    console.log("categoriesArray", categoriesArray);
    const formattedDate = new Date(date).toISOString();

    const formData = {
      name: name,
      description: description,
      categories: categoriesArray,

      imageURL: url,
      date: formattedDate,
      venueName: venueName,
      venueURL: venueURL,
      city: cit,
    };

    const response = await createEvent(formData, token);
    if (response.success) {
      navigate("/events");
    }
  };
  const getCategories = () => {
    if (!cat || cat.length === 0 || cat === undefined || cat === null) {
      return;
    }
    return Object.values(cat).map((category, index) => {
      return (
        <option value={category.name} key={index}>
          {category.name}
        </option>
      );
    });
  };

  const getCities = () => {
    if (!city || city.length === 0 || city === undefined || city === null) {
      return;
    }
    return Object.values(city).map((cit, index) => {
      return (
        <option value={cit.name} key={index}>
          {cit.name}
        </option>
      );
    });
  };

  return (
    <div className=" laptop:translate-x-[10vw] laptop:translate-y-[15vh] laptop:w-4/5 movil:w-full max-h-[80vh]  movil:translate-x-[-8vw] movil:translate-y-[18vh]  flex justify-center ">
      <div className=" flex items-center justify-center ">
        <div className="container max-w-screen-lg mx-auto  ">
          <div>
            <div className="bg-[#dbc1fa] dark:bg-gray-900 dark:border-2 mt-12 shadow-lg rounded-3xl p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600 dark:text-white">
                  <p className="font-medium text-lg ">Create New Event</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 text-white">
                      <div className="md:col-span-5">
                        <label for="full_name ">Name</label>
                        <input
                          type="text"
                          id="full_name"
                          placeholder="Event Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-[100%] bg-gray-50 dark:bg-[#131516]"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label for="Description">Description</label>
                        <input
                          type="text"
                          id="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-[#131516]"
                          placeholder="Festival"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="category">Category</label>
                        <select
                          name="category"
                          id="category"
                          value={selectedCategory}
                          onChange={toggleOtherCategoryInput}
                          className=" h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-[#131516]"
                        >
                          {getCategories()}

                          <option value="">Select a Category</option>
                          <option value="others" className="w-full">
                            Others
                          </option>
                        </select>
                        {showOtherCategoryInput && (
                          <input
                            type="text"
                            id="otherCategoryInput"
                            name="otherCategory"
                            value={otherCategory}
                            onChange={(e) => setOtherCategory(e.target.value)}
                            placeholder="Enter other category"
                            className=" h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-[#131516]"
                          />
                        )}
                      </div>
                      <div className="md:col-span-5">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="Banner_Event"
                        >
                          Upload file
                        </label>
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-[#131516] dark:border-gray-600 dark:placeholder-gray-400"
                          aria-describedby="Banner_Event_help"
                          id="Banner_Event"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <div
                          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                          id="Banner_Event_help"
                        >
                          A photo is useful to promote your event
                        </div>
                      </div>
                      <div className="col-span5 block tablet:w-[375px] desktop:w-[630px] laptop:w-[450px]">
                        <input
                          type="datetime-local"
                          name="date"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className=" h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-[#131516]"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label for="Location">Location</label>
                        <input
                          type="text"
                          name="Location"
                          id="Location"
                          value={venueName}
                          onChange={(e) => setVenueName(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-[#131516]"
                          placeholder="222 Ave Flower"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label for="Location Url">Location Url</label>
                        <input
                          type="text"
                          name="Location Url"
                          id="Location Url"
                          value={venueURL}
                          onChange={(e) => setVenueURL(e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-[#131516]"
                          placeholder="url"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="Cit">City</label>
                        <select
                          name="Cit"
                          id="Cit"
                          value={selectedCity}
                          onChange={toggleOtherCityInput}
                          className=" h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-[#131516]"
                        >
                          {getCities()}

                          <option value="None">Select a city</option>
                          <option value="others" className="w-full">
                            Others
                          </option>
                        </select>
                        {showOtherCityInput && (
                          <input
                            type="text"
                            id="otherCityInput"
                            name="otherCity"
                            value={otherCity}
                            onChange={(e) => setOtherCity(e.target.value)}
                            placeholder="Enter other city"
                            className=" h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-[#131516]"
                          />
                        )}
                      </div>
                      <div className="md:col-span-5">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-[#131516] dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
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
