import React from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";


const Balance = () => {

    return (
    <>
    <Chart1 />
    <Chart2 />
      <div className="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500  ">
        <div className="flex flex-wrap flex-col -mx-3 removable lg:flex-row ">
          <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
              <div className="flex-auto border-2 p-5 rounded-xl shadow-lg  md:w-[200px]">
                <div className="flex flex-row -mx-3  ">
                  <div className="flex-none w-2/3 max-w-full ">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">Today's Money</p>
                      <h5 className="mb-0 font-bold"> $53,000 <span className="leading-normal text-sm font-weight-bolder text-lime-500 p-5">+55%</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-morado1 to-morado3 shadow-soft-2xl">
                    <svg  className="ml-1.5 mt-2" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24" stroke="#c4bc00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 7.5V16.5" stroke="#c4bc00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" stroke="#c4bc00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 3V7H21" stroke="#c4bc00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 2L17 7" stroke="#c4bc00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
            <div className="flex-auto border-2 p-5 rounded-xl shadow-lg  md:w-[200px]">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">Today's Users</p>
                      <h5 className="mb-0 font-bold"> 2,300 <span className="leading-normal text-sm font-weight-bolder text-lime-500 p-5">+3%</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                  <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-morado1 to-morado3 shadow-soft-2xl">
                  <svg className="ml-1.5 mt-2" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.1303 13C13.8203 13 15.1903 11.63 15.1903 9.94C15.1903 8.25001 13.8203 6.88 12.1303 6.88C10.4403 6.88 9.07031 8.25001 9.07031 9.94C9.07031 11.63 10.4403 13 12.1303 13Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.5 19.11C6.80719 17.8839 7.51529 16.7956 8.51178 16.0179C9.50827 15.2403 10.736 14.818 12 14.818C13.264 14.818 14.4917 15.2403 15.4882 16.0179C16.4847 16.7956 17.1928 17.8839 17.5 19.11" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                       </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
            <div className="flex-auto border-2 p-5 rounded-xl shadow-lg  md:w-[200px]">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">New Clients</p>
                      <h5 className="mb-0 font-bold"> +3,462 <span className="leading-normal text-red-600 text-sm font-weight-bolder p-5">-2%</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                  <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-morado1 to-morado3 shadow-soft-2xl">
                  <svg className="ml-2 mt-2" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 18L19 15M19 15L22 18M19 15V21M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M12 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" stroke="#b1dd8c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                  
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
            <div className="flex-auto border-2 p-5 rounded-xl shadow-lg  md:w-[200px]">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">Sales</p>
                      <h5 className="mb-0 font-bold"> $103,430 <span className="leading-normal text-sm font-weight-bolder text-lime-500 p-5">+5%</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                  <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-morado1 to-morado3 shadow-soft-2xl">
                  <svg className="ml-1.5 mt-2" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.25 23C18.1454 23 17.25 22.1046 17.25 21C17.25 19.8954 18.1454 19 19.25 19C20.3546 19 21.25 19.8954 21.25 21C21.25 22.1046 20.3546 23 19.25 23Z" stroke="#e63b7a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.25 23C8.14543 23 7.25 22.1046 7.25 21C7.25 19.8954 8.14543 19 9.25 19C10.3546 19 11.25 19.8954 11.25 21C11.25 22.1046 10.3546 23 9.25 23Z" stroke="#e63b7a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M0.999804 1.15601H2.0378C2.53357 1.15583 3.0155 1.31947 3.40866 1.62148C3.80182 1.92349 4.08417 2.34695 4.2118 2.82601L7.4788 14.887C7.56422 15.2069 7.75305 15.4895 8.01587 15.6908C8.2787 15.8921 8.60074 16.0008 8.9318 16H19.7498C20.0804 16.0002 20.4017 15.8912 20.6639 15.6899C20.9261 15.4886 21.1145 15.2064 21.1998 14.887L22.9912 7.03765" stroke="#e63b7a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M23 7H5.75" stroke="#e63b7a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  }

  export default Balance;
