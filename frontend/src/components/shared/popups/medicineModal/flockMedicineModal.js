import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import crossIcon from "../../../../assets/svgs/cross.svg";
import submitIcon from "../../../../assets/svgs/Frame.svg";
import { timeOut, toastAPIError } from "@src/helpers/utils/utils";
import "./medicineModal.scss";
import React from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  useFlocksMedicinesCreateMutation,
  useMedicineUsageUpdateMutation,
  useMedicineUsageReadQuery,
  useFarmsMedicinesListQuery,
} from "@src/store/api";

const FlockMedicineModal = ({ medicineId, action, open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { id, farmId } = useParams();
  const [medicineCreate] = useFlocksMedicinesCreateMutation();
  const [medicineUpdate] = useMedicineUsageUpdateMutation();
  const { data: medicines, isLoading } = useFarmsMedicinesListQuery(
    {
      farmId: farmId,
    },
    {
      skip: !farmId,
    },
  );
  const { data: medicineData } = useMedicineUsageReadQuery(
    { id: medicineId },
    { skip: !medicineId },
  );

  const handleMedicineCreate = async () => {
    setLoading(true);
    await medicineCreate({
      flockId: id,
      medicineUsage: {
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Medicine usage added successfully.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        resetModal();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };
  const handleMedicineEdit = async () => {
    setLoading(true);
    await medicineUpdate({
      id: medicineId,
      medicineUsage: {
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Medicine usage updated successfully.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        resetModal();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  const populateEditableData = (medicineData) => {
    formik.setValues({
      medicine: medicineData?.medicine.id,
      date: medicineData?.date,
      quantity: medicineData?.quantity,
    });
  };
  const formik = useFormik({
    initialValues: {
      medicine: "",
      date: "",
      quantity: null || undefined,
    },
    validationSchema: Yup.object().shape({
      medicine: Yup.string().required("Required"),
      date: Yup.string().required("Required"),
      quantity: Yup.string().required("Required"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleMedicineEdit();
      } else {
        handleMedicineCreate();
      }
    },
  });
  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(medicineData);
    }
  }, [action, medicineData, medicineId]);

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="departmentModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit"
                  ? "Update a medicine usage"
                  : "Add a medicine usage"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a medicine usage"
                  : "Fill the following fields to add a medicine usage"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetModal}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="departmentModal__Content">
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Medicine</InputLabel>
                  {!isLoading && (
                    <Select
                      label="Medicine"
                      name={`medicine`}
                      value={formik.values.medicine}
                      onChange={formik.handleChange}
                      fullWidth
                    >
                      {medicines?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  <Typography className="errorText">
                    {formik.touched.medicine && formik.errors.medicine}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  value={formik.values.date}
                  name="date"
                  type="date"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.date && formik.errors.date}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  type="number"
                  label={"Quantity"}
                  value={formik.values.quantity || ""}
                  name="quantity"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.quantity && formik.errors.quantity}
                </Typography>
              </Grid>
            </Grid>
            <DialogActions className="departmentModal__Actions">
              <Button className="resetBtn" onClick={resetModal}>
                {"Cancel"}
              </Button>
              <LoadingButton
                className="submitBtn"
                loading={loading}
                type="submit"
              >
                {!loading && (
                  <span style={{ display: "flex" }}>
                    {"Save"}
                    <span>
                      {" "}
                      <img
                        className="submit-img"
                        src={submitIcon}
                        alt="submit"
                      />
                    </span>{" "}
                  </span>
                )}
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FlockMedicineModal;
