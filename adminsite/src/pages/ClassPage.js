import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Class from "../components/ManageClasses";
import { getCourses } from "../services/course";

function ClassPage({ handleSignOut }) {
  const [data, setData] = useState([]);

  const handleRemoveData = (idDataRemoved) => {
    const index = data.findIndex((d) => d._id === idDataRemoved);
    if (index > -1) {
      let newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

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
        element={<Class data={data} handleSignOut={handleSignOut} handleRemoveData={handleRemoveData} />}
      />
    </Routes>
  );
}

export default ClassPage;
