import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminList from "../components/ManageAdmin/AdminList";
import CreateAdmin from "../components/ManageAdmin/CreateAdmin";

function AdminPage() {
  const [data, setData] = useState([
    {
      id: 1,
      adminEmail: "truongvukt2000@gmail.com",
      adminName: "Vu Luu Truong",
      adminGender: "Nam",
      adminCreatedDate: "2021-12-10",
    },
    {
      id: 2,
      adminEmail: "haruharu123@gmail.com",
      adminName: "Ha Ha",
      adminGender: "Nữ",
      adminCreatedDate: "2021-12-20",
    },
  ]);

  const addAdminData = (admin) => {
    const newData = [...data, admin];
    setData(newData);
  };

  return (
    <Routes>
      <Route path="/" element={<AdminList data={data} />} />
      <Route
        path="/create"
        element={<CreateAdmin data={data} addAdminData={addAdminData} />}
      />
    </Routes>
  );
}

export default AdminPage;
