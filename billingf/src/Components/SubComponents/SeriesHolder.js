import React, { useEffect, useState } from "react";
import { Link, json, useLocation } from "react-router-dom";
import Navb from "../navbar";
import { SignoutNav } from "../../UserView/singoutnav";
import { isAuthenticated } from "../../auth/authIndex";
import { API } from "../../backend";
/*
Call series data 
Call Invoice Data
Call Invoice for preview - open in another tab with dummy data i.e prepare a component for this

Start with num of series and put the element into a map state which changes if the count cghanges
*/

const SeriesHolder  = (props)=>{
  // Have a number of created invoices
  // have all users of created invoices data for being listed
  // There is always more than originally updated users not less so number is important
  // Edit fatures for all these invoices being sent from series data.

  const [seriesCount,setSeriesCount] = useState(0)

  const FetchSeriesCount = async () => {
    try {
      const resp = await fetch(`${API}bill/getseriescount/${isAuthenticated().user.id}`, {
        method: "GET",
      });
      const data = await resp.json();
      setSeriesCount(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
  FetchSeriesCount();
  },[])
      return (<>
     
      {JSON.stringify(props.series)}
      <br/>
      <br/>
      <br/>
      {JSON.stringify(seriesCount)}
        </>)
};

export default SeriesHolder;
