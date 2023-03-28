// addsales

  // const LimitMsgSys = ()=>{
  //   return(
  //     <div id="LimitMsgSys" style={lmtmsgsys}>
  //     Cannot Pass credit more than your own
  //     </div>
  //   )
  // }
  // const LimitMsgSms = ()=>{
  //   return(
  //     <div id="LimitMsgSys" style={lmtmsgsms}>
  //     Cannot Pass credit more than your own
  //     </div>
  //   )
  // }
  // const LimitMsgwpp = ()=>{
  //   return(
  //     <div id="LimitMsgwpp" style={lmtmsgwpp}>
  //     Cannot Pass credit more than your own
  //     </div>
  //   )
  // }


  //handle change
   // if (name ==='system_credit'){

    //   if (event.target.value>GetBillingInfo().system_credit){
    //     setlmmsgsys({display: "fixed",
    //     fontSize:"10px",
    //       position: "absolute",
    //       left:"42vw",
    //       color:"red",
    //       marginTop:"5px"
    //       });
    //   }
    //   else if (event.target.value<GetBillingInfo().system_credit){
    //     setlmmsgsys({display:"none"})

    //   }
    // }
      //   else if (event.target.value<GetBillingInfo().sms_credit){
      //     setlmmsgsms({display:"none"})

      //   }
     // if (name ==='whatsapp_credit'){
    //   console.log(event.target.value,GetBillingInfo())

    //   if (event.target.value>GetBillingInfo().whatsapp_credit
    //   ){
    //     setlmmsgwpp({display: "fixed",
    //     fontSize:"10px",
    //       position: "absolute",
    //       left:"15vw",
    //       color:"red",
    //       marginTop:"5px"
    //       });
    //   }
    //   else if (event.target.value<GetBillingInfo().whatsapp_credit
    //   ){
    //     setlmmsgwpp({display:"none"})

    //   }
    // }



    // authindex
    // USE THIS FOR USER REGISTERATION BUT NEED TO BUILD LOGIC FOR Permission of accessing and creating lower level user
// export const signup= user =>{
//     return fetch(`${API}user/`,{
//         method:"POST",
//         headers:{

//         }
//     })
// }

// Login js
// Handles the data as it is getting filled
  // const submit = (event) => {
  //   event.preventDefault();
  //   setvalues({ ...values, error: false, loading: true });
  //   SignIn({ email, password })
  //     .then((data) => {
  //       console.log("signin", data);
        
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   // Call to login api
  // };
  // Handles user submit event and takes specific action as per requirement.