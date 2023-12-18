import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navb from "../navbar";
import { SignoutNav } from "../../UserView/singoutnav";
import { isAuthenticated } from "../../auth/authIndex";
import SeriesHolder from "./SeriesHolder";
import { API } from "../../backend";
import { useNavigate } from "react-router-dom";

/*
Call series data 
Call Invoice Data
Call Invoice for preview - open in another tab with dummy data i.e prepare a component for this

Start with num of series and put the element into a map state which changes if the count cghanges
*/
const InvoiceDesign  = ()=>{
  const nav = useNavigate();

    function fiscalyear(pre_suf) {
        var fiscalyear = "";
        var today = new Date();
        if (pre_suf === "pref") {
          if (today.getMonth() + 1 <= 3) {
            fiscalyear =
              JSON.stringify(today.getFullYear() - 1) +
              "-" +
              JSON.stringify(today.getFullYear()).slice(-2);
          } else {
            return (
              JSON.stringify(today.getFullYear()) +
              JSON.stringify(today.getFullYear() + 1).slice(-2)
            );
          }
        } else if (pre_suf === "suf") {
          if (today.getMonth() + 1 <= 3) {
            fiscalyear =
              JSON.stringify(today.getFullYear() - 1) +
              "-" +
              JSON.stringify(today.getFullYear()).slice(-2);
          } else {
            fiscalyear =
              JSON.stringify(today.getFullYear()) +
              JSON.stringify(today.getFullYear() + 1).slice(-2);
          }
          return fiscalyear;
        }
      }
    const [billInvoice, setbillInvoice] = useState({
        user_id: isAuthenticated().user.id,
        is_logo_img: true,
        logo: "",
        logo_text: "",
        invoice_design_temp: "",
        currency: "",
        term_condition: "",
        additional_option_type: true,
        option_values: "",
        ecommerce_trader: true,
        reverse_charge: true,
        to_bill_ship_applicable: true,
        gst_shipping_address: true,
        from_date: "",
        till_date: "",
        bank_def: "",
        data: "",
      });
      const [billseries, setbillseries] = useState({
        user_id: isAuthenticated().user.id,
        invoice_id: "", //passed in authindex after call.
        series_num: 1,
        name: "",
        prefix_surfix_type: true,
        sl_num: "",
        prefix_surfix: fiscalyear("pref"), //Intially for Prefix as pref is true
        primary_type: true,
        genrate_invoice: false,
      });
      const getInvoiceDetails = async () => {
        try {
          const resp = await fetch(`${API}bill/getInvoice`, {
            method: "GET",
          });
          const data = await resp.json();
          setbillInvoice({ ...billInvoice, data });
          setInvoiceHolderData(data)
          return data;
        } catch (err) {
          console.log(err);
        }
      };
      const getSeriesDetails = async () => {
        try {
          const resp = await fetch(
            `${API}bill/getseries/${isAuthenticated().user.id}`,
            {
              method: "GET",
            }
          );
          const data = await resp.json();
          setbillseries({ ...billseries, data });
          setSeriersHolderData(data)
          return data;
        } catch (err) {
          console.log(err);
        }
      };


    const [InvoiceHolderData,setInvoiceHolderData] = useState()
    const [SeriersHolderData,setSeriersHolderData] = useState()
    
    useEffect(()=>{
        getInvoiceDetails();
        getSeriesDetails();
    },[])
    
    return (<>
      <div className="name__top" style={{ background: "#313493" }}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>

      <Navb component={<SignoutNav />} state={"headOffice"} />
      <div className="DashContainer">
        <div className="DashboardBarM">
          <h3>Invoice Master</h3>
          <div className="MasterButton">  <div className="ButtonTextWrapper">
         <div className="LOS"></div>
         <div className="ButtonContainerm">
           <Link to="/user/dashboard/headOffice/addcustomer/">
             <button  onClick={() => {
                              nav(-1);
                            }}> Back </button>
           </Link>
         </div>{" "}
       </div></div>
        </div>
      </div>


      <SeriesHolder series={SeriersHolderData} invoice = {InvoiceHolderData} />
        </>)
};

export default InvoiceDesign;
