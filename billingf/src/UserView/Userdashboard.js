import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignOut from '../auth/authIndex';
import Navb from "../Components/navbar";
import './css/userboard.css'
import { GetRole } from "../auth/authIndex";
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
            <div>
                HEY
            </div>
            <Navb component={<SignoutNav />}/>
            <div className="bcak" style={{border:"2px solid red"}}>Dashborard</div>
            

            

            {/* Set up compoenwts for all roles separately and bring about functionalities */}

        </div>
    )
};

export default UserDashboard;