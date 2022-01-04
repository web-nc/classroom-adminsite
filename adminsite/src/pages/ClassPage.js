import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Class from "../components/ManageClasses";
import { getCourses } from "../services/course";

function ClassPage({ handleSignOut }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getCourses()
      .then((res) => {
        if (res.status === 200 && isMounted) setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isMounted = false;
    };
  }, []);
  console.log(data);

  return (
    <Routes>
      <Route
        path="/"
        element={<Class data={data} handleSignOut={handleSignOut} />}
      />
    </Routes>
  );
}

export default ClassPage;
