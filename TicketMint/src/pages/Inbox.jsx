import React, { useState } from "react";
import { Link } from "react-router-dom";

const Inbox = () => {
  const [activeConversations, setActiveConversations] = useState([
    { id: 1, name: "Henry Boyd", messages: [] },
    { id: 2, name: "Marta Curtis", messages: [] },
  
  ]);
  const [archivedConversations, setArchivedConversations] = useState([
    { id: 3, name: "Philip Tucker", messages: [] },
    { id: 4, name: "Christine Reid", messages: [] },
 
  ]);


  const [currentMessage, setCurrentMessage] = useState("");
  
  const [currentConversation, setCurrentConversation] = useState(null);


  const sendMessage = () => {
    if (!currentConversation || !currentMessage.trim()) return;

    const conversationIndex = activeConversations.findIndex(
      (conversation) => conversation.id === currentConversation.id
    );

    if (conversationIndex !== -1) {
      setActiveConversations((prevConversations) => {
        const updatedConversations = [...prevConversations];
        updatedConversations[conversationIndex].messages.push(currentMessage);
        return updatedConversations;
      });
      
      setCurrentMessage("");
    }
  };


  const switchConversation = (conversation) => {
    console.log("Switching to   ", conversation);
    setCurrentConversation(conversation);
  };

  return (
    <div className="lg:w-[65%] relative lg:left-[15%] md:left-[25%] md:w-1/2 w-[80%] h-[80%] top-32 right-8 py-6 px-6 rounded-xl border border-gray-200 bg-white mt-10 flex flex-wrap gap-10">
      <div class="flex flex-row h-full w-full overflow-x-hidden">
        <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div class="flex flex-row items-center justify-center h-12 w-full">
            <div class="flex items-center justify-center rounded-2xl text-indigo-700 bg-pink h-10 w-10">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div class="ml-2 font-bold text-2xl">QuickChat</div>
          </div>
          <div class="flex flex-col items-center bg-pink border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div class="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                alt="Avatar"
                class="h-full w-full"
              />
            </div>
            <div class="text-sm font-semibold mt-2 text-white">Aminos Co.</div>
            <div class="text-xs text-white">Lead UI/UX Designer</div>
            <div class="flex flex-row items-center mt-3">
              <div class="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                <div class="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
              </div>
              <div class="leading-none ml-1 text-xs">Active</div>
            </div>
          </div>

          <div class="flex flex-col mt-8">
            <div>
              <Link to="/events" className="flex flex-wrap mb-3.5">
                <svg
                className="mr-2.5 "
                  fill="#CA67F5"
                  width="30px"
                  height="30px"
                  viewBox="0 0 64.00 64.00"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="SVGRepo_bgCarrier"
                    stroke-width="0"
                    transform="translate(0,0), scale(1)"
                  ></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="5.632"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title></title>
                    <path d="M37,45.48H4a2,2,0,0,1-2-2V12.53A2,2,0,0,1,5.35,11L26.54,29.47,47.71,11A2,2,0,0,1,51,12.53V28.09a2,2,0,0,1-.65,1.47,2,2,0,0,1-1.51.52,9.8,9.8,0,0,0-10,12.78A2,2,0,0,1,37,45.48ZM6,41.48H34.48a14.88,14.88,0,0,1-.09-1.64A13.79,13.79,0,0,1,47,26.1V16.93L27.85,33.64a2,2,0,0,1-2.63,0L6,16.92Z"></path>
                    <path d="M26.53,34.13a2,2,0,0,1-1.31-.5L2.73,14a2,2,0,0,1-.56-2.2A2,2,0,0,1,4,10.52l22.49-.15L49,10.52a2,2,0,0,1,1.86,1.31,2,2,0,0,1-.56,2.2L27.85,33.64A2.06,2.06,0,0,1,26.53,34.13ZM9.34,14.49l17.2,15,17.19-15-17.21-.12Z"></path>
                    <path d="M4,45.48a1.94,1.94,0,0,1-.87-.2A2,2,0,0,1,2,43.48v-31A2,2,0,0,1,5.35,11L23.92,27.19a2,2,0,0,1,.68,1.55,1.94,1.94,0,0,1-.75,1.52L5.29,45A2,2,0,0,1,4,45.48ZM6,16.92V39.33l13.44-10.7Z"></path>
                    <path d="M37.71,36.42A2,2,0,0,1,36.46,36l-7.19-5.76a2,2,0,0,1-.75-1.51,2,2,0,0,1,.69-1.55L47.71,11A2,2,0,0,1,51,12.53V28.09a2,2,0,0,1-.65,1.47,2,2,0,0,1-1.51.52,9.73,9.73,0,0,0-9.38,5.26,2.06,2.06,0,0,1-1.78,1.08ZM33.64,28.6l3.58,2.86A13.75,13.75,0,0,1,47,26.1V16.93Z"></path>
                    <path d="M4,45.48a1.94,1.94,0,0,1-.87-.2A2,2,0,0,1,2,43.48v-31A2,2,0,0,1,5.35,11L23.92,27.19a2,2,0,0,1,.68,1.55,1.94,1.94,0,0,1-.75,1.52L5.29,45A2,2,0,0,1,4,45.48ZM6,16.92V39.33l13.44-10.7Z"></path>
                    <path d="M37.71,36.42A2,2,0,0,1,36.46,36l-7.19-5.76a2,2,0,0,1-.75-1.51,2,2,0,0,1,.69-1.55L47.71,11A2,2,0,0,1,51,12.53V28.09a2,2,0,0,1-.65,1.47,2,2,0,0,1-1.51.52,9.73,9.73,0,0,0-9.38,5.26,2.06,2.06,0,0,1-1.78,1.08ZM33.64,28.6l3.58,2.86A13.75,13.75,0,0,1,47,26.1V16.93Z"></path>
                    <path d="M48.17,47.92a2,2,0,0,1-2-2V33.76a2,2,0,0,1,4,0V45.92A2,2,0,0,1,48.17,47.92Z"></path>
                    <path d="M54.25,41.84H42.09a2,2,0,0,1,0-4H54.25a2,2,0,0,1,0,4Z"></path>
                    <path d="M48.18,53.63A13.75,13.75,0,0,1,35.06,44.1a13.47,13.47,0,0,1-.67-4.26A13.79,13.79,0,1,1,48.18,53.63Zm0-23.57a9.71,9.71,0,1,0,.7,0C48.64,30.06,48.41,30.06,48.18,30.06Z"></path>
                  </g>
                </svg>

                <button className="text-sm font-bold">New Message</button>
              </Link>
            </div>
            <div class="flex flex-row items-center justify-between text-sm">
              <span class="font-bold">Active Conversations</span>
              <span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {activeConversations.length}{" "}
              </span>
            </div>
            <div class="flex flex-col space-y-1 mt-4 -mx-2  overflow-y-auto">
              {activeConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => switchConversation(conversation)}
                  class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                >
                  <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    {conversation.name[0]}
                  </div>
                  <div class="ml-2 text-sm font-semibold">
                    {conversation.name}
                  </div>
                </button>
              ))}
            </div>

            <div class="flex flex-row items-center justify-between text-xs mt-6">
              <span class="font-bold">Archivied</span>
              <span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {" "}
                {archivedConversations.length}
              </span>
            </div>
            <div class="flex flex-col space-y-1 mt-4 -mx-2">
              {archivedConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => switchConversation(conversation)}
                  class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                >
                  <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    {conversation.name[0]}
                  </div>
                  <div class="ml-2 text-sm font-semibold">
                    {conversation.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-auto h-full p-6">
          <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div class="flex flex-col flex-auto h-full p-6">
              <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div class="flex flex-col h-full overflow-x-auto mb-4">
                  <div class="flex flex-col h-full">
                    {currentConversation && (
                      <>
                        {currentConversation.messages.map((message, index) => (
                          <div
                            key={index}
                            class={`${
                              index % 2 === 0 ? "col-start-1" : "col-start-6"
                            } col-end-13 p-3 rounded-lg`}
                          >
                            <div
                              class={`flex ${
                                index % 2 === 0
                                  ? "flex-row-reverse"
                                  : "flex-row-reverse"
                              } items-center`}
                            >
                              <div
                                class={`flex items-center justify-center h-10 w-10 rounded-full bg-pink flex-shrink-0`}
                              >
                                {currentConversation.name[0]}
                              </div>
                              <div
                                class={`relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl`}
                              >
                                <div>{message}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div>
                    <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div class="flex-grow ml-4">
                    <div class="relative w-full">
                      <input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        type="text"
                        class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                      <button
                        onClick={sendMessage}
                        class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button
                      onClick={sendMessage}
                      class="flex items-center justify-center bg-pink hover:bg-morado1 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span>Send</span>
                      <span class="ml-2">
                        <svg
                          class="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
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

export default Inbox;
