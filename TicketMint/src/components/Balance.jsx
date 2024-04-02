import React from "react";
import Chart1 from "./Chart1";
import { useSelector } from "react-redux";
import { FcSalesPerformance, FcMoneyTransfer  } from "react-icons/fc";
import { BsCalendar2Check } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";

const Balance = () => {

  const sales= useSelector((state) => state.authReducer.user)



  return (
    <>
      <div className="w-full flex justify-center px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500  ">
        <div className="flex flex-wrap justify-center removable latptop:flex-row ">
          <div className="w-1/4 max-w-full px-3 movil:w-1/2 movil:flex-none laptop:mb-0 laptop:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
              <div className="flex-auto border-2 p-5 rounded-xl shadow-lg  tablet:w-[200px]">
                <div className="flex flex-row -mx-3  ">
                  <div className="flex-none w-2/3 max-w-full ">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">Events Active</p>
                      <h5 className="mb-0 text-center font-bold"> {sales.events.length} <span className="leading-normal invisible text-sm font-weight-bolder text-lime-500 p-5">+55%</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-morado1 to-morado3 shadow-soft-2xl">
                    <BsCalendar2Check className="text-4xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 max-w-full px-3 movil:w-1/2 movil:flex-none laptop:mb-0 laptop:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
              <div className="flex-auto border-2 p-5 rounded-xl shadow-lg  tablet:w-[200px]">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">Total Events</p>
                      <h5 className="mb-0 font-bold"> {sales.events.length} <span className="leading-normal hidden text-sm font-weight-bolder text-lime-500 p-5">+3%</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-morado1 to-morado3 shadow-soft-2xl">
                    <LuCalendarDays className="text-4xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 max-w-full px-3 movil:w-1/2 movil:flex-none laptop:mb-0 laptop:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
              <div className="flex-auto border-2 p-5 rounded-xl shadow-lg  tablet:w-[200px]">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">Today Sale's</p>
                      <h5 className="mb-0 font-bold"> +3,462 <span className="leading-normal text-red-600 hidden text-sm font-weight-bolder p-5">-2%</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-morado1 to-morado3 shadow-soft-2xl">
                      <FcMoneyTransfer className="text-4xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 max-w-full px-3 movil:w-1/2 movil:flex-none laptop:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
              <div className="flex-auto border-2 p-5 rounded-xl shadow-lg  tablet:w-[200px]">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">Total Sales</p>
                      <h5 className="mb-0 font-bold"> $ {sales.balance} <span className="leading-normal hidden text-sm font-weight-bolder text-lime-500 p-5">+5%</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-morado1 to-morado3 shadow-soft-2xl">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-morado1 to-morado3 shadow-soft-2xl">
                    <FcSalesPerformance className="text-4xl" />
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly w-full ">
        <Chart1 />
      </div>
    </>
  );
}

export default Balance;
