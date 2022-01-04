import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminDetail;
