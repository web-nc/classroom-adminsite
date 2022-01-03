import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { toast } from "react-toastify";
import { addAdmin } from "../../../services/admin";

const theme = createTheme();
const genders = ["Nam", "Nữ", "Khác"];

function AddAdmin({ addAdminData }) {
  const [gender, setGender] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submit, setSubmit] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const dataForm = new FormData(event.currentTarget);
    addAdmin({ email, password, firstname: firstName, lastname: lastName, gender }).then((res) => {
      if (res.status !== 200) return;

      toast.success(res.data.message);
      // eslint-disable-next-line no-console
      const row = res.data.newAdmin;
      addAdminData(row);
    });
    setSubmit(!submit);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AdminPanelSettingsOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Tạo quản trị viên
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Họ"
                    name="lastName"
                    autoComplete="family-name"
                    autoFocus
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Tên"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="gender"
                    name="gender"
                    label="Giới tính"
                    fullWidth
                    select
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}>
                    {genders.map((gender, index) => (
                      <MenuItem key={index} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Tạo
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default AddAdmin;
