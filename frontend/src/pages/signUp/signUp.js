import { useContext, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appIcon from "@src/assets/svgs/sidebar.svg";
import { AuthContext } from "@src/components/hoc/AuthContext";
import { emailRegX, toastAPIError } from "@src/helpers/utils/utils";
import { useSignupCreateMutation } from "@src/store/api";
import HideIcon from "@src/assets/svgs/HideIcon.svg";
import showIcon from "@src/assets/svgs/Show.svg";
import "./signUp.scss";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const [signup, { isLoading }] = useSignupCreateMutation();

  return (
    <Box className="signup_container">
      <Typography className="bold-text lg-text">
        {"Poultry"} <span className="red-text">{"Managment"}</span>
      </Typography>
      <Typography mt={3} className="bold-text">
        {"Create an account 🚀"}
      </Typography>
      <Typography className="light-text" fontWeight={700} mt={1} mb={5}>
        {"Let’s get started and create your account."}
      </Typography>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          com_name: "",
          com_address: "",
          key_activity: "",
          password: "",
          re_password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.first_name) {
            errors.first_name = "First name is required";
          }
          if (!values.last_name) {
            errors.last_name = "Last name is required";
          }
          if (!values.email) {
            errors.email = "Email is required";
          } else if (!emailRegX.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.com_name) {
            errors.com_name = "Company name is required";
          }
          if (!values.com_address) {
            errors.com_address = "Company address is required";
          }
          if (!values.key_activity) {
            errors.key_activity = "Key activity is required";
          }
          if (!values.password) {
            errors.password = "Password is required";
          }
          if (!values.re_password) {
            errors.re_password = "Confirm Password is required";
          }
          if (values.re_password != values.password) {
            errors.re_password = "Passwords do not match";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let user_obj = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            company: {
              name: values.com_name,
              key_activity: values.key_activity,
              address: values.com_address,
            },
          };
          signup({
            signUp: user_obj,
          })
            .unwrap()
            .then(() => {
              resetForm();
              setSubmitting(false);
              toast.success("Signup successfully.");
              navigate("/login");
            })
            .catch((error) => {
              toastAPIError("Something went wrong.", error.status, error.data);
            });
        }}
      >
        {() => (
          <Form className="signupForm">
            <Field
              name="first_name"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.first_name && form.errors.first_name}
                  helperText={form.touched.first_name && form.errors.first_name}
                />
              )}
            />
            <Field
              name="last_name"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.last_name && form.errors.last_name}
                  helperText={form.touched.last_name && form.errors.last_name}
                />
              )}
            />
            <Field
              name="email"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.email && form.errors.email}
                  helperText={form.touched.email && form.errors.email}
                />
              )}
            />
            <Field
              name="com_name"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Company Name"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.com_name && form.errors.com_name}
                  helperText={form.touched.com_name && form.errors.com_name}
                />
              )}
            />
            <Field
              name="key_activity"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Company Key Activity"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.key_activity && form.errors.key_activity}
                  helperText={
                    form.touched.key_activity && form.errors.key_activity
                  }
                />
              )}
            />
            <Field
              name="com_address"
              render={({ field, form }) => (
                <TextField
                  {...field}
                  label="Company Address"
                  variant="outlined"
                  margin="normal"
                  error={form.touched.com_address && form.errors.com_address}
                  helperText={
                    form.touched.com_address && form.errors.com_address
                  }
                />
              )}
            />
            <Field
              name="password"
              type="password"
              render={({ field, form }) => {
                const [showPassword, setShowPassword] = useState(false);
                return (
                  <TextField
                    {...field}
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    error={form.touched.password && form.errors.password}
                    helperText={form.touched.password && form.errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <img
                              className="eye"
                              src={showPassword ? showIcon : HideIcon}
                              alt="eye"
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    type={showPassword ? "text" : "password"}
                  />
                );
              }}
            />
            <Field
              name="re_password"
              type="re_password"
              render={({ field, form }) => {
                const [showPassword, setShowPassword] = useState(false);
                return (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    error={form.touched.re_password && form.errors.re_password}
                    helperText={
                      form.touched.re_password && form.errors.re_password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <img
                              className="eye"
                              src={showPassword ? showIcon : HideIcon}
                              alt="eye"
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    type={showPassword ? "text" : "password"}
                  />
                );
              }}
            />
            <Stack alignItems="center" mt={3}>
              <LoadingButton
                type="submit"
                className="btn"
                loading={isLoading}
                sx={{ m: "0px" }}
                endIcon={<ArrowForwardIcon />}
                loadingIndicator={
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                    size={16}
                  />
                }
              >
                {"Create an account"}
              </LoadingButton>
              <Typography mt={5}>
                {"Alreday have an account? "}
                <span
                  onClick={() => navigate("/login")}
                  className="red-text pointer"
                >
                  {"Login"}
                </span>
              </Typography>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Signup;
