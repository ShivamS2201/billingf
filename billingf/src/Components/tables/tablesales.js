import React from "react";
import { Link } from "react-router-dom";
export function AddSales(){
    return <>Sales Table
    <div>
    <Link to="/user/dashboard/register/addsales">
      <button>
       Add sales</button></Link>
    </div>
    </>;
}