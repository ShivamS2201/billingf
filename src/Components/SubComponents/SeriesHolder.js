import React, { useEffect, useState } from "react";
import { Link, json, useLocation } from "react-router-dom";
import Navb from "../navbar";
import { SignoutNav } from "../../UserView/singoutnav";
import { isAuthenticated } from "../../auth/authIndex";
import { API } from "../../backend";
import "./css/SeriesHolder.css";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";

/*
Call series data 
Call Invoice Data
Call Invoice for preview - open in another tab with dummy data i.e prepare a component for this

Start with num of series and put the element into a map state which changes if the count cghanges
*/

const SeriesHolder = (props) => {
  // Have a number of created invoices
  // have all users of created invoices data for being listed
  // There is always more than originally updated users not less so number is important
  // Edit fatures for all these invoices being sent from series data.
  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const generatePrefSuf = (index,pref_suf,pref_suff_type,sl_num)=>{
    if (pref_suff_type){
      return  <b>{pref_suf+'/'+'O'+(index+1)+'/'+'0000'+sl_num}</b>
    }
    else{
      return <b>{'O'+(index+1)+'/'+'0000'+sl_num+'/'+pref_suf}</b>
    }
  }
  const SeriesCompare = (constCount,seriesCount) =>{
    if(seriesCount+1 <= constCount){
      return true // if there are entries present for current series element 
    }
    else{
      return false // new entreis will be entered
    }
  }
  const SeriesCardView = () => {
    return (
      <>
        <div className="SeriesHolderConatainer">
          {/* Create an array of length seriesCount and map over it */}
          {Array.from({ length: seriesCount }, (_, index) => (
            <>
            {SeriesCompare(SeriesConstCount,index) == true && 
            <div key={index} className="block">
              <div className="flexContainer">
                <div class="parent">
                  <div class="div1">
                    <div className="FlexCntContainer">
                    <div className="IndexContainer">
                    {index + 1}.
                      </div>  
                      <div className="PSixContainer">
                        {props.series && generatePrefSuf(index,props.series[index].prefix_surfix,props.series[index].prefix_surfix_type,                                props.series[index].sl_num
)}
                      </div>
                      {props.series && props.series[index].primary_type && <div className="isprimary">
                       <b> Primary</b>
                      </div>}
                    </div> 
                    
                    </div>
                  <div class="div2">
                  <Form.Label className="RowBoxHeading">
                              Display name: *
                            </Form.Label>
                            <Form.Control
                              size="md"
                              type="input"
                              className="form-control"
                              placeholder={
                               props.series &&
                                 props.series[index].name
                              }
                              disabled
                            />
                  </div>
                  <div class="div3"> <Form.Label className="RowBoxHeading">
                              Serial num: *
                            </Form.Label>
                            <Form.Control
                              size="md"
                              type="input"
                              className="form-control"
                              disabled
                              placeholder="Serial Number"
                              value={
                                props.series &&
                                props.series[index].sl_num
                              }
                            /> </div>
                  <div class="div4">
                <Link id="linkerho" to={"/user/dashboard/headOffice/editSeriesHolder"}>
                <button style={{padding:'0.5vh 1vw',background:"#292c8f",marginTop:'3vh',borderRadius: "4px",display: "inline-block"}}>
                  <div style={{color:"white"}} >Edit</div></button> </Link>
                
             </div>
                </div>
              </div>
              {/* Your block content goes here */}
            </div> }
            {SeriesCompare(SeriesConstCount,index) == false && 
            <div key={index} className="block">
              <div className="flexContainer">
                <div class="parent">
                  <div class="div1"><div className="FlexCntContainer">
                    <div className="IndexContainer">
                    {index + 1}.
                      </div>  
                    </div>  </div>
                    <div class="div2">
                  <Form.Label className="RowBoxHeading">
                              Display name: *
                            </Form.Label>
                            <Form.Control
                              size="md"
                              type="input"
                              className="form-control"
                            />
                  </div>
                  <div class="div3">
                  <Form.Label className="RowBoxHeading">
                              Serial num: *
                            </Form.Label>
                            <Form.Control
                              size="md"
                              type="input"
                              className="form-control"
                              placeholder="Serial Number"
                            />
                  </div>
                  <div class="div4 noEdit"></div>
                </div>
              </div>
              {/* Your block content goes here */}
            </div> }
            
            </>
          ))}
        </div>
      </>
    );
  };
  // Event handler for dropdown value change
  const handleDropdownChange = (event) => {
    setSeriesCount(parseInt(event.target.value, 10));
  };
  const [seriesCount, setSeriesCount] = useState(0);
  const [SeriesConstCount,SetSeriesConstCount] = useState(0);

  const FetchSeriesCount = async () => {
    try {
      const resp = await fetch(
        `${API}bill/getseriescount/${isAuthenticated().user.id}`,
        {
          method: "GET",
        }
      );
      const data = await resp.json();
      setSeriesCount(data);
      SetSeriesConstCount(data)
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    FetchSeriesCount();
  }, []);
  return (
    <>
      <div>
        <label htmlFor="myDropdown">Select number of series :</label>
        <select
          id="myDropdown"
          value={seriesCount}
          onChange={handleDropdownChange}
        >
          {generateOptions(seriesCount, 7)}
        </select>
        <p>Selected Number: {seriesCount}</p>
      </div>
      <div className="SeriesAllContainer">
        <div className="SeriesCard">{SeriesCardView()}</div>
      </div>
    </>
  );
};

export default SeriesHolder;


/*
For Image :
Retrieve image from backend and if it is to be changed store another one if it is unchanged let it be same in send list


*/ 