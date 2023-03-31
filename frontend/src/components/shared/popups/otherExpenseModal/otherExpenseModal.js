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
  useFlocksOtherExpenseCreateMutation,
  useFlocksOtherExpenseUpdateMutation,
  useFlocksOtherExpenseReadQuery,
} from "@src/store/api";

const OtherExpenseModal = ({ otherExpenseId, action, open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { id: flockId } = useParams();
  const [otherExpenseCreate, {}] = useFlocksOtherExpenseCreateMutation();
  const [otherExpenseUpdate, {}] = useFlocksOtherExpenseUpdateMutation();
  const { data: otherExpenseData } = useFlocksOtherExpenseReadQuery(
    { id: otherExpenseId, flockId },
    { skip: !otherExpenseId }
  );

  const handleOtherExpenseCreate = async () => {
    setLoading(true);
    await otherExpenseCreate({
      flockId,
      otherExpense: {
        flock: flockId,
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Other expense created successfully.", {
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
  const handleOtherExpenseEdit = async () => {
    setLoading(true);
    await otherExpenseUpdate({
      flockId: flockId,
      id: otherExpenseId,
      otherExpense: {
        flock: flockId,
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Other expense updated successfully.", {
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

  const populateEditableData = (otherExpenseData) => {
    formik.setValues({
      title: otherExpenseData?.title,
      value: otherExpenseData?.value,
    });
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      value: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Required"),
      value: Yup.number()
        .typeError("Please enter a valid number")
        .required("This field is required")
        .positive("Please enter a positive number"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleOtherExpenseEdit();
      } else {
        handleOtherExpenseCreate();
      }
    },
  });
  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(otherExpenseData);
    }
  }, [action, otherExpenseData, otherExpenseId]);

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="departmentModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update an expense" : "Create an expense"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update an expense"
                  : "Fill the following fields to add an expense"}
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
                  name="title"
                  fullWidth
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  InputLabelProps={{ className: "textfield_label" }}
                />
                <Typography className="errorText">
                  {formik.touched.title && formik.errors.title}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  value={formik.values.value}
                  name="value"
                  label="Value"
                  onChange={formik.handleChange}
                  InputLabelProps={{ className: "textfield_label" }}
                />
                <Typography className="errorText">
                  {formik.touched.value && formik.errors.value}
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

export default OtherExpenseModal;
