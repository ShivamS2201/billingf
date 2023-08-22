import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth/authIndex";
import Navb from "./navbar";
import { SignoutNav } from "../UserView/singoutnav";
import FooterC from "./footer";
import { Form } from "react-bootstrap";

export default function AddMessage(){
    const currentRoute = useLocation();

    const [msg,setmsg] = useState({msg:"",UIden:""});

    const handleChange = (name) => (event) =>{
        setmsg({...msg,[name] : event.target.value})
    }


    return (
        <>
        <div className="name__top">
        Welcome to Owner {isAuthenticated().user.first_name}
      </div>
      <Navb component={<SignoutNav />} />
        {currentRoute.pathname.toLowerCase().includes("sms") && <>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea ({500 - msg.msg.length})</Form.Label>
        <Form.Control as="textarea" rows={3} isInvalid={msg.msg.length>499} onChange={handleChange("msg")} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea ({100 - msg.UIden.length})</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Message Subject"  isInvalid={msg.UIden.length>99} onChange={handleChange("UIden")}/>
      </Form.Group>
      <Form.Label>Distributor</Form.Label>

        </Form>

        
      {JSON.stringify(msg)}
        
        </>}
        {currentRoute.pathname.toLowerCase().includes("whatsapp") && <>
        WA HERE
        </>}
        {currentRoute.pathname.toLowerCase().includes("email") && <>
        Em HERE
        </>}
        {currentRoute.pathname.toLowerCase().includes("mos") && <>
        MOS HERE
        </>}

        <FooterC/>
        </>
    )
}