import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <Box sx={{ mt: "25px" }}>
      <Typography mb={5} variant="h1">
        {"Dashboard"}
      </Typography>
      <Link className="link" to="/bryler">
        {"View bryler"}
      </Link>
      <Link className="link" to="/layer">
        {"View layer"}
      </Link>
      {/* <Link className="link" to="/medicine">
        {"View medicine"}
      </Link> */}
    </Box>
  );
};

export default Dashboard;
