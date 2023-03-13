import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignOut, { isAuthenticated } from '../auth/authIndex';
import Navb from "../Components/navbar";
import './css/userboard.css'
import { GetRole } from "../auth/authIndex";
import Distributor from "../Components/distributor";
import FooterC from "../Components/footer"
const UserDashboard = (props)=>{
    var [Role,setRole] = useState(GetRole(JSON.parse(localStorage.getItem("Data")).user.role_id))
    const {owner,distributor,sales,headOffice,Branch,Cust} = Role
    const navi = useNavigate();
const SignoutNav = ()=>{
    return(
        <div className="Signnout"><button onClick={(event)=>{
            event.preventDefault();
             SignOut(()=>{
                navi('/signin')
             });
        }}><i className="bi bi-lock"></i> Sign out</button></div>
    )
}
    return(
        
        distributor &&<div>
            <div className="name__top">Welcome to Distributor {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />}/>
            <Distributor/>
            <FooterC />            {/* Set up compoenwts for all roles separately and bring about functionalities */}

        </div>
        ||
        sales &&<div>
            <div className="name__top">Welcome to Sales {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />}/>
            {/* Set up compoenwts for all roles separately and bring about functionalities */}

        </div>
        ||
        headOffice &&<div>
            <div className="name__top">Welcome to Head Office {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />}/>
            {/* Set up compoenwts for all roles separately and bring about functionalities */}

        </div>
        ||
        Branch &&<div>
            <div className="name__top">Welcome to Branch {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />}/>
            {/* Set up compoenwts for all roles separately and bring about functionalities */}

        </div>
    )
};

export default UserDashboard;