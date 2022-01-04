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

function UserDetail({ openDialog, handleDialogClose, userSelected }) {
  let email = "",
    name = "",
    gender = "",
    studentID = "",
    isBanned = "",
    createdDate = "";

  if (Object.keys(userSelected).length !== 0) {
    email = userSelected.row.email;
    name = `${userSelected.row.firstname || ""} ${
      userSelected.row.lastname || ""
    }`;
    gender = userSelected.row.gender;
    studentID = userSelected.row.studentID;
    isBanned = userSelected.row.isBanned;
    createdDate = format(new Date(userSelected.row.createdDate), "dd/MM/yyyy");
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
          <strong style={{ textDecoration: "underline" }}>
            Mã số sinh viên:{" "}
          </strong>
          {studentID}
        </Typography>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>Ngày tạo: </strong>
          {createdDate}
        </Typography>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>
            Tình trạng tài khoản:{" "}
          </strong>
          {isBanned ? (
            <Typography>Bị khóa</Typography>
          ) : (
            <Typography>Hoạt động</Typography>
          )}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDetail;
