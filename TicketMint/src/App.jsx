import React from "react";
import {  Route, Routes } from "react-router-dom";

import UserLayout from "./layouts/UserLayout.jsx";
import Report from "./pages/Report.jsx";
import Events from "./pages/Events.jsx";
import ToDo from "./pages/ToDo.jsx";
import NewEvent from "./pages/NewEvent.jsx";
import InBox from "./pages/Inbox.jsx";
// import Chat from "./pages/Chat.jsx";

function App() {
  return (
    <>
      <UserLayout>
        <Routes>
          <Route path="/Report" element={<Report />} />
          {/* <Route path="/Chat" element={<Chat />} /> */}
          <Route path="/Events" element={<Events/>} />
          <Route path="/ToDo" element={<ToDo />} />
          <Route path="/NewEvent" element={<NewEvent />} />
          <Route path="/Inbox" element={<InBox />} />
        </Routes>
       
      </UserLayout>
    </>
  );
}

export default App;
