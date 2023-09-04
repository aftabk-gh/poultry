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
  useFarmsMedicinesCreateMutation,
  useMedicineUpdateMutation,
  useMedicineReadQuery,
} from "@src/store/api";

const MedicineModal = ({ medicineId, action, open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { farmId } = useParams();
  const [medicineCreate] = useFarmsMedicinesCreateMutation();
  const [medicineUpdate] = useMedicineUpdateMutation();
  const { data: medicineData } = useMedicineReadQuery(
    { id: medicineId },
    { skip: !medicineId },
  );

  const handleMedicineCreate = async () => {
    setLoading(true);
    await medicineCreate({
      farmId,
      medicine: {
        farm: farmId,
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Medicine added successfully.", {
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
      farmId,
      id: medicineId,
      medicine: {
        farm: farmId,
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Medicine updated successfully.", {
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
      name: medicineData?.name,
      packing: medicineData?.packing,
      opening: medicineData?.opening,
      description: medicineData?.description,
      recieving: medicineData?.recieving,
      rate: medicineData?.rate,
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      packing: "",
      description: "",
      opening: null || undefined,
      recieving: null || undefined,
      rate: null || undefined,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      packing: Yup.string().required("Required"),
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
                {action == "edit" ? "Update a medicine" : "Add a medicine"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a medicine"
                  : "Fill the following fields to add a medicine"}
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
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  label={"Name"}
                  value={formik.values.name}
                  name="name"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.name && formik.errors.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  label={"Packing"}
                  value={formik.values.packing}
                  name="packing"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.packing && formik.errors.packing}
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
                  label={"Opening"}
                  value={formik.values.opening || ""}
                  name="opening"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.opening && formik.errors.opening}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  type="number"
                  label={"Recieving"}
                  value={formik.values.recieving || ""}
                  name="recieving"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.recieving && formik.errors.recieving}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  multiline
                  label={"Description"}
                  value={formik.values.description}
                  name="description"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.description && formik.errors.description}
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
                  label={"Rate"}
                  value={formik.values.rate || ""}
                  name="rate"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.rate && formik.errors.rate}
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

export default MedicineModal;
