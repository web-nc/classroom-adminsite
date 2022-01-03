import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminList from "../components/ManageAdmin/AdminList";
import CreateAdmin from "../components/ManageAdmin/CreateAdmin";
import { getAdminAccounts } from "../services/admin";

function AdminPage({ handleSignOut }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getAdminAccounts()
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

  const addAdminData = (admin) => {
    setData((prevState) => [...prevState, admin]);
  };

  return (
    <Routes>
      <Route path="home" element={<AdminList data={data} handleSignOut={handleSignOut} />} />
      <Route
        path="create"
        element={<CreateAdmin data={data} addAdminData={addAdminData} handleSignOut={handleSignOut} />}
      />
    </Routes>
  );
}

export default AdminPage;
