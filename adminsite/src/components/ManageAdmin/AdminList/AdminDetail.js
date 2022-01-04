import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import format from "date-fns/format";
import React from "react";

function AdminDetail({ openDialog, handleDialogClose, admin }) {
  let email = "",
    name = "",
    gender = "",
    createdDate = "";

  if (Object.keys(admin).length !== 0) {
    email = admin.row.email;
    name = `${admin.row.firstname || ""} ${admin.row.lastname || ""}`;
    gender = admin.row.gender;
    createdDate = format(new Date(admin.row.createdDate), "dd/MM/yyyy");
  }

  const handleClose = () => {
    handleDialogClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: "center" }}>Thông tin chi tiết</DialogTitle>
      <DialogContent>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>Email: </strong>
          {email}
        </Typography>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>Họ tên: </strong>
          {name}
        </Typography>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>Giới tính: </strong>
          {gender}
        </Typography>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>Ngày tạo: </strong>
          {createdDate}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminDetail;
