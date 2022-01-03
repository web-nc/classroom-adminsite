import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from '@mui/icons-material/Logout';
import * as React from "react";
import { Link } from "react-router-dom";

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator({ choose, handleSignOut }) {
  const [openSubAdmin, setOpenSubAdmin] = React.useState(
    choose === "adminList" || choose === "add"
  );
  const [openSubUser, setOpenSubUser] = React.useState(false);
  const [openSubClass, setOpenSubClass] = React.useState(false);

  const handleLogOut = () => {
    handleSignOut();
  }

  return (
    <Drawer
      variant="permanent"
      PaperProps={{ style: { width: 256 } }}
      sx={{ display: { sm: "block", xs: "none" } }}
    >
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          Trang Quản Trị Viên
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Đồ án cuối kì" />
        </ListItem>
        <Box sx={{ bgcolor: "#101F33" }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: "#fff" }} primary="Quản lý" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={choose === "adminList" || choose === "add"}
              sx={item}
              onClick={() => setOpenSubAdmin(!openSubAdmin)}
            >
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Quản trị viên" />
              {openSubAdmin ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openSubAdmin} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ marginLeft: "1rem" }}>
              <ListItemButton
                component={Link}
                to="/"
                selected={choose === "adminList"}
                sx={item}
              >
                <ListItemIcon>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="Danh sách quản trị viên" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/create"
                selected={choose === "add"}
                sx={item}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Thêm quản trị viên" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/user"
              selected={choose === "user"}
              sx={item}
              onClick={() => setOpenSubUser(!openSubUser)}
            >
              <ListItemIcon>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Người dùng" />
              {openSubUser ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openSubUser} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ marginLeft: "1rem" }}>
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="Danh sách người dùng" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/class"
              selected={choose === "class"}
              sx={item}
              onClick={() => setOpenSubClass(!openSubClass)}
            >
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Lớp học" />
              {openSubClass ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openSubClass} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ marginLeft: "1rem" }}>
              <ListItemButton sx={item}>
                <ListItemIcon>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="Danh sách lớp học" />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider sx={{ mt: 2 }} />

          <ListItem sx={{ ...item, ...itemCategory, cursor: "pointer" }} onClick={handleLogOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />            
          </ListItem>

        </Box>
      </List>
    </Drawer>
  );
}
