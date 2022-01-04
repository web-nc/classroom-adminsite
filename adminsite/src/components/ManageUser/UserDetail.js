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
    <Dialog open={openDialog} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>Thông tin chi tiết</DialogTitle>
      <DialogContent>
        <Typography>Email:</Typography>
        <Typography>{email}</Typography>
        <Typography>Họ tên:</Typography>
        <Typography>{name}</Typography>
        <Typography>Giới tính:</Typography>
        <Typography>{gender}</Typography>
        <Typography>Mã số sinh viên:</Typography>
        <Typography>{studentID}</Typography>
        <Typography>Ngày tạo:</Typography>
        <Typography>{createdDate}</Typography>
        <Typography>Tình trạng tài khoản:</Typography>
        {isBanned ? (
          <Typography>Bị khóa</Typography>
        ) : (
          <Typography>Hoạt động</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDetail;
