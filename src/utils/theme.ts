// src/theme.js
import { blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFF4D0",
    },
    secondary: {
      main: "#FF4081",
    },
  },
});

export { lightTheme, darkTheme };
