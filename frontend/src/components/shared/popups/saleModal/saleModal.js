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
import React from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  useFlocksSaleCreateMutation,
  useFlocksSaleUpdateMutation,
  useFlocksSaleReadQuery,
} from "@src/store/api";

const SaleModal = ({ saleId, action, open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { id: flockId } = useParams();
  const [saleCreate] = useFlocksSaleCreateMutation();
  const [saleUpdate] = useFlocksSaleUpdateMutation();
  const { data: saleData } = useFlocksSaleReadQuery(
    { id: saleId, flockId },
    { skip: !saleId },
  );

  const handleSaleCreate = async () => {
    setLoading(true);
    await saleCreate({
      flockId,
      sale: {
        flock: flockId,
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Sale added successfully.", {
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
  const handleSaleEdit = async () => {
    setLoading(true);
    await saleUpdate({
      flockId,
      id: saleId,
      sale: {
        flock: flockId,
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Sale updated successfully.", {
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

  const populateEditableData = (saleData) => {
    formik.setValues({
      date: saleData?.date,
      dealer: saleData?.dealer,
      vehicle_no: saleData?.vehicle_no,
      f_rate: saleData?.f_rate,
      weight: saleData?.weight,
    });
  };
  const formik = useFormik({
    initialValues: {
      date: "",
      dealer: "",
      vehicle_no: "",
      f_rate: "",
      weight: "",
    },
    validationSchema: Yup.object().shape({
      date: Yup.date().required("Required"),
      dealer: Yup.string(),
      vehicle_no: Yup.string().required("Required"),
      f_rate: Yup.string().required("Required"),
      weight: Yup.string().required("Required"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleSaleEdit();
      } else {
        handleSaleCreate();
      }
    },
  });
  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(saleData);
    }
  }, [action, saleData, saleId]);

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="departmentModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update a sale" : "Add a sale"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a sale"
                  : "Fill the following fields to add a sale"}
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
                  type="date"
                  value={formik.values.date}
                  name="date"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.date && formik.errors.date}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  label={"Dealer"}
                  value={formik.values.dealer}
                  name="dealer"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.dealer && formik.errors.dealer}
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
                  label={"Vehicle No"}
                  value={formik.values.vehicle_no || ""}
                  name="vehicle_no"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.vehicle_no && formik.errors.vehicle_no}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  type="number"
                  label={"F Rate"}
                  value={formik.values.f_rate || ""}
                  name="f_rate"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.f_rate && formik.errors.f_rate}
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
                  label={"Weight"}
                  value={formik.values.weight || ""}
                  name="weight"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.weight && formik.errors.weight}
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

export default SaleModal;
