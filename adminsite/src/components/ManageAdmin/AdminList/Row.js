import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import * as React from "react";
import AdminDetail from "./AdminDetail";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        fullWidth
        placeholder="Tìm kiếm..."
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function QuickFilteringGrid({ data }) {
  const [isAddingOpen, setIsAddingOpen] = React.useState(false);

  const columns = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "adminEmail",
      headerName: "Email",
      flex: 1,
      minWidth: 250,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "adminName",
      headerName: "Họ tên",
      minWidth: 250,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "adminGender",
      headerName: "Giới tính",
      width: 200,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "adminCreatedDate",
      headerName: "Ngày tạo",
      width: 220,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
  ];

  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState(data);
  const [adminSelected, setAdminSelected] = React.useState({});

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <>
      <Box
        sx={{
          height: 400,
          width: "95%",
          margin: "2.5%",
          boxShadow: "0 0 1px",
          borderRadius: "5px",
        }}
      >
        <DataGrid
          components={{ Toolbar: QuickSearchToolbar }}
          rows={rows}
          columns={columns}
          onRowClick={(item) => {
            setAdminSelected(item);
            setIsAddingOpen(!isAddingOpen);
          }}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(""),
            },
          }}
        />
      </Box>
      <AdminDetail
        admin={adminSelected}
        openDialog={isAddingOpen}
        handleDialogClose={() => setIsAddingOpen(!isAddingOpen)}
      />
    </>
  );
}
