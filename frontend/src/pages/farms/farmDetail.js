import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";

const FarmDetail = () => {
  const params = useParams();
  return (
    <Box sx={{ mt: "25px" }}>
      <Typography mb={5} variant="h2">
        {"Farm"}
      </Typography>
      <Link className="link" to={`/farms/${params.id}/flocks/`}>
        {"View flock"}
      </Link>
      <Link className="link" to={`/farms/${params.id}/medicine/`}>
        {"View medicine"}
      </Link>
    </Box>
  );
};

export default FarmDetail;
