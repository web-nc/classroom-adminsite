import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import format from "date-fns/format";
import PropTypes from "prop-types";
import * as React from "react";
import UserDetail from "./UserDetail";

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

const getFullName = (params) => {
  return `${params.row.firstname || ""} ${params.row.lastname || ""}`;
};

const dateFormatter = (params) => {
  const date = new Date(params.value);
  return format(date, "dd/MM/yyyy");
};

const columns = [
  {
    field: "id",
    hide: true,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 200,
    align: "left",
    headerAlign: "left",
    disableColumnMenu: true,
  },
  {
    field: "fullname",
    headerName: "Họ tên",
    minWidth: 120,
    flex: 0.3,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    valueGetter: getFullName,
  },
  {
    field: "firstname",
    headerName: "Tên",
    flex: 0.3,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    hide: true,
  },
  {
    field: "lastname",
    headerName: "Họ",
    flex: 0.3,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    hide: true,
  },
  {
    field: "gender",
    headerName: "Giới tính",
    width: 115,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
  },
  {
    field: "studentID",
    headerName: "MSSV",
    width: 115,
    align: "center",
    headerAlign: "center",
    editable: true,
    disableColumnMenu: true,
  },
  {
    field: "createdDate",
    headerName: "Ngày tạo",
    width: 115,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    valueFormatter: dateFormatter,
  },
  {
    field: "isBanned",
    headerName: "Bị khóa",
    width: 115,
    align: "center",
    headerAlign: "center",
    editable: true,
    disableColumnMenu: true,
    type: "boolean",
  },
];

export default function QuickFilteringGrid({ data }) {
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [isFieldToDetailOpen, setIsFieldToDetailOpen] = React.useState(false);

  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState(data);
  const [userSelected, setUserSelected] = React.useState({});

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

  const handleDialogClose = () => {
    setIsFieldToDetailOpen(false);
    setIsDetailOpen(!isDetailOpen);
  };

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <>
      <Box
        sx={{
          minHeight: 600,
          maxHeight: 700,
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
          onCellClick={(params, event) => {
            event.defaultMuiPrevented = true;
            if (params.field === "fullname" || params.field === "email") {
              setIsFieldToDetailOpen(true);
            }
          }}
          onRowClick={(item) => {
            setUserSelected(item);
            if (isFieldToDetailOpen) {
              setIsDetailOpen(!isDetailOpen);
            }
          }}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(""),
            },
          }}
          getRowId={(row) => row._id}
        />
      </Box>
      <UserDetail
        userSelected={userSelected}
        openDialog={isDetailOpen}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
}
