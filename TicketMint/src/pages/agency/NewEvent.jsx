import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/img/img1.png";

const NewEvent = () => {
  return (
    <div className="latptop:w-[65%] relative latptop:left-[15%] tablet:left-[25%] tablet:w-1/2 w-[80%] h-[80%] top-32 right-8 py-6 px-6 rounded-xl border border-gray-200 bg-white mt-10 flex flex-wrap gap-10">
     
      <div class=" h-screen flex flex-wrap items-center justify-center px-5 rounded-xl border border-gray-200 bg-morado4 opacity-85 w-[80%] tablet:w-[900px] latptop:w-[50%]">
      <button className="absolute top-10 left-10">
        <Link to="/events">
        <svg width="60px" height="60px" viewBox="-2 -2 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#CA67F5" fill-rule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm14 .069a1 1 0 01-1 1h-2.931V14a1 1 0 11-2 0v-2.931H6a1 1 0 110-2h3.069V6a1 1 0 112 0v3.069H14a1 1 0 011 1z"></path> </g></svg>        </Link>
      </button>
        <div class="flex flex-col w-full bg-white rounded shadow-lg movil:w-3/4 tablet:w-[85%] latptop:w-[90%]">
          <div
            class="w-full h-64 bg-top bg-cover rounded-t"
            img
            src={img1}
            alt="img1"
          />
        </div>
        <div class="flex flex-col w-full tablet:flex-row">
          <div class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-pink rounded tablet:flex-col tablet:items-center tablet:justify-center tablet:w-1/4">
            <div class="tablet:text-3xl">New</div>
            {/* <div class="tablet:text-6xl">Date</div> */}
            <div class="tablet:text-xl">Date</div>
          </div>
          <div class="p-4 font-normal text-gray-800 tablet:w-3/4">
            <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-white">
              Band Name
            </h1>
            <p class="leading-normal">Description</p>
            <div class="flex flex-row items-center mt-4 text-gray-800">
              <div class="w-1/2"> Eslogan </div>
              <div class="w-1/2 flex justify-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
