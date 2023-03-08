import React from "react";
import {BrowserRouter, Switch,Route, Routes} from 'react-router-dom';

import App from "./App";

const RoutesD = () =>{
  return(

    <BrowserRouter>
    <Routes>
    <Route path="/" exact element={<App />}></Route>
    {/* <Route path="/signup" exact element={<App />}></Route> */}
    </Routes>
    </BrowserRouter>
  )
}

export default RoutesD;