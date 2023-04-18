import React from "react";
import {BrowserRouter, Switch,Route, Routes} from 'react-router-dom';
import PrivateRoutes from "./auth/privateRoute";
import App from "./App";
import Register from "./UserView/registerUser";
import UserDashboard from "./UserView/Userdashboard";
import LOGIN from "./UserView/login";
import Notfound from "./Components/notfound";
import { SalesForm } from "./Components/addComponents/addsales";
import {HooficeForm} from "./Components/addComponents/addHoffice"
import { BranchForm } from "./Components/addComponents/addBranch";
import { DistributorForm } from "./Components/addComponents/addDistributor";
import { UpdateMadeUser } from "./Components/updateusermade";
const RoutesD = () =>{
  return(

    <BrowserRouter>
    <Routes>
    <Route path="/" exact element={<LOGIN />}></Route>
    <Route path="/signin" exact element={<LOGIN />} />
    <Route path="/register" exact element={<Register />} />

    <Route path="/user/dashboard/*" element={<PrivateRoutes component={UserDashboard}/>}/>
    <Route path="/user/dashboard/register/addDistributor/*" exact element={<PrivateRoutes component={DistributorForm}/>} />
    <Route path="/user/dashboard/register/addsales/*" exact element={<PrivateRoutes component={SalesForm}/>} />
    <Route path="/user/dashboard/register/addHoffice/*" exact element={<PrivateRoutes component={HooficeForm}/>} />
    <Route path="/user/dashboard/register/addBranch/*" exact element={<PrivateRoutes component={BranchForm}/>} />
    <Route path="/user/dashboard/edit/user/:id" exact element={<PrivateRoutes component={UpdateMadeUser}/>} />


    {/* <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}/> */}
    {/* <Route path="/signup" exact element={<App />}></Route> */}
    </Routes>
    </BrowserRouter>
  )
}

export default RoutesD;