import React, { useState,useRef,useEffect} from "react";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth/authIndex";
import Navb from "./navbar";
import { SignoutNav } from "../UserView/singoutnav";
import FooterC from "./footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CHILD from "./MultiSelect"
import { API } from "../backend";

export default function AddMessage(){
  const [dist,setdist] = useState();
  const [sales,setsales] = useState();
  const [distlist, setdistlist] = useState([]);
  const [saleslist, setsaleslist] = useState([]);

  const distref = useRef();
  const salesref = useRef();

  const GetChildstate = (name) => (event) => {
    event.preventDefault();
    if (name==="dist"){
      const childstate = distref.current.getchildstate();
      setmsg({...msg,dist:[...childstate]})


    }
    else if (name==="sales"){
      const childstate = salesref.current.getchildstate();
      setmsg({...msg,sales:[...childstate]})

    }
  }

  const SalesData = async () => {
    await fetch(
      `${API}user/register/salesHOdropdown/${
        isAuthenticated().user.id
      }/${4}`,
      {
        method: "GET",
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setsales(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
const DistData = async () => {
    await fetch(
      `${API}user/register/distdropdown/${
        isAuthenticated().user.id
      }/${3}`,
      {
        method: "GET",
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setdist(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{
    SalesData();
    DistData();
     },[])
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
        <Form style={{margin:"7vw"}}>
        <Container fluid>
          <Row>
            <Col xs={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label><div style={{fontWeight:"600",display:"inline",fontSize:"18px"}}>Message Body</div> ({500 - msg.msg.length})</Form.Label>
        <Form.Control as="textarea" rows={3} isInvalid={msg.msg.length>499} onChange={handleChange("msg")} />
      </Form.Group>
            </Col>
            <Col>
            <Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label><div style={{fontWeight:"600",display:"inline",fontSize:"18px"}}>Message Identifier</div> ({100 - msg.UIden.length})</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Message Subject"  isInvalid={msg.UIden.length>99} onChange={handleChange("UIden")}/>
      </Form.Group>
            </Row>
            <Row style={{margin:"0 0vw 0 0vw"}}>
              <Button type="alert" size="md">
                Insert Standard Message
              </Button>
            </Row>
                        
            </Col>
          </Row>

          <Row>
          <Form.Label><div style={{fontWeight:"600",display:"inline",fontSize:"18px"}}>Send To <i class="bi bi-arrow-right-circle"></i></div></Form.Label>
          </Row>
          {dist && <Row>
          <CHILD ref={distref} options={dist} value={distlist} onChange={setdistlist} type={"Distributor"}/>
          <Button onClick={GetChildstate("dist")}>Fix Recipients </Button>

          </Row>}
          {sales && <Row>
          <CHILD ref={salesref} options={sales} value={saleslist} onChange={setsaleslist} type={"Sales"}/>
          <Button onClick={GetChildstate("sales")}>Fix Recipients </Button>
          </Row>}

        </Container>
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