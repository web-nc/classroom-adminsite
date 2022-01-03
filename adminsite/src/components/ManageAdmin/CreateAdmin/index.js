import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import Header from "../../Header";
import Navigator from "../../Navigator";
import theme from "../../Theme";
import Title from "../Title";
import AddAdmin from "./AddAdmin";

function CreateAdmin({ addAdminData, data }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box component="nav" sx={{ width: { sm: 256 }, flexShrink: { sm: 0 } }}>
          {/* {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )} */}

          <Navigator choose="add" />
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
