import axios from "axios";

// Gắn token vào header của request
axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));
  return config;
});

const API_URL = process.env.REACT_APP_BACKEND_URL + "/admin";

export function getAdminAccounts() {
  return axios.get(API_URL + "/getAll");
}

export function getAdmin() {
  return axios.get(API_URL);
}

export function addAdmin({ email, password, firstname, lastname, gender }) {
  return axios.post(API_URL + "/newAdmin", { email, password, firstname, lastname, gender });
}
