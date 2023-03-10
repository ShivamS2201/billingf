import React from "react";
import { useNavigate } from "react-router-dom";
import SignOut from '../auth/authIndex';
import Navb from "../Components/navbar";
import './css/userboard.css'

const UserDashboard = (props)=>{
    console.log("userboard enetered");
    const navi = useNavigate();
const SignoutNav = ()=>{
    return(
        <div className="Signnout"><button onClick={(event)=>{
            event.preventDefault();
             SignOut(()=>{
                navi('/signin')
             });
        }}><i class="bi bi-lock"></i> Sign out</button></div>
    )
}
    return(
        <div>
            <Navb component={<SignoutNav />}/>
            <div className="bcak" style={{border:"2px solid red"}}>Dashborard</div>
            

            

        </div>
    )
};

export default UserDashboard;