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

function ClassDetail({ openDialog, handleDialogClose, classItem }) {
  let owner = "",
    name = "",
    details = "",
    briefName = "",
    students = [],
    teachers = [],
    createdDate = "";

  console.log(classItem);
  if (Object.keys(classItem).length !== 0) {
    owner = classItem.row.owner;
    name = classItem.row.name;
    details = classItem.row.details;
    briefName = classItem.row.briefName;
    students = classItem.row.students;
    teachers = classItem.row.teachers;
    createdDate = format(new Date(classItem.row.createdDate), "dd/MM/yyyy");
  }

  console.log(details);

  const handleClose = () => {
    handleDialogClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleClose} fullWidth={true}>
      <DialogTitle sx={{ textAlign: "center" }}>Thông tin chi tiết</DialogTitle>
      <DialogContent>
        <Typography>Tên lớp:</Typography>
        <Typography>{name}</Typography>
        <Typography>Tên viết tắt:</Typography>
        <Typography>{briefName}</Typography>
        <Typography>Người tạo:</Typography>
        <Typography>{owner}</Typography>
        <Typography>Ngày tạo:</Typography>
        <Typography>{createdDate}</Typography>
        <Typography>Chi tiết:</Typography>
        <div dangerouslySetInnerHTML={{ __html: details }} />
        <Typography>Danh sách giáo viên:</Typography>
        {teachers.map((teacher) => (
          <Typography>{teacher.name}</Typography>
        ))}
        <Typography>Danh sách sinh viên:</Typography>
        {students.map((student) => (
          <Typography>{student.name}</Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClassDetail;
