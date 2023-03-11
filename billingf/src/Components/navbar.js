import React from "react";
import './css/navbar.css'
import { Navbar } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Navb = (props)=>{
    return (
        <Navbar className="navbar_login">
        <Navbar.Brand href="#home">
          <img
            alt="nothong"
            src={require("../assets/images/email-logo.png")}
            width="200"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
       {props.component}
      </Navbar>
    )
}

export default Navb;