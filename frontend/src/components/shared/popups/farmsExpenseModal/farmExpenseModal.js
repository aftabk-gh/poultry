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
import "./farmExpenseModal.scss";
import React from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  useFlocksFarmExpenseCreateMutation,
  useFlocksFarmExpenseUpdateMutation,
  useFlocksFarmExpenseReadQuery,
} from "@src/store/api";

const FarmExpenseModal = ({ farmExpenseId, action, open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { id: flockId } = useParams();
  const [farmExpenseCreate, {}] = useFlocksFarmExpenseCreateMutation();
  const [farmExpenseUpdate, {}] = useFlocksFarmExpenseUpdateMutation();
  const { data: farmExpenseData } = useFlocksFarmExpenseReadQuery(
    { id: farmExpenseId, flockId },
    { skip: !farmExpenseId }
  );

  const handleFarmExpenseCreate = async () => {
    setLoading(true);
    await farmExpenseCreate({
      flockId,
      expense: {
        flock: flockId,
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Farm expense created successfully.", {
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
  const handleFarmExpenseEdit = async () => {
    setLoading(true);
    await farmExpenseUpdate({
      flockId,
      id: farmExpenseId,
      expense: {
        flock: flockId,
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Farm expense updated successfully.", {
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

  const populateEditableData = (farmExpenseData) => {
    formik.setValues({
      from_date: farmExpenseData?.from_date,
      to_date: farmExpenseData?.to_date,
      items: farmExpenseData?.items,
    });
  };
  const formik = useFormik({
    initialValues: {
      from_date: "",
      to_date: "",
      items: [{ title: "", value: "" }],
    },
    validationSchema: Yup.object().shape({
      from_date: Yup.date().required("Required"),
      to_date: Yup.date()
        .required("Required")
        .min(Yup.ref("from_date"), "To Date must be after From Date"),
      items: Yup.array()
        .of(
          Yup.object().shape({
            title: Yup.string().required("Required"),
            value: Yup.number()
              .typeError("Please enter a valid number")
              .required("This field is required")
              .positive("Please enter a positive number"),
          })
        )
        .required("Required")
        .min(1, "Minimum 1 entry is required"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleFarmExpenseEdit();
      } else {
        handleFarmExpenseCreate();
      }
    },
  });
  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(farmExpenseData);
    }
  }, [action, farmExpenseData, farmExpenseId]);

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
                <label htmlFor="from_date">From Date</label>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  name="from_date"
                  fullWidth
                  type="date"
                  value={formik.values.from_date}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography className="errorText">
                  {formik.touched.from_date && formik.errors.from_date}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="to_date">To Date</label>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  value={formik.values.to_date}
                  name="to_date"
                  type="date"
                  onChange={formik.handleChange}
                  InputLabelProps={{ className: "textfield_label" }}
                />
                <Typography className="errorText">
                  {formik.touched.to_date && formik.errors.to_date}
                </Typography>
              </Grid>
            </Grid>
            <FormikProvider value={formik}>
              <FieldArray
                name="items"
                render={({ remove, push }) => (
                  <div>
                    {formik.values.items?.map((_, index) => (
                      <Grid container spacing={1} marginTop={1}>
                        <Grid item xs={6}>
                          <div key={index}>
                            <TextField
                              margin="normal"
                              className="text-field-cls"
                              fullWidth
                              label={"Title"}
                              value={formik.values.items[index]?.title}
                              name={`items[${index}].title`}
                              onChange={formik.handleChange}
                              InputLabelProps={{
                                className: "textfield_label",
                              }}
                            />
                            <Typography className="errorText">
                              {formik.touched.items &&
                                formik.errors.items &&
                                formik.errors.items[index]?.title}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div key={index}>
                            <TextField
                              margin="normal"
                              className="text-field-cls"
                              fullWidth
                              label={"Value"}
                              value={formik.values.items[index]?.value}
                              name={`items[${index}].value`}
                              onChange={formik.handleChange}
                              InputLabelProps={{
                                className: "textfield_label",
                              }}
                            />
                            <Typography className="errorText">
                              {formik.touched.items &&
                                formik.errors.items &&
                                formik.errors.items[index]?.value}
                            </Typography>
                          </div>
                        </Grid>
                        {formik.values.items.length > 1 && (
                          <Box
                            className="cross-icon"
                            onClick={() => remove(index)}
                          >
                            <img src={smallCrossIcon} className="cross-btn" />
                          </Box>
                        )}
                      </Grid>
                    ))}
                    <Box className="add-new-sec">
                      <Button className="upload-btn" onClick={() => push("")}>
                        <span>
                          <img className="upload-img" src={uploadIcon} />
                        </span>
                        {"Add new "}
                      </Button>
                    </Box>
                  </div>
                )}
              />
            </FormikProvider>
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

export default FarmExpenseModal;
