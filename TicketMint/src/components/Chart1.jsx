import React from 'react'
import Chart from "react-apexcharts";
import { useSelector } from 'react-redux';

const Chart1 = () => {
  const transactions = useSelector((state) => state.authReducer.user.transactions);
  const salesByMonth = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).getMonth();
    acc[month] = (acc[month] || 0) + transaction.amount;
    return acc;
  }, {});
  const months = Object.keys(salesByMonth).map(month => new Date(2022, month).toLocaleString('default', { month: 'short' }));
  const sales = Object.values(salesByMonth);
  const chartConfig = {
    series: [
      {
        name: "Sales",
        data: sales,
      },
    ],
    chart: {
      type: "bar",
      height: 240,
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#16BDCA"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#0B0B1C",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: months,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#0B0B1C",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  };
  return (
    <div className="relative flex flex-col justify-center rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none tablet:flex-row tablet:items-center">
        <div className="w-max rounded-lg bg-gray-200 p-5 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#16BDCA"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
            ></path>
          </svg>
        </div>
        <div>
          <h6 className=" text-xl font-bold block font-sans text-gray-900 leading-relaxed tracking-normal  antialiased">
            My Balance
          </h6>
          <p className="block max-w-sm font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
            Visualize the sales you have had in the last months.
          </p>
        </div>
      </div>
      <div className="pt-6 px-2 pb-0">
        <Chart
          options={chartConfig}
          series={chartConfig.series}
          type="bar"
          height={240}
        />
      </div>

    </div>

  )
}

export default Chart1
