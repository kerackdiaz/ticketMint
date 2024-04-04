import React, {useState} from "react";
import { useSelector } from "react-redux";
import { IoCameraReverse } from "react-icons/io5";
import { uploadFile } from '../../utils/Firebase';
import { changeData, changeAvatar, ClientProvider } from '../../utils/Db';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.token.token);
  const [agencyName, setAgencyName] = useState(user.companyName || "");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const navigate = useNavigate();

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await changeData({ agencyName, password, phoneNumber, address} , token);
    if (response.success) {
      navigate('/profile')
    }
  }

  const handleImageUpload = async (e) => {
    e.preventDefault
    const file = e.target.files[0];
    console.log(file)
   
      const newId = "/agency/" + user.companyName+"/" +user.id + "_" +user.firstName
      const url = await uploadFile(file,newId)
      console.log(url)
      const res = await changeAvatar(url, token);
      console.log(res)
      if (res.success === true) {
        console.log(res.success);
        // Swal.fire('Profile picture updated', '', 'success');
        navigate('/profile')
      }
  };

  return (
    <div className="laptop:w-[78%] relative laptop:left-[14%] tablet:left-[25%] tablet:w-1/2 w-[80%] h-[80%] md:w-[490px] top-32 right-8 py-6 px-6 rounded-3xl border border-gray-200 bg-[#DBC1FA] mt-10 flex flex-wrap gap-10 dark:bg-[#0B0B1C]">
      <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-3xl dark:bg-[#0B0B1C] dark:border-2">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  src={user.profilePic}
                  className="shadow-xl group-hover:opacity-0 rounded-full object-center object-cover align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
                <label form="changepic" className="cursor-pointer hover:opacity-100 opacity-0 absolute flex justify-center items-center w-[150px] h-[150px] top-[-61px] right-[-86px] bg-[#80808073] text-5xl rounded-full" >
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
            <h3 class="text-2xl text-slate-700 dark:text-white font-bold leading-normal mb-1">
              {user.firstname} {user.lastname}
            </h3>
          </div>
          <div class="my-2 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                <div class="bg-white overflow-hidden shadow rounded-lg border dark:bg-[#0B0B1C] dark:border-2 mt-12">
                  <form onSubmit={handleSubmit} class="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500 dark:text-white">
                          Agency Name
                        </dt>
                        {user.companyName == null ? <input type="text" placeholder="Agency Name" className=" text-center  py-2.5 px-0 w-[50%] text-sm text-gray-500  dark:text-white  bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:border-gray-700" value={agencyName} onChange={(e) => handleInputChange(e, setAgencyName)}/> : <dd class="mt-1 text-sm text-gray-900  dark:text-white sm:mt-0 sm:col-span-2">{user.companyName}</dd>}
                        
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500  dark:text-white">
                          Email address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900  dark:text-white sm:mt-0 sm:col-span-2">
                          {user.email}
                        </dd>
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500  dark:text-white">
                          Password
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900  dark:text-white sm:mt-0 sm:col-span-2 justify-center">
                          <input
                            type="password"
                            placeholder="**********"
                            className=" text-center  py-2.5 px-0 w-[50%] text-sm text-gray-500  dark:text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:border-gray-700"
                            value={password} 
                            onChange={(e) => handleInputChange(e, setPassword)}
                          />
                        </dd>
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500  dark:text-white">
                          Phone number
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                          <div class="relative">
                            <div class="absolute inset-y-0 start-16 laptop:start-[130px] top-0 flex items-center ps-3.5 pointer-events-none">
                            </div>
                            <input
                              type="text"
                              id="phone-input"
                              aria-describedby="helper-text-explanation"
                              class=" text-center text-gray-500  bg-transparent border-0 border-b-2 border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 justify-center w-[50%] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              placeholder={user.phone==null ? "Phone Number" : user.phone}
                               value={phoneNumber} onChange={(e) => handleInputChange(e, setPhoneNumber)}
                              
                            />
                          </div>
                        </dd>
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500  dark:text-white">
                          Address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input type="text" placeholder={user.address == null ? "Company Address" : user.address} className=" text-center  py-2.5 px-0 w-[50%] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  dark:text-white dark:border-gray-700" value={address} onChange={(e) => handleInputChange(e, setAddress)}/>
                        </dd>
                      </div>
                    </dl>
                    <div>
                      <button type="submit" class="w-1/2 my-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CA67F5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
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