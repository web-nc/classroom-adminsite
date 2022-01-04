import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import Header from "../../Header";
import Navigator from "../../Navigator";
import theme from "../../Theme";
import Title from "../Title";
import AddAdmin from "./AddAdmin";

function CreateAdmin({ addAdminData, data, handleSignOut }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box component="nav" sx={{ width: { sm: 256 }, flexShrink: { sm: 0 } }}>
          <Navigator choose="add" handleSignOut={handleSignOut} />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header />
          <Title />
          <AddAdmin data={data} addAdminData={addAdminData} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CreateAdmin;
