import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UnexpectedComponent } from "../pages/404";
import AdminPage from "../pages/AdminPage";
import ClassPage from "../pages/ClassPage";
import Login from "../pages/Login";
import UserPage from "../pages/UserPage";
import { logout } from "../services/auth";
import { AuthRoute, PrivateRoute } from "./Routes";

const token = JSON.parse(localStorage.getItem("token"));
const initialState = token ? { loggedIn: true, token: token } : { loggedIn: false, token: null };

export default function MainRoute() {
  const [auth, setAuth] = useState(initialState);

  const { loggedIn } = auth;

  const handleSignIn = (token) => {
    setAuth((prevState) => ({ ...prevState, loggedIn: true, token: token }));
  };

  const handleSignOut = () => {
    logout();
    setAuth((prevState) => ({ ...prevState, loggedIn: false, token: null }));
  };

  // const loggedIn = useSelector((state) => state.auth.loggedIn);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (loggedIn) {
  //     dispatch(async (dispatch) => {
  //       return getCourses().then((res) => {
  //         dispatch({ type: "COURSES_FETCHED", payload: res.data.payload });
  //       });
  //     });
  //   }

  //   return () => {
  //     dispatch({ type: "COURSES_EMPTY" });
  //   };
  // }, [dispatch, loggedIn]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<AuthRoute loggedIn={loggedIn} />}>
          <Route path="/login" element={<Login handleSignIn={handleSignIn} />} />
        </Route>
        <Route path="/" element={<PrivateRoute loggedIn={loggedIn} />}>
          <Route path="/*" element={<AdminPage handleSignOut={handleSignOut} />} />
          <Route index element={<Navigate to="home" />} />
        </Route>
        <Route path="/user" element={<PrivateRoute loggedIn={loggedIn} />}>
          <Route path="/user" element={<UserPage />} />
        </Route>
        <Route path="/class" element={<PrivateRoute loggedIn={loggedIn} />}>
          <Route path="/class" element={<ClassPage />} />
        </Route>
        <Route path="/404" element={<UnexpectedComponent />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        draggable
      />
    </div>
  );
}
