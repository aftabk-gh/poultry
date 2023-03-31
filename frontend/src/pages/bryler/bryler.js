import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "./bryler.scss";

const Bryler = () => {
  return (
    <Box sx={{ mt: "25px" }}>
      <Typography mb={5} variant="h2">
        {"Bryler"}
      </Typography>
      <Link className="link" to="/farms">
        {"View farms"}
      </Link>
    </Box>
  );
};

export default Bryler;
