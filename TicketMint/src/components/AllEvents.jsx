import React from "react";
import img1 from "../assets/img/img1.png";


const AllEvents = () => {
  return (
    <div class=" h-screen flex flex-wrap items-center justify-center px-5 rounded-xl border border-gray-200 bg-morado3 opacity-85 w-[80%] tablet:w-[900px] latptop:w-[50%]">
      <div class="flex flex-col w-full bg-white rounded shadow-lg movil:w-3/4 tablet:w-[85%] latptop:w-[90%]">
        <div
          class="w-full h-64 bg-top bg-cover rounded-t"
          img src={img1} alt="img1" />
        </div>
        <div class="flex flex-col w-full tablet:flex-row">
          <div class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-morado4 rounded tablet:flex-col tablet:items-center tablet:justify-center tablet:w-1/4">
            <div class="tablet:text-3xl">April</div>
            <div class="tablet:text-6xl">13</div>
            <div class="tablet:text-xl">7 pm</div>
          </div>
          <div class="p-4 font-normal text-white tablet:w-3/4">
            <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-white">
              Arch Enemy  
            </h1>
            <p class="leading-normal">
              Arch Enemy es una banda sueca de death metal melódico formada en
              Halmstad en 1995. En sus inicios exploró el death metal original,
              pero sufrió una transformación musical después del cambio de
              integrantes que tuvo, y comenzó a hacer un death metal más
              melódico, que sigue haciendo actualmente.
            </p>
            <div class="flex flex-row items-center mt-4 text-white">
              <div class="w-1/2">Arch Enemy live     </div>
              <div class="w-1/2 flex justify-end">
               
              </div>
            </div>
          </div>
        </div>
        
      </div>
    
  );
};

export default AllEvents;
