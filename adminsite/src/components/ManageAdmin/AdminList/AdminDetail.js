import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

function AdminDetail({ openDialog, handleDialogClose, admin }) {
  let email = "",
    name = "",
    gender = "",
    createdDate = "";

  if (Object.keys(admin).length !== 0) {
    email = admin.row.adminEmail;
    name = admin.row.adminName;
    gender = admin.row.adminGender;
    createdDate = admin.row.adminCreatedDate;
  }

  const handleClose = () => {
    handleDialogClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDialogClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <form action="/" method="POST" onSubmit={handleSubmit}>
        <DialogTitle sx={{ textAlign: "center" }}>
          Thông tin chi tiết
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            variant="outlined"
            name="email"
            value={email}
            disabled
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Họ tên"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={name}
          />
          <TextField
            autoFocus
            margin="dense"
            id="gender"
            label="Giới tính"
            type="text"
            fullWidth
            variant="outlined"
            name="gender"
            value={gender}
          />
          <TextField
            autoFocus
            margin="dense"
            id="createdDate"
            label="Ngày tạo"
            type="text"
            fullWidth
            variant="outlined"
            name="createdDate"
            value={createdDate}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ bỏ</Button>
          <Button type="submit" onClick={handleSubmit}>
            Cập nhật
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AdminDetail;
