import React, { useState, useEffect } from "react";
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
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import crossIcon from "../../../../assets/svgs/cross.svg";
import submitIcon from "../../../../assets/svgs/Frame.svg";

import { timeOut, toastAPIError } from "@src/helpers/utils/utils";
import * as Yup from "yup";
import {
  useFarmsCreateMutation,
  useFarmsUpdateMutation,
  useFarmsReadQuery,
} from "@src/store/api";

const FarmModal = ({ farmId, action, open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [farmCreate] = useFarmsCreateMutation();
  const [farmUpdate] = useFarmsUpdateMutation();
  const { data: farmData } = useFarmsReadQuery(
    { id: farmId },
    { skip: !farmId },
  );

  const handleFarmCreate = async () => {
    setLoading(true);
    await farmCreate({
      farm: { ...formik.values },
    })
      .unwrap()
      .then(async () => {
        toast.success("Farm created successfully.", {
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
  const handleFarmEdit = async () => {
    setLoading(true);
    await farmUpdate({
      id: farmId,
      farm: {
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Farm updated successfully.", {
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

  const categories = [
    { name: "Laying of breed", value: "laying_breeds" },
    { name: "Meat Production", value: "meat_production" },
    { name: "Dual Process", value: "dual_purpose" },
  ];

  const populateEditableData = (farmData) => {
    formik.setValues({
      name: farmData?.name,
      category: farmData?.category,
      no_of_employees: farmData?.no_of_employees,
      no_of_sheds: farmData?.no_of_sheds,
      address: farmData?.address,
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      no_of_employees: "",
      no_of_sheds: "",
      address: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      category: Yup.string().required(),
      no_of_employees: Yup.number()
        .typeError("Please enter a valid number")
        .required("This field is required")
        .positive("Please enter a positive number"),
      no_of_sheds: Yup.number()
        .typeError("Please enter a valid number")
        .required("This field is required")
        .positive("Please enter a positive number"),
      address: Yup.string().required(),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleFarmEdit();
      } else {
        handleFarmCreate();
      }
    },
  });
  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(farmData);
    }
  }, [action, farmData, farmId]);

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="departmentModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update a farm" : "Create a farm"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a farm"
                  : "Fill the following fields to add a farm"}
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
                  required
                  select
                  fullWidth
                  label={"Category"}
                  name="category"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  InputLabelProps={{ className: "textfield_label" }}
                >
                  {categories.map((item) => {
                    return (
                      <MenuItem
                        className="menu-item-cls"
                        value={item.value}
                        key={item.value}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
                <Typography className="errorText">
                  {formik.touched.category && formik.errors.category}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  label={"No Of Employees"}
                  value={formik.values.no_of_employees}
                  name="no_of_employees"
                  type="number"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.no_of_employees &&
                    formik.errors.no_of_employees}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  label={"No Of Sheds"}
                  value={formik.values.no_of_sheds}
                  name="no_of_sheds"
                  type="number"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.no_of_sheds && formik.errors.no_of_sheds}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  name="address"
                  label="Address"
                  multiline
                  fullWidth
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography className="errorText">
                  {formik.touched.address && formik.errors.address}
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

export default FarmModal;
