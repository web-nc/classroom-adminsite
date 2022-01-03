import React from "react";
import { Route, Routes } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
import { UnexpectedComponent } from "../pages/404";
import AdminPage from "../pages/AdminPage";
import ClassPage from "../pages/ClassPage";
import UserPage from "../pages/UserPage";

export default function MainRoute() {
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
        {/* <Route path="/login" element={<AuthRoute loggedIn={loggedIn} />}>
          <Route path="/login" element={<Login />} />
        </Route> */}
        {/* <Route path="/" element={<PrivateRoute loggedIn={loggedIn} />}> */}
        <Route path="/*" element={<AdminPage />} />
        {/* </Route> */}
        {/* <Route path="/user" element={<PrivateRoute loggedIn={loggedIn} />}> */}
        <Route path="/user" element={<UserPage />} />
        {/* </Route> */}
        {/* <Route path="/class" element={<PrivateRoute loggedIn={loggedIn} />}> */}
        <Route path="/class" element={<ClassPage />} />
        {/* </Route> */}
        <Route path="/404" element={<UnexpectedComponent />} />
      </Routes>

      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        draggable
      /> */}
    </div>
  );
}
