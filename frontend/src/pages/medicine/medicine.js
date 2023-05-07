import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Box, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FarmExpenseModal from "../../components/shared/popups/farmsExpenseModal/farmExpenseModal";
import { useNavigate, useParams } from "react-router-dom";
import ShowIcon from "@src/assets/svgs/ShowIcon.svg";
import DeleteIcon from "@src/assets/svgs/DeleteIcon.svg";
import AddIcon from "@mui/icons-material/Add";
import CallMadeIcon from "@mui/icons-material/CallMade";
import MedicineModal from "@src/components/shared/popups/medicineModal/medicineModal";
import MedicineMoveModal from "@src/components/shared/popups/medicineMoveModal/medicineMoveModal";
import DeleteModal from "@src/components/shared/popups/deleteModal/deleteModal";
import {
  useFarmsMedicineListQuery,
  useMedicineDeleteMutation,
} from "@src/store/api";
import { timeOut, toastAPIError } from "@src/helpers/utils/utils";
import { toast } from "react-toastify";

const Medicine = () => {
  const [action, setAction] = useState("add");
  const [rowCellId, setRowCellId] = useState();
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [deleteMedicine] = useMedicineDeleteMutation();
  const [openMoveModal, setOpenMoveModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const { data: rows = [], isLoading } = useFarmsMedicineListQuery({
    farmId: params?.farmId,
  });
  const [medicineData, setMedicineData] = useState([]);
  const [dataLoading, setIsDataLoading] = useState(true);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleMoveModalOpen = (id) => {
    setOpenMoveModal(true);
  };

  const handleModalClose = () => {
    setRowCellId(undefined);
    setAction("add");
    setOpenModal(false);
  };
  const handleMoveModalClose = () => {
    setRowCellId(undefined);
    setOpenMoveModal(false);
  };

  const handleMedicineDelete = async () => {
    await deleteMedicine({
      id: rowCellId,
    })
      .unwrap()
      .then(async () => {
        toast.success("Medicine deleted successfully", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        handleDeleteModalClose();
      })
      .catch((error) => {
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  const handleEditModalOpen = (event, cellId) => {
    event.stopPropagation();
    setAction("edit");
    setRowCellId(cellId);
    setOpenModal(true);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteModalOpen = (event, cellId) => {
    event.stopPropagation();
    setRowCellId(cellId);
    setOpenDeleteModal(true);
  };
  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   sortable: false,
    //   width: 100,
    //   renderCell: (cellValues) => {
    //     return (
    //       <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
    //         {cellValues.row.id}
    //       </p>
    //     );
    //   },
    // },
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.name}
          </p>
        );
      },
    },
    {
      field: "packing",
      headerName: "Packing",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.packing}
          </p>
        );
      },
    },
    {
      field: "opening",
      headerName: "Opening",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.opening}
          </p>
        );
      },
    },
    {
      field: "recieving",
      headerName: "Recieving",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.recieving}
          </p>
        );
      },
    },
    {
      field: "total",
      headerName: "Total",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.total}
          </p>
        );
      },
    },
    {
      field: "qty_used",
      headerName: "Quantity Used",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.qty_used}
          </p>
        );
      },
    },
    {
      field: "rate",
      headerName: "Rate",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.rate}
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
      field: "closing_stock",
      headerName: "Closing Stock",
      sortable: false,
      width: 150,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.closing_stock}
          </p>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <p style={{ marginLeft: "20px", textTransform: "capitalize" }}>
            {cellValues.row.description}
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
            <IconButton
              onClick={(event) => handleMoveModalOpen(event, cellValues.row.id)}
              aria-label="delete"
              id="delete-btn-id"
              className="delete-btn"
            >
              <CallMadeIcon
                className="profile-pic"
                style={{
                  color: "black",
                  fontSize: 18,
                }}
              />
            </IconButton>
            <IconButton
              onClick={(event) =>
                handleDeleteModalOpen(event, cellValues.row.id)
              }
              aria-label="delete"
              id="delete-btn-id"
              className="delete-btn"
            >
              <img className="profile-pic" src={DeleteIcon} alt="deleteIcon" />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    if (!isLoading) {
      if (rows.length) {
        setMedicineData(rows);
      } else {
        setMedicineData([]);
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
        <Typography className="title-cls">{"Medicine"}</Typography>
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
            rows={[...medicineData]}
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
      <MedicineModal
        medicineId={rowCellId}
        action={action}
        open={openModal}
        handleClose={handleModalClose}
      />
      <MedicineMoveModal
        medicineId={rowCellId}
        open={openMoveModal}
        handleClose={handleMoveModalClose}
      />
      <DeleteModal
        open={openDeleteModal}
        handleObjDelete={handleMedicineDelete}
        handleClose={handleDeleteModalClose}
      />
    </Box>
  );
};

export default Medicine;
