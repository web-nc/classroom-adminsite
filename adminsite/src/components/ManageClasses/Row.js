import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import format from "date-fns/format";
import PropTypes from "prop-types";
import * as React from "react";
import ClassDetail from "./ClassDetail";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCourse } from "../../services/course";
import { toast } from "react-toastify";
import DeleteCourseDialog from "./DeleteCourseDialog";

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

const dateFormatter = (params) => {
  const date = new Date(params.value);
  return format(date, "dd/MM/yyyy");
};

export default function QuickFilteringGrid({ data, handleRemoveData }) {
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [isFieldToDetailOpen, setIsFieldToDetailOpen] = React.useState(false);

  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState(data);
  const [classSelected, setClassSelected] = React.useState({});
  const [openDeleteCourseDialog, setOpenDeleteCourseDialog] = React.useState(false);

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

  const handleDeleteCourse = (params) => {
    deleteCourse(params.row?._id).then((res) => {
      if (res.status === 202) return toast.warning(res.data.message);
      if (res.status === 200) {
        toast.success(res.data.message);
        handleRemoveData(res.data.courseIdDeleted);
      }
    }).catch(err => {
      if (err) console.log(err);
    })
    setOpenDeleteCourseDialog(false);
  };

  const handleOpenDeleteCourseDialog = () => {
    setOpenDeleteCourseDialog(true);
  };

  const columns = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "name",
      headerName: "Tên lớp",
      flex: 1,
      minWidth: 250,
      align: "left",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "owner",
      headerName: "Người tạo",
      flex: 0.3,
      minWidth: 180,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "amountStudent",
      headerName: "Số sinh viên",
      width: 120,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "amountTeacher",
      headerName: "Số giáo viên",
      width: 120,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      field: "createdDate",
      headerName: "Ngày tạo",
      width: 220,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      valueFormatter: dateFormatter,
    },
    {
      field: "actions",
      headerName: "Xóa",
      width: 90,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton color="warning" onClick={() => handleOpenDeleteCourseDialog(params)}>
          <DeleteIcon />
        </IconButton>
      ),
    }
  ];
  
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
            if (params.field === "name") {
              setIsFieldToDetailOpen(true);
            }
          }}
          onRowClick={(item) => {
            setClassSelected(item);
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
      <ClassDetail
        classItem={classSelected}
        openDialog={isDetailOpen}
        handleDialogClose={handleDialogClose}
      />
      <DeleteCourseDialog openDialog={openDeleteCourseDialog} setOpenDialog={isOpened => setOpenDeleteCourseDialog(isOpened)} handleExecute={() => handleDeleteCourse(classSelected)} />
    </>
  );
}
