import axios from "axios";

// Gắn token vào header của request
axios.interceptors.request.use((config) => {
  config.headers["Authorization"] =
    "Bearer " + JSON.parse(localStorage.getItem("token"));
  return config;
});

const API_URL = process.env.REACT_APP_BACKEND_URL + "/user";

export function getUsers() {
  return axios.get(API_URL + "/getAll");
}
