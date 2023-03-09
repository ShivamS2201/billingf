import { API } from "../backend";
// USE THIS FOR USER REGISTERATION BUT NEED TO BUILD LOGIC FOR Permission of accessing and creating lower level user
// export const signup= user =>{
//     return fetch(`${API}user/`,{
//         method:"POST",
//         headers:{

//         }
//     })
// }

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
    headers: { 'Authorization': null },
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
    localStorage.setItem("Sess-token", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("Sess-token")) {
    return JSON.parse(localStorage.getItem("Sess-token"));
  } else {
    return false;
  }
};

export const SignOut = (next) => {
  const UserID = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("Sess-token");
    console.log("LOGOUT USER successful");

    return fetch(`${API}user/logout/${UserID}`, {
      method: "GET",
    })
      .then((response) => {
        console.log("SIGNOUT/ Nikalo");
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
