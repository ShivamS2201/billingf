import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./css/distributor.css";

const Distributor = () => {
  const dataholder = 8;
  const [bstate, setbstate] = useState();
  const [states, setstates] = useState({
    distributor:true,
    profile: false,
    sales: false,
    Hoffice: false,
    Branch: false,
  });
  useEffect(() => {
    setbstate("beforeSelect");
  }, [states]);
  function DistributorClick() {
    return states.distributor && <>Distributor</>;
  }
  function ProfileClick() { // Profile update form comes here.
    return states.profile && <>Profile</>;
  }
  function SalesClick() {
    return states.sales && <>Sales Table</>;
  }
  function HofficeClick() {
    return states.Hoffice && <>Head Office Table</>;
  }
  function BranchClick() {
    return states.Branch && <>Branch Table</>;
  }
  return (
    <>
      <div className="distributorWrapper">
        <div className="buttoncontentwrapper">
          <div className="flexContainer">
            <div className="buttoncontainer">
              <div className="buttonwrapper">
              <button
                  className={states.distributor && bstate}
                  onClick={(bstate) => {
                    setstates({
                        distributor:true,
                      profile: false,
                      sales: false,
                      Hoffice: false,
                      Branch: false,
                    });
                    setbstate((bstate) =>
                      bstate === "beforeSelect" ? "afterSelect" : "beforeSelect"
                    );
                  }}
                >
                  Distributor
                </button>
                <button
                  className={states.profile && bstate}
                  onClick={(bstate) => {
                    setstates({
                      profile: true,
                      sales: false,
                      Hoffice: false,
                      Branch: false,
                    });
                    setbstate((bstate) =>
                      bstate === "beforeSelect" ? "afterSelect" : "beforeSelect"
                    );
                  }}
                >
                  Profile
                </button>
                <button
                  className={states.sales && bstate}
                  onClick={(bstate) => {
                    setstates({
                      sales: true,
                      profile: false,
                      Hoffice: false,
                      Branch: false,
                    });
                    setbstate((bstate) =>
                      bstate === "beforeSelect" ? "afterSelect" : "beforeSelect"
                    );

                  }}
                >
                  Sales
                </button>
                <button
                  className={states.Hoffice && bstate}
                  onClick={(bstate) => {
                    setstates({
                      Hoffice: true,
                      profile: false,
                      sales: false,
                      Branch: false,
                    });
                    setbstate((bstate) =>
                      bstate === "beforeSelect" ? "afterSelect" : "beforeSelect"
                    );

                  }}
                >
                  Head Office
                </button>
                <button
                  className={states.Branch && bstate}
                  onClick={(bstate) => {
                    setstates({
                      Branch: true,
                      profile: false,
                      sales: false,
                      Hoffice: false,
                    });
                    setbstate((bstate) =>
                      bstate === "beforeSelect" ? "afterSelect" : "beforeSelect"
                    );
                  }}
                >
                  Branch
                </button>
              </div>
            </div>
           { states.profile && <div className="profileWrapper">

            PROFILE COmes here
            </div>}
            <div className="cardconatiner" style={{display:(states.profile?"none":"")}}>
        <div className='CardGrid'>
          < div className='cards card1'>
            <div className="cardWrapper">
              <div className="imgcontainer">
                <i className="bi bi-person" style={{fontSize:"3.8em"}}></i>
              </div>
              <div className="dataconatiner">
            <div className="textholder">Sales
            </div>
            <div className="dataholder">
              {dataholder}
            </div>
            
            </div>
           </div>
          </div>
          < div className='cards card2'>
          <div className="cardWrapper">
              <div className="imgcontainer">
                <i className="bi bi-person" style={{fontSize:"3.8em"}}></i>
              </div>
              <div className="dataconatiner">
            <div className="textholder"> SYSTEM
            SMS 
            Whatsup
            </div>
            <div className="dataholder">
              {dataholder}
            </div>
            
            </div>
           </div>
           
          </div>
          < div className='cards card3'>
          <div className="cardWrapper">
              <div className="imgcontainer">
                <i className="bi bi-person" style={{fontSize:"3.8em"}}></i>
              </div>
              <div className="dataconatiner">
            <div className="textholder">Head Office
            </div>
            <div className="dataholder">
              {dataholder}
            </div>
            
            </div>
           </div>
          </div>
          < div className='cards card4'>
          <div className="cardWrapper">
              <div className="imgcontainer">
                <i className="bi bi-person" style={{fontSize:"3.8em"}}></i>
              </div>
              <div className="dataconatiner">
            <div className="textholder">Branch
            </div>
            <div className="dataholder">
              {dataholder}
            </div>
            
            </div>
           </div>
          </div>
      </div></div>
          </div>
        </div>
        <div className="tablewrapper">
          Table
          <DistributorClick />
          <ProfileClick />
          <SalesClick />
          <HofficeClick />
          <BranchClick />
        </div>
      </div>
    </>
  );
};

export default Distributor;
