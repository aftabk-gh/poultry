import React, { useEffect, useState } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFlocksSaleListQuery } from "@src/store/api";
import ShowIcon from "@src/assets/svgs/ShowIcon.svg";
import AddIcon from "@mui/icons-material/Add";
import SaleModal from "@src/components/shared/popups/saleModal/saleModal";
import { useParams } from "react-router-dom";

const Sale = () => {
  const [action, setAction] = useState("add");
  const { id } = useParams();
  const [rowCellId, setRowCellId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const { data: rows = [], isLoading } = useFlocksSaleListQuery(
    {
      flockId: id,
    },
    {
      skip: !id,
    }
  );
  const [saleData, setSaleData] = useState([]);
  const [dataLoading, setIsDataLoading] = useState(true);

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
  const columns = [
    {
      field: "id",
      headerName: "ID",
      sortable: false,
      width: 100,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.id}
          </p>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.date}
          </p>
        );
      },
    },
    {
      field: "dealer",
      headerName: "Dealer",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.dealer}
          </p>
        );
      },
    },
    {
      field: "vehicle_no",
      headerName: "Vehicle No",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.vehicle_no}
          </p>
        );
      },
    },
    {
      field: "f_rate",
      headerName: "F Rate",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.f_rate}
          </p>
        );
      },
    },
    {
      field: "weight",
      headerName: "Weight",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.weight}
          </p>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.amount}
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
              <img className="profile-pic" src={ShowIcon} alt="editIcon" />
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
        setSaleData(rows);
      } else {
        setSaleData([]);
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
        <Typography className="title-cls">{"Sale"}</Typography>
        <Box
          className="filter-section"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <SearchBox text="Search farms here" />
          <Box className="filter-btn-cls">
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
            onClick={handleModalOpen}
            startIcon={<AddIcon />}
          >
            <p id="create-btn-text">{"Add "}</p>
          </Button>
        </Box>
      </Box>
      <div className="dataGridTable-main">
        {!dataLoading && (
          <DataGrid
            className="dataGrid"
            rowHeight={80}
            autoHeight
            rows={[...saleData]}
            columns={columns}
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            loading={isLoading}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 13]}
            pagination
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
      <SaleModal
        saleId={rowCellId}
        action={action}
        open={openModal}
        handleClose={handleModalClose}
      />
    </Box>
  );
};

export default Sale;
