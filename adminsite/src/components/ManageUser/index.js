import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import Header from "../Header";
import Navigator from "../Navigator";
import theme from "../Theme";
import Row from "./Row";
import Title from "./Title";

function AdminList({ data, handleSignOut }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <CssBaseline />
          <Box
            component="nav"
            sx={{ width: { sm: 256 }, flexShrink: { sm: 0 } }}
          >
            <Navigator choose="user" handleSignOut={handleSignOut} />
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Header />
            <Title />
            <Row data={data} />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default AdminList;
