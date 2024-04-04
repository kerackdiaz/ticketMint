import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSun,FaMoon } from "react-icons/fa";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const Layout = ({ onLogin }) => {
  const userdata = useSelector((state) => state.authReducer.user);
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdownUser, setShowDropdownUser] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [tourMode, setTourMode] = useState(localStorage.getItem('tourMode') === 'true');

  useEffect(() => {
    if (tourMode) {
    const driverObj = driver({
      showProgress: true,
      steps: [
        { element: 'root', popover: { title: 'Welcome, ' + userdata.firstname , description: 'With TicketMint, you will be able to publish your events, sell tickets and receive your earnings directly into your bank account. In addition, you will have access to complete reports on the performance of your events.', side: "left", align: 'start' }},
        { element: '#ReportAgency', popover: { title: 'Your\'s reports' , description: 'Your first view will always be your agency\'s sales report.', side: "left", align: 'start' }},
        { element: '#eventsActive', popover: { title: 'Your\'s events actives' , description: 'Here you will see the active events', side: "left", align: 'start' }},
        { element: '#totalEvents', popover: { title: 'Total Events' , description: 'Here you will see all your events created on our platform.', side: "left", align: 'start' }},
        { element: '#todaySales', popover: { title: 'Day-to-day sales' , description: 'Every 24 hours you will see a balance of the sales made during the day.', side: "left", align: 'start' }},
        { element: '#TotalSales', popover: { title: 'All your sales' , description: 'Find your total balance before it is transferred to your bank account', side: "left", align: 'start' }},
        { element: '#Chart', popover: { title: 'Sales history for the month' , description: 'You will be able to see a month-by-month graph of your income.', side: "left", align: 'start' }},
        { element: '#MyEvents', popover: { title: 'My Events' , description: 'Here you can find all your events, as well as create, edit or view more details about them.', side: "left", align: 'start' }},
        { element: '#MyReports', popover: { title: 'All Reports All Transactions' , description: 'You will always find here your sales and transaction reports.', side: "left", align: 'start' }},
        { element: '#MyNotifications', popover: { title: 'Day-to-day sales' , description: 'Send real-time notifications to your event participants', side: "left", align: 'start' }},
        { element: '#MyProfile', popover: { title: 'Your Profile' , description: 'Set up your account, add your company logo, agency name or just change the theme of the platform.', side: "left", align: 'start' }},
        { popover: { title: 'Happy sales', description: 'And that\'s it, go ahead and start creating your events.' } }
      ]
    });
    driverObj.drive();
      localStorage.setItem('tourMode', 'false');
      setTourMode(false);
      console.log('tourMode', tourMode);
  }
}, [tourMode]);




  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const sidebarRef = useRef(null);
  
  const toggleMenu2 = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenu3 = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target) && showMenu) {
            setShowMenu(false);
        }
    };

    if (showMenu) {
        document.addEventListener('click', handleClickOutside);
    } else {
        document.removeEventListener('click', handleClickOutside);
    }

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, [showMenu]);


  const toggleDropdownUser = () => {
    setShowDropdownUser(!showDropdownUser);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && showDropdownUser) {
            setShowDropdownUser(false);
        }
    };

    if (showDropdownUser) {
        document.addEventListener('click', handleClickOutside);
    } else {
        document.removeEventListener('click', handleClickOutside);
    }

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, [showDropdownUser]);


  const handleLogout = () => {
    onLogin();
  }
  

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-[] dark:bg-[#0B0B1C] dark:border-[#0B0B1C]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 ">
          <div className="flex items-center justify-between h-[100px] ">
            <div ref={sidebarRef} className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <div className={`${showMenu ? "block" : "hidden"}`}>
                <ul className="space-y-2 font-medium absolute bg-white p-10 pr-20  top-[125px] left-1 border-2 dark:bg-[#0B0B1C] dark:border-[#55347B]">
                  <li className="flex flex-col mb-5">
                    <button
                      type="button"
                      className="flex items-center w-full p>-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      aria-controls="dropdown-example"
                      data-collapse-toggle="dropdown-example"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                      >
                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                      </svg>
                      <span  className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Events
                      </span>
                    </button>
                    <div>
                      <button
                        onClick={toggleMenu2}
                        className="relative left-28 top-[-23px]"
                      >
                        <svg
                          className="w-3 h-3 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      <ul
                        id="dropdown-example"
                        className="hidden py-2 space-y-2 relative "
                        class={`${isMenuOpen ? "block" : "hidden"}`}
                      >
                        <li>
                          <Link
                            to={"/NewEvent"}
                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          >
                            New Event
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/Events"}
                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          >
                            All Events
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/OldEvents"}
                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          >
                            Old Events
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex flex-col ">
                    <button
                      type="button"
                      className="flex items-center w-full p>-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      aria-controls="dropdown-example"
                      data-collapse-toggle="dropdown-example"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 21"
                      >
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                      </svg>
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        Reports
                      </span>
                    </button>
                    <div>
                      <button
                        onClick={toggleMenu3}
                        className=" relative left-28 bottom-[20px]"
                      >
                        <svg
                          className="w-3 h-3 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      <ul
                        id="dropdown-example"
                        className="hidden py-2 space-y-2 relative "
                        class={`${isOpen ? "block" : "hidden"}`}
                      >
                        <li>
                          <Link
                            to={"/Report"}
                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          >
                            Balance
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/Transactions"}
                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          >
                            Transactions
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <Link
                      to={"/Inbox"}
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white relative right-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <a
                
                className="flex ms-2 tablet:me-24 w-[100px]"
              >
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 180 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="90" cy="90" r="90" fill="#CA67F5" />
                  <path
                    d="M77.0204 69.9416C77.0204 74.0509 77.0204 78.5129 77.0204 82.6221C77.0204 82.9461 76.5603 83.1081 75.6402 83.1081C72.6664 83.1081 69.5889 83.0995 66.6151 83.1125C65.8706 83.1125 65.6747 83.0257 65.6747 82.7653C65.6921 74.434 65.6921 65.4206 65.6747 57.0892C65.6747 56.8245 65.9054 56.7421 66.6282 56.7464C69.6846 56.7594 72.845 56.7508 75.9014 56.7508C77.0117 56.7508 77.016 56.7508 77.016 57.1543C77.016 61.3027 77.016 65.627 77.016 69.7753L77.0204 69.9416Z"
                    fill="#55347B"
                  />
                  <path
                    d="M93.073 126.518C93.073 130.628 93.073 135.09 93.073 139.199C93.073 139.523 92.6129 139.685 91.6928 139.685C88.719 139.685 85.6415 139.676 82.6677 139.689C81.9232 139.689 81.7273 139.603 81.7273 139.342C81.7447 131.011 81.7447 121.997 81.7273 113.666C81.7273 113.401 81.958 113.319 82.6808 113.323C85.7372 113.336 88.8976 113.328 91.954 113.328C93.0642 113.328 93.0686 113.328 93.0686 113.731C93.0686 117.88 93.0686 122.204 93.0686 126.352L93.073 126.518Z"
                    fill="#55347B"
                  />
                  <path
                    d="M56.2575 105.495C57.1848 104.371 57.9511 103.273 58.8829 102.336C61.0555 100.144 63.7985 99.0075 66.8288 98.7949C70.0463 98.5692 73.8589 98.643 77.0895 98.5779C77.5902 98.5692 77.8253 98.7732 77.7992 99.2722C77.7905 99.4544 77.7992 99.6367 77.7992 99.8233C77.7992 112.641 77.7992 125.455 77.7992 138.274C77.7992 139.098 77.3783 139.51 76.5366 139.51C73.7501 139.51 70.3946 139.48 67.6081 139.528C66.7852 139.541 66.598 139.254 66.598 138.486C66.6198 129.096 66.6111 119.706 66.6111 110.316C66.6111 109.537 66.2323 109.213 65.4747 109.344C63.4414 109.691 62.2311 110.888 61.9393 112.989C61.7652 114.251 61.6476 115.536 61.6433 116.812C61.6215 129.053 61.6302 139.124 61.6302 151.365C61.6302 152.109 61.2645 152.48 60.533 152.48C57.6943 152.48 54.8599 152.48 52.0211 152.48C50.9805 152.48 50.9805 152.48 50.9762 151.448C50.9762 139.337 50.9979 129.395 50.95 117.284C50.9457 115.549 50.789 113.778 50.3971 112.095C49.9748 110.285 48.4553 109.305 46.6048 109.27C46.422 109.27 46.152 109.53 46.065 109.73C45.9692 109.951 46.0345 110.242 46.0345 110.507C46.0345 119.767 46.0345 129.027 46.0345 138.287C46.0345 139.021 45.6775 139.389 44.9634 139.389C42.0724 139.389 38.2178 139.367 35.3311 139.402C34.6258 139.41 34.4429 139.172 34.4473 138.499C34.4647 125.499 34.4647 112.498 34.4473 99.4978C34.4473 98.7775 34.665 98.5432 35.3964 98.5649C38.2308 98.6387 42.0332 98.5866 44.8676 98.7211C49.6003 98.9467 53.3882 100.908 55.9048 105.026C56.0049 105.191 56.1443 105.338 56.2618 105.495H56.2575Z"
                    fill="#55347B"
                  />
                  <path
                    d="M128.579 62.4173C129.742 63.4067 131.806 64.2789 132.833 65.3073C134.627 67.1037 135.69 69.3601 135.964 71.8379C136.264 74.5542 136.267 79.7061 136.38 82.4485C136.398 82.8737 136.236 83.0603 135.788 83.0603C132.662 83.0517 128.651 83.0473 125.525 83.0603C124.938 83.0603 124.837 82.7739 124.837 82.2793C124.837 80.1357 124.874 75.587 124.726 73.4521C124.643 72.2544 124.304 71.0308 123.833 69.9199C123.241 68.527 121.935 67.9542 120.468 67.8284C120.285 67.811 119.993 68.1061 119.889 68.3231C119.789 68.54 119.858 68.8351 119.858 69.0954C119.858 77.6221 119.858 73.501 119.858 82.0276C119.858 83.1471 119.858 83.1515 118.726 83.1515C115.861 83.1515 112.268 83.1341 109.407 83.1645C108.719 83.1731 108.502 82.9735 108.502 82.2793C108.519 60.648 108.519 51.6646 108.502 30.0334C108.502 29.3434 108.715 29.1351 109.403 29.1395C112.294 29.1698 115.914 29.1525 118.8 29.1525C119.854 29.1525 119.858 29.1569 119.858 30.1983C119.858 38.777 119.858 47.3557 119.858 55.9345C119.858 57.1495 120.124 57.3274 121.308 56.9889C123.128 56.4682 124.103 55.1794 124.452 53.4307C124.678 52.2851 124.765 51.1005 124.783 49.9289C124.826 46.8697 124.877 45.8309 124.837 42.7718C124.829 42.0037 125.012 41.713 125.839 41.726C128.782 41.7737 132.61 41.7607 135.549 41.7303C136.197 41.726 136.411 41.9169 136.406 42.5765C136.376 45.6096 136.351 46.6181 136.33 49.6555C136.303 52.8796 135.646 55.9301 133.704 58.6031C132.69 60.0004 130.543 61.1199 129.062 62.0094C128.927 62.0875 128.792 62.17 128.671 62.2654C128.614 62.3088 128.588 62.3956 128.583 62.4086L128.579 62.4173Z"
                    fill="#55347B"
                  />
                  <path
                    d="M97.0073 126.54C97.0073 117.567 97.0073 108.593 97.0073 99.6194C97.0073 98.4825 97.0073 98.4695 98.1219 98.4825C102.693 98.5432 107.282 98.374 111.828 98.7342C117.858 99.2115 122.042 102.822 122.935 109.296C123.135 110.741 123.2 112.212 123.205 113.674C123.231 121.836 123.218 129.999 123.218 138.161C123.218 138.994 122.787 139.41 121.925 139.41C119.164 139.41 116.408 139.41 113.648 139.41C112.916 139.41 112.549 139.052 112.546 138.334C112.538 129.99 112.538 121.641 112.512 113.297C112.512 112.707 112.39 112.099 112.228 111.526C111.802 109.982 109.59 108.723 108.023 109.127C107.862 109.17 107.687 109.426 107.644 109.613C107.579 109.886 107.618 110.185 107.618 110.472C107.618 124.757 107.618 136.872 107.618 151.157C107.618 151.97 107.22 152.378 106.425 152.381C103.638 152.381 100.852 152.381 98.0696 152.381C97.3614 152.381 97.0073 152.016 97.0073 151.287C97.0073 142.313 97.0073 135.509 97.0073 126.536V126.54Z"
                    fill="#55347B"
                  />
                  <path
                    d="M50.6553 67.7937C50.6553 58.8201 50.6553 49.8508 50.6553 40.8772C50.6553 40.1135 50.2794 39.1624 49.5276 39.1595C47.6075 39.1595 45.6918 39.1421 43.7717 39.1682C43.1752 39.1768 42.9663 38.9989 42.975 38.3654C43.0098 35.3843 43.0054 32.9667 42.975 29.9856C42.975 29.3955 43.1099 29.1482 43.75 29.1482C51.87 29.1655 60.5821 29.1612 68.7022 29.1482C69.2943 29.1482 69.4685 29.3608 69.4641 29.9292C69.4424 32.9363 69.4424 35.4038 69.4641 38.4109C69.4641 38.9837 69.29 39.1963 68.7022 39.1877C66.8387 39.1616 64.9709 39.179 63.1074 39.179C62.2889 39.179 61.8796 40.1222 61.8796 40.9206C61.8796 55.2315 61.8796 69.538 61.8796 83.8489C61.8796 87.5113 61.8622 91.1736 61.8927 94.836C61.897 95.5867 61.6663 95.8297 60.9043 95.821C58.0133 95.7819 54.5259 95.7732 51.6392 95.8253C50.8033 95.8383 50.6422 95.5433 50.6466 94.7882C50.6683 85.7886 50.6596 76.789 50.6596 67.7937H50.6553Z"
                    fill="#55347B"
                  />
                  <path
                    d="M127.216 124.371C127.216 115.397 127.216 106.428 127.216 97.4541C127.216 96.6904 126.84 95.7392 126.088 95.7363C124.168 95.7363 122.253 95.719 120.333 95.745C119.736 95.7537 119.527 95.5758 119.536 94.9423C119.571 91.9612 119.566 89.5436 119.536 86.5625C119.536 85.9724 119.671 85.725 120.311 85.725C128.431 85.7424 137.143 85.7381 145.263 85.725C145.855 85.725 146.029 85.9377 146.025 86.5061C146.003 89.5132 146.003 91.9807 146.025 94.9878C146.025 95.5606 145.851 95.7732 145.263 95.7645C143.4 95.7385 141.532 95.7559 139.668 95.7559C138.85 95.7559 138.44 96.699 138.44 97.4975C138.44 111.808 138.44 126.115 138.44 140.426C138.44 144.088 138.423 147.75 138.454 151.413C138.458 152.164 138.227 152.407 137.465 152.398C134.574 152.359 131.087 152.35 128.2 152.402C127.364 152.415 127.203 152.12 127.207 151.365C127.229 142.365 127.22 133.366 127.22 124.371H127.216Z"
                    fill="#55347B"
                  />
                  <path
                    d="M80.8595 56.8066C80.8595 52.1767 80.8769 47.551 80.842 42.921C80.8377 42.1443 81.038 41.8839 81.8521 41.8839C89.0492 41.9143 96.5118 41.9099 103.709 41.8839C104.479 41.8839 104.688 42.1182 104.68 42.8646C104.641 45.7415 104.662 48.6184 104.662 51.4954C104.662 52.1607 104.313 52.4949 103.613 52.4978C99.9862 52.4978 96.7568 52.5195 93.13 52.4804C92.3114 52.4717 92.1068 52.7451 92.1112 53.5175C92.1416 57.9913 92.1024 62.4607 92.146 66.9345C92.1547 67.9412 92.2984 68.9653 92.5378 69.9416C92.8339 71.1566 93.7787 71.8552 94.976 71.968C96.8526 72.146 98.0835 72.172 99.9688 72.2284C101.201 72.2631 102.703 72.2544 103.94 72.2284C104.466 72.2154 104.68 72.3629 104.675 72.9314C104.649 75.9905 104.654 79.3291 104.675 82.3883C104.675 82.9263 104.506 83.1303 103.948 83.1216C100.143 83.0435 96.0546 83.178 92.2667 82.8786C86.5239 82.4186 82.2222 78.785 81.1991 72.5538C80.9727 71.1696 80.8899 69.7507 80.8725 68.3448C80.829 64.5002 80.8595 60.6556 80.8595 56.811V56.8066Z"
                    fill="#55347B"
                  />
                  <path
                    d="M71.1127 54.7238C69.9851 54.6587 68.8922 54.5285 67.8517 54.0772C66.38 53.4394 65.4657 52.3242 65.0303 50.8098C64.547 49.1218 64.547 47.4251 65.0303 45.7328C65.531 43.9841 66.6413 42.7951 68.3872 42.2571C70.1853 41.7016 72.0053 41.6973 73.8078 42.2397C75.6365 42.7908 76.7859 44.0232 77.2561 45.8587C77.7568 47.82 77.7307 49.7683 76.8991 51.6472C76.2286 53.1703 74.9877 54.0338 73.4029 54.4027C72.654 54.5762 71.879 54.6196 71.1171 54.7238H71.1127Z"
                    fill="#55347B"
                  />
                  <path
                    d="M87.1654 111.301C86.0377 111.236 84.9449 111.105 83.9043 110.654C82.4327 110.016 81.5184 108.901 81.083 107.387C80.5997 105.699 80.5997 104.002 81.083 102.31C81.5837 100.561 82.6939 99.372 84.4398 98.8339C86.238 98.2785 88.0579 98.2742 89.8605 98.8166C91.6891 99.3677 92.8385 100.6 93.3087 102.436C93.8094 104.397 93.7833 106.345 92.9517 108.224C92.2812 109.747 91.0404 110.611 89.4555 110.98C88.7067 111.153 87.9317 111.197 87.1697 111.301H87.1654Z"
                    fill="#55347B"
                  />
                </svg>
              </a>

              <form className="hidden lg:block lg:w-[400px] mx-auto lg:ml-[5px]">
                <label
                  for="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    onChange={handleSearchChange}
                    value={search}
                    id="default-search"
                    className="block w-full p-4 ps-10  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#0B0B1C] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Events"
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-[#CA67F5] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#CA67F5] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
              <div className="w-1/2 relative md:left-[150px] laptop:left-[90px] desktop:left-[230px]">
                <h2 className="text-black dark:text-white text-3xl text-center">
                  {userdata.companyName}
                </h2>
              </div>
            <div className="flex items-center ">
              <div className="flex items-center ms-3">

                <div ref={dropdownRef}>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 "
                    aria-expanded="false"
                    onClick={toggleDropdownUser}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img id="MyProfile"
                      className="w-10 h-10 rounded-full  tablet:w-20 tablet:h-20 laptop:w-16 laptop:h-16 desktop:w-20 desktop:h-20  "
                      src={userdata.profilePic}
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className={`z-50 ${
                    showDropdownUser ? "block" : "hidden"
                  } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-[#0B0B1C] dark:divide-gray-600 absolute right-6 top-24 p-3`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {userdata.firstname} {userdata.lastname}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {userdata.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                   
                    <li>
                      <Link
                        to={"/Profile"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Profile
                      </Link>
                    </li>
                  
                    <li className=" dark:text-white text-gray-700 flex gap-3 text-sm items-center px-4">
                      Theme:
                      {
                        isDarkMode ? ( <button className="block w-full text-center text-gray-700 py-2  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={toggleDarkMode}
                        role="menuitem">
                          <FaSun className="text-gray-700 text-lg w-full dark:text-white"/>
                        </button>) :  (<button className="block w-full text-center text-gray-700 py-2  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={toggleDarkMode}
                        role="menuitem">
                          <FaMoon className="text-gray-700 text-lg w-full dark:text-white"/>
                      </button>)
                      }
                    </li>
                    <li>
                      <Link
                        to={"/"}
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav> 
      /*sidebar*/
      <aside
        id="logo-sidebar"
        className="fixed  top-0 left-0 z-40 w-64 laptop:w-52 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-[#55347B] md:translate-x-0 dark:bg-[#0B0B1C] dark:border-[#0B0B1C]"
        aria-label="Sidebar"
      >
        <div className="mt-[90px] bottom-64 px-3 pb-4 overflow-y-auto bg-white dark:bg-[#0B0B1C]">
          <ul className="space-y-2 font-medium">
            <li className="flex flex-col mb-5">
              <button
                type="button"
                className="flex items-center w-full p>-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span id="MyEvents" className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Events
                </span>
              </button>
              <div>
                <button
                  onClick={toggleMenu2}
                  className="relative left-28 top-[-23px]"
                >
                  <svg
                    className="w-3 h-3 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className="hidden py-2 space-y-2 relative "
                  class={`${isMenuOpen ? "block" : "hidden"}`}
                >
                  <li>
                    <Link
                      to={"/NewEvent"}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      New Event
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Events"}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      All Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/OldEvents"}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Old Events
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex flex-col ">
              <button
                type="button"
                className="flex items-center w-full p>-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span id="MyReports" className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Reports
                </span>
              </button>
              <div>
                <button
                  onClick={toggleMenu3}
                  className=" relative left-28 bottom-[20px]"
                >
                  <svg
                    className="w-3 h-3 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className="hidden py-2 space-y-2 relative "
                  class={`${isOpen ? "block" : "hidden"}`}
                >
                  <li>
                    <Link
                      to={"/Report"}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Balance
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Transactions"}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Transactions
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link
                to={"/Inbox"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white relative right-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span id="MyNotifications" className="flex-1 ms-3 whitespace-nowrap">Notifications</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Layout;
