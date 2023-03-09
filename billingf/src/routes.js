import React from "react";
import {BrowserRouter, Switch,Route, Routes} from 'react-router-dom';
import PrivateRoutes from "./auth/privateRoute";
import App from "./App";
import Register from "./UserView/registerUser";
import UserDashboard from "./UserView/Userdashboard";
import LOGIN from "./UserView/login";

const RoutesD = () =>{
  return(

    <BrowserRouter>
    <Routes>
    <Route path="/" exact element={<App />}></Route>
    <Route path="/signin" exact element={<LOGIN />} />

    <Route path="/register" exact element={<Register />} />
    <Route path="/user/dashboard/*" element={<PrivateRoutes component={UserDashboard}/>}/>
    {/* <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}/> */}
    {/* <Route path="/signup" exact element={<App />}></Route> */}
    </Routes>
    </BrowserRouter>
  )
}

export default RoutesD;