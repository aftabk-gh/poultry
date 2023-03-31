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

import { intRegex, timeOut, toastAPIError } from "@src/helpers/utils/utils";
import "./medicineModal.scss";
import React from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  useFlocksMedicneCreateMutation,
  useFlocksMedicneUpdateMutation,
  useFlocksMedicneReadQuery,
} from "@src/store/api";

const MedicineModal = ({ medicineId, action, open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { id: flockId } = useParams();
  const [medicineCreate, {}] = useFlocksMedicneCreateMutation();
  const [medicineUpdate, {}] = useFlocksMedicneUpdateMutation();
  const { data: medicineData } = useFlocksMedicneReadQuery(
    { id: medicineId, flockId },
    { skip: !medicineId }
  );

  const handleMedicineCreate = async () => {
    setLoading(true);
    await medicineCreate({
      flockId,
      medicine: {
        flock: flockId,
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
      flockId,
      id: medicineId,
      medicine: {
        flock: flockId,
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
      recieving: medicineData?.recieving,
      usage: medicineData?.usage,
      rate: medicineData?.rate,
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      packing: "",
      opening: null || undefined,
      recieving: null || undefined,
      usage: [{ date: "", qty: "" }],
      rate: null || undefined,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      packing: Yup.string().required("Required"),
      usage: Yup.array().of(
        Yup.object().shape({
          date: Yup.date().required("Required"),
          qty: Yup.string().required("Required"),
        })
      ),
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
            {/* <Typography>{"Usage"}</Typography> */}
            <FormikProvider value={formik}>
              <FieldArray
                name="usage"
                render={({ remove, push }) => (
                  <div>
                    {formik.values.usage?.map((_, index) => (
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <div key={index}>
                            <TextField
                              margin="normal"
                              className="text-field-cls"
                              fullWidth
                              type="date"
                              value={formik.values.usage[index]?.date}
                              name={`usage[${index}].date`}
                              onChange={formik.handleChange}
                              InputLabelProps={{
                                className: "textfield_label",
                              }}
                            />
                            <Typography className="errorText">
                              {formik.touched.usage &&
                                formik.errors.usage &&
                                formik.errors.usage[index]?.date}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div key={index}>
                            <TextField
                              margin="normal"
                              className="text-field-cls"
                              fullWidth
                              label={"Quantity"}
                              type="number"
                              value={formik.values.usage[index]?.qty}
                              name={`usage[${index}].qty`}
                              onChange={formik.handleChange}
                              InputLabelProps={{
                                className: "textfield_label",
                              }}
                            />
                            <Typography className="errorText">
                              {formik.touched.usage &&
                                formik.errors.usage &&
                                formik.errors.usage[index]?.qty}
                            </Typography>
                          </div>
                        </Grid>
                        <Box
                          className="cross-icon"
                          onClick={() => remove(index)}
                        >
                          <img src={smallCrossIcon} className="cross-btn" />
                        </Box>
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
            <Grid container spacing={1} marginTop={1}>
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
              {/* <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  label={"Recieving"}
                  value={formik.values.recieving}
                  name="opening"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.recieving && formik.errors.recieving}
                </Typography>
              </Grid> */}
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
