import React from "react";
import Navb from "../Components/navbar";
import { SignoutNav } from "../UserView/singoutnav";
import { useLocation } from "react-router-dom";
export function Payements (){
    return(
        <>
<Navb component={<SignoutNav />} state = {"headOffice"} />

        Props
        </>
    )
}