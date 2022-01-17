import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import User from "../components/ManageUser";
import { getUsers } from "../services/user";

function UserPage({ handleSignOut }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getUsers()
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
  // console.log(data);

  return (
    <Routes>
      <Route
        path="/"
        element={<User data={data} handleSignOut={handleSignOut} />}
      />
    </Routes>
  );
}

export default UserPage;
