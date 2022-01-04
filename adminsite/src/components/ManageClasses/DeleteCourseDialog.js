import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function DeleteCourseDialog({ openDialog, setOpenDialog, handleExecute }) {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Xác nhận bạn muốn xóa lớp học?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tất cả mọi thông tin liên quan đến lớp học đều bị xóa. Bạn có chắc chắn chứ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExecute} autoFocus>
            Đồng ý
          </Button>
          <Button onClick={handleClose}>Huỷ</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
