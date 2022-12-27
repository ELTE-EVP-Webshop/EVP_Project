import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
axios.defaults.withCredentials = true

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    }, {
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
    }})
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        console.log("Hiba!")
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout", {
        withCredentials: true,
		headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    }).then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


function getCookie (name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
  }
  else
  {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
      end = dc.length;
      }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
}



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCookie
}

export default AuthService;