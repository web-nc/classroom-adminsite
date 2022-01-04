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

  if (Object.keys(classItem).length !== 0) {
    owner = classItem.row.owner;
    name = classItem.row.name;
    details = classItem.row.details;
    briefName = classItem.row.briefName;
    students = classItem.row.students;
    teachers = classItem.row.teachers;
    createdDate = format(new Date(classItem.row.createdDate), "dd/MM/yyyy");
  }

  const handleClose = () => {
    handleDialogClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleClose} fullWidth={true}>
      <DialogTitle sx={{ textAlign: "center" }}>Thông tin chi tiết</DialogTitle>
      <DialogContent>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>Tên lớp: </strong>
          {name}
        </Typography>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>
            Tên viết tắt:{" "}
          </strong>
          {briefName}
        </Typography>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>Người tạo: </strong>
          {owner}
        </Typography>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>Ngày tạo: </strong>
          {createdDate}
        </Typography>
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>Chi tiết:</strong>
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: details }} />
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>
            Danh sách giáo viên
          </strong>
        </Typography>
        {teachers.map((teacher, index) => (
          <Typography key={index}>- {teacher.name}</Typography>
        ))}
        <Typography sx={{ marginBottom: "0.25rem" }}>
          <strong style={{ textDecoration: "underline" }}>
            Danh sách sinh viên
          </strong>
        </Typography>
        {students.map((student, index) => (
          <Typography key={index}>- {student.name}</Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClassDetail;
