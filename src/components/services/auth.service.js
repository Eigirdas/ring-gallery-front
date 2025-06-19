import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/auth/";

const register = (username, email, firstPassword, secondPassword) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    firstPassword,
    secondPassword,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", { username, password })
    .then((response) => {
      if (response.data.jwt) {
        const decoded = jwtDecode(response.data.jwt);
        const userWithRoles = {
          ...response.data,
          roles: decoded.roles || [],
        };
        localStorage.setItem("user", JSON.stringify(userWithRoles));
        return userWithRoles;
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
