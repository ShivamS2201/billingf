import { API } from "../backend";
import { useState } from "react";
// USE THIS FOR USER REGISTERATION BUT NEED TO BUILD LOGIC FOR Permission of accessing and creating lower level user
// export const signup= user =>{
//     return fetch(`${API}user/`,{
//         method:"POST",
//         headers:{

//         }
//     })
// }
export const GetRole = (roleID) => {
  const role = {'owner':false,'distributor': false,
  'sales':false,
  'headOffice':false,
  'Branch':false,
  'Cust':false
}
  if(roleID =="2"){
    return {...role,'owner':true}
  }
  else if (roleID =="3"){
   return {...role,'distributor':true}
  }
  else if(roleID =="4"){
    return {...role,'sales':true}
  }
  else if(roleID =="5"){
    return {...role,'headOffice':true}
  }
  else if (roleID =="6"){
    return {...role,'Branch':true}
  }
  else if (roleID =="7"){
    return {...role,'Cust':true}
  }
};
export const SignIn = (user) => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  for (var key of formData.keys()) {
    console.log("keys", key);
  }
  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
    headers: { Authorization: null },
    withCredentials: true,
  })
    .then((resp) => {
      console.log("success", resp);
      return resp.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("Data", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("Data")) {
    return JSON.parse(localStorage.getItem("Data"));
  } else {
    return false;
  }
};

export default function SignOut(next) {
  const UserID = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("Data");
    console.log("LOGOUT USER successful");

    return fetch(`${API}user/logout/${UserID}`, {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => {
        console.log("SIGNOUT/ Nikalo");
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
