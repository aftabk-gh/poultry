import { useState } from "react";
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
  MenuItem,
  InputLabel,
  Select,
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
import { useMedicineMoveMutation, useFarmsListQuery } from "@src/store/api";

const MedicineMoveModal = ({ open, handleClose, medicineId }) => {
  const [loading, setLoading] = useState(false);
  const { farmId } = useParams();
  const [medicineMove] = useMedicineMoveMutation();
  const { data: farmsData = [] } = useFarmsListQuery();

  const handleMedicineMove = async () => {
    setLoading(true);
    await medicineMove({
      id: medicineId,
      medicineMove: {
        farm: formik.values.farm,
        quantity: formik.values.quantity,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Medicine moved successfully.", {
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

  const formik = useFormik({
    initialValues: {
      farm: "",
      quantity: null || undefined,
    },
    validationSchema: Yup.object().shape({
      farm: Yup.string().required("Required"),
      quantity: Yup.string().required("Required"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      handleMedicineMove();
    },
  });
  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="departmentModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {"Move a medicine"}
              </Typography>
              <Typography className="subheading-text">
                {"Fill the following fields to move a medicine"}
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
                  <InputLabel>Farm</InputLabel>
                  {farmId && (
                    <Select
                      label="Farm"
                      name={`farm`}
                      value={formik.values.farm}
                      onChange={formik.handleChange}
                      fullWidth
                    >
                      {farmsData
                        ?.filter((item) => item.id !== parseInt(farmId))
                        .map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                  <Typography className="errorText">
                    {formik.touched.site && formik.errors.site}
                  </Typography>
                </FormControl>
              </Grid>
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

export default MedicineMoveModal;
