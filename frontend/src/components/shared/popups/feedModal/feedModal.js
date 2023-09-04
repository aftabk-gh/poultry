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
  useFarmsFeedCreateMutation,
  useFeedUpdateMutation,
  useFeedReadQuery,
} from "@src/store/api";

const FeedModal = ({ feedId, action, open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { farmId } = useParams();
  const [feedCreate] = useFarmsFeedCreateMutation();
  const [feedUpdate] = useFeedUpdateMutation();
  const { data: feedData } = useFeedReadQuery(
    { id: feedId },
    { skip: !feedId },
  );

  const handleFeedCreate = async () => {
    setLoading(true);
    await feedCreate({
      farmId,
      feed: {
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Feed added successfully.", {
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
  const handleFeedEdit = async () => {
    setLoading(true);
    await feedUpdate({
      id: feedId,
      feed: {
        ...formik.values,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Feed updated successfully.", {
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

  const populateEditableData = (feedData) => {
    formik.setValues({
      date: feedData?.date,
      feed_type: feedData?.feed_type,
      bags: feedData?.bags,
      rate: feedData?.rate,
      discount: feedData?.discount,
      cr: feedData?.cr,
      comments: feedData?.comments,
    });
  };
  const formik = useFormik({
    initialValues: {
      date: "",
      feed_type: "",
      bags: "",
      rate: "",
      discount: "",
      cr: null || undefined,
      comments: "",
    },
    validationSchema: Yup.object().shape({
      date: Yup.date().required("Required"),
      feed_type: Yup.string().required("Required"),
      bags: Yup.string().required("Required"),
      rate: Yup.string().required("Required"),
      discount: Yup.string().required("Required"),
      comments: Yup.string(),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleFeedEdit();
      } else {
        handleFeedCreate();
      }
    },
  });
  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(feedData);
    }
  }, [action, feedData, feedId]);

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="departmentModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update a feed" : "Add a feed"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a feed"
                  : "Fill the following fields to add a feed"}
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
                  label={"Feed Type"}
                  value={formik.values.feed_type}
                  name="feed_type"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.feed_type && formik.errors.feed_type}
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
                  label={"Bags"}
                  value={formik.values.bags || ""}
                  name="bags"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.bags && formik.errors.bags}
                </Typography>
              </Grid>
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
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  type="number"
                  label={"Discount"}
                  value={formik.values.discount || ""}
                  name="discount"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.discount && formik.errors.discount}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  label={"Cr"}
                  value={formik.values.cr || ""}
                  name="cr"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.cr && formik.errors.cr}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} marginTop={1}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  className="text-field-cls"
                  fullWidth
                  multiline
                  label={"Comments"}
                  value={formik.values.comments || ""}
                  name="comments"
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    className: "textfield_label",
                  }}
                />
                <Typography className="errorText">
                  {formik.touched.comments && formik.errors.comments}
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

export default FeedModal;
