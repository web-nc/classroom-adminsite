import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Avatar, Divider, Grid, Paper } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import LoginForm from "../components/Auth/LoginForm";

function Login({ handleSignIn }) {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "skyblue",
    height: "70px",
    width: "70px",
  };
  const iconStyle = { transform: "scale(2.2)" };
  const typoStyle = { marginLeft: "10px" };

  const location = useLocation();
  const from = location.state?.from || "/";

  return (
    <Grid marginTop={"2rem"}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center" marginTop={"1.25rem"}>
          <Avatar style={avatarStyle}>
            <PersonSharpIcon style={iconStyle} />
          </Avatar>
          <h2>Đăng nhập</h2>
        </Grid>
        <Divider sx={{ my: 2 }}></Divider>
        <LoginForm handleSignIn={handleSignIn} />
      </Paper>
    </Grid>
  );
}

export default Login;
