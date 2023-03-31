import React, { Suspense, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AppRoutes from "./components/hoc/AppRoutes";
import { AuthProvider } from "@src/components/hoc/AuthContext";
import baseTheme from "./theme/theme";
import "react-toastify/dist/ReactToastify.css";

const loading = <span>Loading....</span>;

const App = () => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
  }, []);
  return (
    <>
      <ToastContainer />
      <Suspense fallback={loading}>
        <ThemeProvider theme={baseTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </Suspense>
    </>
  );
};
export default App;
