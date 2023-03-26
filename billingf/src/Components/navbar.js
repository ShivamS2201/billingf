import React from "react";
import './css/navbar.css'
import { Navbar } from "react-bootstrap";
import {Link} from "react-router-dom";

const Navb = (props)=>{
    return (
        <Navbar className="navbar_login">
        <Navbar.Brand href="#home">
          <Link to="/user/dashboard">
          <img
            alt="nothong"
            src={require("../assets/images/email-logo.png")}
            width="200"
            height="50"
            className="d-inline-block align-top"
          /></Link>
        </Navbar.Brand>
       {props.component}
      </Navbar>
    )
}

export default Navb;