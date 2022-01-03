// import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Title() {
  return (
    <AppBar
      component="div"
      color="primary"
      position="static"
      elevation={0}
      sx={{ zIndex: 0, paddingBottom: "1.65rem", textAlign: "center" }}
    >
      <Typography color="inherit" variant="h5" component="h1">
        Quản Lý Quản Trị Viên
      </Typography>
    </AppBar>
  );
}

export default Title;
