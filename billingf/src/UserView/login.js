import Form from 'react-bootstrap/Form';
import React from 'react';
import Container from 'react-bootstrap/Container';
import {Navbar} from 'react-bootstrap';

const LOGIN = ()=>{
    console.log('LOGIN ENabled');
    return(
        <div>
           <Navbar>
          <Navbar.Brand href="#home">
            <img
              alt="nothong"
              src={require('../imgs/email-logo.png')}
              width="200"
              height="50"
              className="d-inline-block align-top"
            />
            </Navbar.Brand>
      </Navbar>
            
        </div>
    )
}

export default LOGIN;