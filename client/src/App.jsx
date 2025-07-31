import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfigContextProvider, { configContext } from "./Context/ConfigContext";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import OwnerDashboard from "./Components/Ownerdashboard";
import Roomseekers from "./Components/Roomseekers";
import OwnerProfile from "./Pages/OwnerProfile";
import Owner from "./Pages/Owner";
import RoomDetails from "./Pages/RoomDetails";
import UpdateRoom from "./Pages/UpdateRoom";
import Renter from "./Pages/Renter";
import UserProfile from "./Pages/UserProfile";
import RoomDetailsinUserSide from "./Pages/RoomDetailsinUserSide";


const App = () => {
  return (

       <ConfigContextProvider>
       <Router>
      <div className="bg-blue-50"  >
          <Routes>
          <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/OwnerDashboard" element={<OwnerDashboard />} />
            <Route path="/RoomSeekers" element={<Roomseekers/>} />
            <Route path="/Profile" element={<OwnerProfile />} />
            <Route path="/RoomCreate" element={<Owner />} />
            <Route path="/room/:roomId" element={<RoomDetails/>}/>   
            <Route path="/updateroom/:roomId" element={<UpdateRoom />} />
            <Route path="/renter" element={<Renter />} />
            <Route path="/UserProfile" element={<UserProfile />} />
             <Route path="/roomInUserSide/:roomId" element={<RoomDetailsinUserSide />}/>

            
         </Routes>
      </div>
    </Router>
      </ConfigContextProvider>
  );
};

export default App;
