import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@src/assets/svgs/Edit.svg";
import "../farms/farms.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useFarmsFlocksListQuery } from "@src/store/api";
import FlockModal from "@src/components/shared/popups/flocksModal/flocksModal";

function Flock() {
  const [farmsFlockData, setFarmsFlockData] = useState([]);
  const [dataLoading, setIsDataLoading] = useState(true);
  const { farmId } = useParams();
  const [pageSize, setPageSize] = useState(10);
  const { data: rows = [], isLoading } = useFarmsFlocksListQuery(
    { farmId: farmId },
    { skip: !farmId },
  );

  const [action, setAction] = useState("add");
  const [rowCellId, setRowCellId] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setRowCellId(undefined);
    setAction("add");
    setOpenModal(false);
  };

  const handleEditModalOpen = (event, cellId) => {
    event.stopPropagation();
    setAction("edit");
    setRowCellId(cellId);
    setOpenModal(true);
  };

  const navigate = useNavigate();

  const columns = [
    {
      field: "no",
      headerName: "NO",
      sortable: false,
      width: 100,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.no}
          </p>
        );
      },
    },
    {
      field: "input_date",
      headerName: "Input Date",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.input_date}
          </p>
        );
      },
    },
    {
      field: "input_quantity",
      headerName: "Input Quantity",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.input_quantity}
          </p>
        );
      },
    },
    {
      field: "sale_date",
      headerName: "Sale Date",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.sale_date}
          </p>
        );
      },
    },
    {
      field: "sale_quantity",
      headerName: "Sale Quantity",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.sale_qty}
          </p>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (cellValues) => {
        return (
          <Box
            className="renderCell-joiningDate"
            style={{ marginLeft: "10px" }}
          >
            <IconButton
              onClick={(event) => handleEditModalOpen(event, cellValues.row.id)}
              aria-label="edit"
              id="edit-btn-id"
              className="edit-btn"
            >
              <img className="profile-pic" src={EditIcon} alt="editIcon" />
            </IconButton>
            {/* <IconButton
              //   onClick={(event) =>
              //     handleDeleteModalOpen(event, cellValues.row.id)
              //   }
              aria-label="delete"
              id="delete-btn-id"
              className="delete-btn"
            >
              <img className="profile-pic" src={DeleteIcon} alt="deleteIcon" />
            </IconButton> */}
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      if (rows.length) {
        setFarmsFlockData(rows);
      } else {
        setFarmsFlockData([]);
      }
      setIsDataLoading(false);
    }
  }, [rows, isLoading]);
  return (
    <Box className="departmentDataGridTable-section">
      <Box
        className="top-bar-cls"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography className="title-cls">{"Flock"}</Typography>
        <Box
          className="filter-section"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <SearchBox text="Search flocks here" /> */}
          {/* <Box className="filter-btn-cls">
            <Button
              className="filter-btn"
              id="filter-btn-id"
              variant="outlined"
              startIcon={
                <img
                  className="profile-pic"
                  src={FilterIcon}
                  alt="profile pic"
                />
              }
            >
              {" "}
              <p>{"Filter"}</p>
            </Button>
          </Box> */}
          <Button
            variant="outlined"
            className="create-btn"
            style={{ borderRadius: "12px" }}
            startIcon={<AddIcon />}
            onClick={handleModalOpen}
          >
            <p id="create-btn-text">{"Create"}</p>
          </Button>
        </Box>
      </Box>

      <div className="dataGridTable-main">
        {!dataLoading && (
          <DataGrid
            className="dataGrid"
            rowHeight={80}
            autoHeight
            rows={[...farmsFlockData]}
            onCellClick={(params) => {
              navigate(`/farms/${farmId}/flocks/${params.row.id}`);
            }}
            columns={columns}
            disableColumnFilter
            disableSelectionOnClick
            disableColumnMenu
            disableColumnSelector
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 13]}
            pagination
            loading={isLoading}
            density="standard"
            sx={{
              "& renderCell-joiningDate MuiBox-root css-0:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#(207,207,207, 0.2)",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "18px",
                letterSpacing: "-0.011em",
                cursor: "default !important",
                color: "#6C6C6C",
                ":focus": {
                  outline: "white",
                },
              },
              "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
                width: "101px",
                height: "18px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "18px",
                letterSpacing: "-0.011em",
                color: "#6C6C6C",
                marginLeft: "20px",
                marginTop: "16px",
                marginBottom: "16px",
                marginRight: "16px",
              },
              "& .MuiDataGrid-virtualScrollerRenderZone": {
                "& .MuiDataGrid-row": {
                  backgroundColor: "white",
                  cursor: "pointer",
                },
              },
              "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within": {
                outline: "none",
              },
              "& .css-1lk0jn-MuiDataGrid-root .MuiDataGrid-columnSeparator--sideRight":
                {
                  opacity: 0,
                },
              "& .css-iibd7p-MuiDataGrid-root.MuiDataGrid-autoHeight": {
                border: "white",
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden",
                display: "none",
              },
              "& .MuiDataGrid-cell:hover": {
                color: "black",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#F5F5F5",
              },
              "& .MuiDataGrid-row.Mui-selected:hover, .css-vgcejw-MuiDataGrid-root .MuiDataGrid-row.Mui-selected.Mui-hovered":
                {
                  backgroundColor: "white",
                },
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus, .MuiDataGrid-root .MuiDataGrid-cell:focus-within":
                {
                  outline: "none",
                },
              "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .MuiDataGrid-root .MuiDataGrid-cell:focus":
                {
                  outline: "none",
                },
              "& .MuiTablePagination-root:last-child": {
                display: "block",
              },
            }}
          />
        )}
      </div>
      <FlockModal
        flockId={rowCellId}
        action={action}
        open={openModal}
        handleClose={handleModalClose}
      />
    </Box>
  );
}
export default Flock;
