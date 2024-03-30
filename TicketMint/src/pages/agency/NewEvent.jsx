import React, { useState } from "react";


const NewEvent = () => {
  const [showOtherCategoryInput, setShowOtherCategoryInput] = useState(false);
  const [showOtherTypeInput, setShowOtherTypeInput] = useState(false);

  const toggleOtherCategoryInput = (event) => {
    setShowOtherCategoryInput(event.target.value === "others");
  };
  const toggleOtherTypeInput = (event) => {
    setShowOtherTypeInput(event.target.value === "others");
  };

  return (
    <div className="latptop:w-[65%] relative latptop:left-[15%] tablet:left-[25%] tablet:w-1/2 w-[80%] h-[80%] top-32 right-8 py-6 px-6 rounded-xl border border-gray-200 bg-white mt-10 flex flex-wrap gap-10">
      <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
          <div>
            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div class="text-gray-600">
                  <p class="font-medium text-lg">Create New Event</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div class="lg:col-span-2">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div class="md:col-span-5">
                      <label for="full_name">Name</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>

                    <div class="md:col-span-5">
                      <label for="Description">Description</label>
                      <input
                        type="text"
                        name="Description"
                        id="Description"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                        placeholder="Festival"
                      />
                    </div>

                    <div class="md:col-span-5">
                      <label for="category">Category</label>
                      <select
                        name="category"
                        id="category"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={toggleOtherCategoryInput}
                      >
                        <option value="1">category1</option>
                        <option value="others">Others</option>
                      </select>
                      {showOtherCategoryInput && (
                        <input
                          type="text"
                          id="otherCategoryInput"
                          name="otherCategory"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter other category"
                        />
                      )}
                    </div>
                    <div class="md:col-span-5">
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="user_avatar"
                      >
                        Upload file
                      </label>
                      <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                      />
                      <div
                        class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="user_avatar_help"
                      >
                        A photo is useful to promote your event
                      </div>
                    </div>
                    <div className="col-span5 block">
                      <input
                        type="date"
                        name="date"
                        id="date"
                        class=" h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div class="md:col-span-5">
                      <label for="Location">Location</label>
                      <input
                        type="text"
                        name="Location"
                        id="Location"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                        placeholder="222 Ave Flower"
                      />
                    </div>
                    <div class="md:col-span-5">
                      <label for="Location Url">Location Url</label>
                      <input
                        type="text"
                        name="Location Url"
                        id="Location Url"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                        placeholder="url"
                      />
                    </div>

                    <div class="md:col-span-5">
                      <label for="Cit">City</label>
                      <input
                        type="text"
                        name="Cit"
                        id="Cit"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                        placeholder="Bogota"
                      />
                    </div>

                    <div class="md:col-span-5">
                      <div class="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                          required
                        />
                      </div>

                      <label
                        for="remember"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        I agree with the{" "}
                        <a
                          href="#"
                          class="text-[#CA67F5] hover:underline dark:text-blue-500"
                        >
                          terms and conditions
                        </a>
                        .
                      </label>
                    </div>

                    <div class="md:col-span-5 text-right">
                      <div class="inline-flex items-end">
                        <button class="bg-[#CA67F5] hover:bg-[#9747FF] text-white font-bold py-2 px-4 rounded">
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
      <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
          <div>
            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div class="text-gray-600">
                  <p class="font-medium text-lg">New Ticket</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div class="lg:col-span-2">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div class="md:col-span-5">
                      <label for="full_name">Name</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>

                    <div class="md:col-span-5">
                      <label for="Quantity">Quantity</label>
                      <input
                        type="number"
                        name="Quantity"
                        id="Quantity"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                        placeholder="1000"
                      />
                    </div>

                    <div class="md:col-span-5">
                      <label for="Type">Type</label>
                      <select
                        name="Type"
                        id="Type"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={toggleOtherTypeInput}
                      >
                        <option value="1">Type1</option>
                        <option value="others">Others</option>
                      </select>
                      {showOtherTypeInput && (
                        <input
                          type="text"
                          id="otherTypeInput"
                          name="otherType"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter other type"
                        />
                      )}
                    </div>

                    <div class="md:col-span-5 text-right">
                      <div class="inline-flex items-end">
                        <button class="bg-[#CA67F5] hover:bg-[#9747FF] text-white font-bold py-2 px-4 rounded">
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
    </div>
  );
};

export default NewEvent;
