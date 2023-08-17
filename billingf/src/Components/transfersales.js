import React, { useEffect, useState } from "react";
import FooterC from "./footer";
import Navb from "./navbar";
import { isAuthenticated } from "../auth/authIndex";
import { SignoutNav } from "../UserView/singoutnav";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Select from 'react-select';
import { API } from "../backend";

export default function TransferSales(){
    const [dist,setdist] = useState();
    const [sales,setsales] = useState();

    const [values,setvalues] = useState({
        sales:"",
        dist:""
    });

    const handleChange = (selectedOption) => {
        setvalues({...values,sales:selectedOption.value,dist:selectedOption.dist_id});
        console.log(`Option selected:`, selectedOption.value);
        DistData();
      };
    
    // register/distdropdown/<int:id>/<int:role>
    const SalesData = async () => {
        await fetch(
          `${API}user/register/salesdropdown/${
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
      useEffect(() => {
        SalesData();
      }, []);
    return(
        <>
        <div className="name__top">Welcome to Owner {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />}/>
            <div className="DashContainer">
        <div className="DashboardBarM">
          <h3>Transfer Sales</h3>
          <div className="MasterButton">  <div className="ButtonTextWrapper">
         <div className="LOS"></div>
         <div className="ButtonContainerm">
            {/* Data can come here a button maybe */}
         </div>{" "}
       </div></div>
        </div>
      </div>
      {/* Two drop downs each having list of sales */}
      <Container fluid>
      <Row>
        <Col>
        {sales && <>
        {JSON.stringify(values)}
        </>}
        <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable={true}
        isSearchable={true}
        name="Sales"
        options={sales}
        onChange={handleChange}
      />
        </Col>
        {dist && <>Current Distributor: {JSON.stringify(dist.label)}</>}
        
      </Row>
    </Container>
            <FooterC/>
        </>
    )
}