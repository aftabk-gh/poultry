import { createTheme } from "@mui/material/styles";

const GLOBAL_RED = "#FF2F2F";
const GLOBAL_LIGHT_RED = "#ffcdcd3b";
const GLOBAL_BLACK = "#000000";
const GLOBAL_WHITE = "#FFFFFF";
const GLOBAL_GRAY = "#6C6C6C";
const GLOBAL_GRAY_LIGHT = "#AAAAAA";
// const GLOBAL_GRAY_CONTRAST = "#BEBEBE";

const baseTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: GLOBAL_RED,
      light: GLOBAL_LIGHT_RED,
      dark: GLOBAL_BLACK,
      contrastText: GLOBAL_WHITE,
    },
    secondary: {
      main: GLOBAL_BLACK,
      light: GLOBAL_GRAY,
      contrastText: GLOBAL_GRAY_LIGHT,
    },
    // /********* comment for future use ********/
    // warning: {
    //   main: GLOBAL_RED,
    //   light: GLOBAL_LIGHT_RED,
    // },
    // info: {
    //   main: GLOBAL_RED,
    //   light: GLOBAL_LIGHT_RED,
    // },
    // error: {
    //   main: GLOBAL_RED,
    //   light: GLOBAL_LIGHT_RED,
    // },
    // success: {
    //   main: GLOBAL_RED,
    //   light: GLOBAL_LIGHT_RED,
    // },
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
    fontSize: 14,
    h1: {
      fontFamily: "",
      fontSize: 32,
      fontWeight: 900,
    },
    h2: {
      fontFamily: "",
      fontSize: 26,
      fontWeight: 700,
    },
    h3: {
      fontFamily: "",
      fontSize: 22,
      fontWeight: 700,
    },
    h4: {
      fontSize: 18,
      fontWeight: 700,
      color: GLOBAL_BLACK,
    },
    h5: {
      fontFamily: "",
      fontSize: 14,
      fontWeight: 700,
    },
    h6: {
      fontFamily: "",
      fontSize: 12,
      fontWeight: 700,
    },
    // subtitle1: {},
    // subtitle2: {},
    // body1: {},
    body2: {
      fontSize: "0.75rem",
      fontFamily: "",
    },
    button: {
      fontFamily: "",
      fontSize: "16px",
      fontWeight: 400,
      color: GLOBAL_WHITE,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: GLOBAL_GRAY,
          backgroundColor: "#e4e3e3",
          fontWeight: "600",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: () => ({
          "&:hover": {
            opacity: 0.8,
            // backgroundColor: GLOBAL_RED,
          },
        }),
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
  },
});

export default baseTheme;
