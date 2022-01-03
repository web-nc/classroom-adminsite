import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_BACKEND_URL + "/auth";

export async function login(email, password) {
  return axios
    .post(API_URL + "/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      }
      return res;
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        toast.warn("Sai email hoặc mật khẩu!");
      } else console.log(err);
    });
}

export function logout() {
  return localStorage.removeItem("token");
}

export function sendPasswordChangeEmail({ email }) {
  return axios.post(API_URL + "/sendPasswordChangeEmail", { email });
}

export function getUserChangePassword({ id, token }) {
  return axios.get(`${API_URL}/loginHelping/getUserChangePassword/${id}?token=${token}`);
}

export function changePassword({ userId, token, newPassword }) {
  return axios.post(`${API_URL}/loginHelping/changePassword`, { userId, token, newPassword });
}
