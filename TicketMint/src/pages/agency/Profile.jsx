import React, {useState} from "react";
import { useSelector } from "react-redux";
import { IoCameraReverse } from "react-icons/io5";
import { uploadFile } from '../../utils/Firebase';
import { changeData, changeAvatar, ClientProvider } from '../../utils/Db';

const Profile = () => {
  const reloadData = ClientProvider();
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.token.token);
  const [agencyName, setAgencyName] = useState(user.agencyName || "");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");


  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await changeData({ agencyName, password, phoneNumber, address} , token);
    if (response.success) {
      reloadData();
    }
  }

  const handleImageUpload = async (e) => {
    e.preventDefault
    const file = e.target.files[0];
    try{
      const newId = client.id + "_" +client.firstName
      const url = await uploadFile(file,newId)
      const res = await changeAvatar(url, token);
      if (res.success === true) {
        // Swal.fire('Profile picture updated', '', 'success');
        navigate('/profile')
      }

  }catch{
    // Swal.fire('Error uploading profile picture', '', 'error');
    navigate('/profile')
    }
  };

  return (
    <div className="laptop:w-[65%] relative laptop:left-[15%] tablet:left-[25%] tablet:w-1/2 w-[80%] h-[80%] top-32 right-8 py-6 px-6 rounded-xl border border-gray-200 bg-white mt-10 flex flex-wrap gap-10">
      <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  src={user.profilePic}
                  className="shadow-xl group-hover:opacity-0 rounded-full object-center object-cover align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
                <label form="changepic" className="cursor-pointer hover:opacity-100 opacity-0 absolute flex justify-center items-center w-[150px] h-[150px] top-[-61px] right-[-86px] bg-[#80808073] text-5xl" >
                  <div>
                  <IoCameraReverse />
                  </div>
                  <input type="file" id="changepic" class="hidden" onChange={handleImageUpload}/>
                </label>
              </div>
            </div>
            <div class="w-full text-center mt-20">
            </div>
          </div>
          <div class="text-center mt-2">
            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {user.firstname} {user.lastname}
            </h3>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              Paris, France
            </div>
          </div>
          <div class="mt-6 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                <div class="bg-white overflow-hidden shadow rounded-lg border">
                  <form onSubmit={handleSubmit} class="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Agency Name
                        </dt>
                        {user.companyName == null ? <input type="text" placeholder="Agency Name" className=" text-center  py-2.5 px-0 w-[50%] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700" value={agencyName} onChange={(e) => handleInputChange(e, setAgencyName)}/> : <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.companyName}</dd>}
                        
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user.email}
                        </dd>
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Password
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 justify-center">
                          <input
                            type="password"
                            placeholder="**********"
                            className=" text-center  py-2.5 px-0 w-[50%] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700"
                            value={password} 
                            onChange={(e) => handleInputChange(e, setPassword)}
                          />
                        </dd>
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Phone number
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                          <div class="relative">
                            <div class="absolute inset-y-0 start-16 laptop:start-[130px] top-0 flex items-center ps-3.5 pointer-events-none">
                              <svg
                                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 19 18"
                              >
                                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="phone-input"
                              aria-describedby="helper-text-explanation"
                              class=" text-center text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 justify-center w-[50%] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              placeholder={user.phone==null ? "Phone Number" : user.phone}
                               value={phoneNumber} onChange={(e) => handleInputChange(e, setPhoneNumber)}
                              
                            />
                          </div>
                        </dd>
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input type="text" placeholder={user.address == null ? "Company Address" : user.address} className=" text-center  py-2.5 px-0 w-[50%] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700" value={address} onChange={(e) => handleInputChange(e, setAddress)}/>
                        </dd>
                      </div>
                    </dl>
                    <div>
                      <button type="submit" class="w-1/2 mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Save 
                      </button>
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

export default Profile;