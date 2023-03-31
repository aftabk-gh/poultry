import { useState, useEffect, createRef } from "react";
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
import { useFormik, FieldArray, FormikProvider } from "formik";
import { toast } from "react-toastify";
import crossIcon from "../../../../assets/svgs/cross.svg";
import submitIcon from "../../../../assets/svgs/Frame.svg";
import smallCrossIcon from "../../../../assets/svgs/smallcross.svg";
import uploadIcon from "../../../../assets/svgs/plus.svg";

import { timeOut, toastAPIError } from "@src/helpers/utils/utils";
import React from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  useFarmsFlocksCreateMutation,
  useFlocksUpdateMutation,
  useFlocksReadQuery,
} from "@src/store/api";

const FlockModal = ({ flockId, action, open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { farmId } = useParams();
  const [flockCreate, {}] = useFarmsFlocksCreateMutation();
  const [flockUpdate, {}] = useFlocksUpdateMutation();
  const { data: flockData } = useFlocksReadQuery(
    { id: flockId },
    { skip: !flockId }
  );
  const handleFlockCreate = async () => {
    setLoading(true);
    await flockCreate({
      farmId: parseInt(farmId),
      flock: { ...formik.values },
    })
      .unwrap()
      .then(async () => {
        toast.success("Flock created successfully.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        resetModal();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };
  const handleFlockEdit = async () => {
    setLoading(true);
    await flockUpdate({
      id: flockId,
      flock: {
        farm: farmId,
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Flock updated successfully.", {
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

  const populateEditableData = (flockData) => {
    formik.setValues({
      no: flockData?.no,
      input_date: flockData?.input_date,
      input_quantity: flockData?.input_quantity,
    });
  };
  const formik = useFormik({
    initialValues: {
      no: "",
      input_date: "",
      input_quantity: "",
    },
    validationSchema: Yup.object().shape({
      no: Yup.number()
        .typeError("Please enter a valid number")
        .required("This field is required")
        .positive("Please enter a positive number"),
      input_date: Yup.date().required("Required"),
      input_quantity: Yup.number()
        .typeError("Please enter a valid number")
        .required("This field is required")
        .positive("Please enter a positive number"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleFlockEdit();
      } else {
        handleFlockCreate();
      }
    },
  });
  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(flockData);
    }
  }, [action, flockData, flockId]);

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="departmentModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update a flock" : "Create a flock"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a flock"
                  : "Fill the following fields to add a flock"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetModal}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="departmentModal__Content">
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  label={"No"}
                  value={formik.values.no}
                  name="no"
                  type="number"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.no && formik.errors.no}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  label={"Input Quantity"}
                  value={formik.values.input_quantity}
                  name="input_quantity"
                  type="number"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.input_quantity &&
                    formik.errors.input_quantity}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <label htmlFor="input_date">Input Date</label>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  name="input_date"
                  fullWidth
                  type="date"
                  value={formik.values.input_date}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography className="errorText">
                  {formik.touched.input_date && formik.errors.input_date}
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
                    </span>
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

export default FlockModal;
