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
      sx={{ zIndex: 0, paddingBottom: "1.65rem", paddingLeft: "1.5rem" }}
    >
      <Typography
        color="inherit"
        variant="h5"
        component="h1"
        fontWeight={"bold"}
      >
        Quản Lý Lớp Học
      </Typography>
    </AppBar>
  );
}

export default Title;
