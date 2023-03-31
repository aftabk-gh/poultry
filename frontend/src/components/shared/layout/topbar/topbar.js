import { Box, Typography, Divider } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import bellIcon from "@src/assets/svgs/bell.svg";
import lineIcon from "@src/assets/svgs/Line 7.svg";
import searchIcon from "@src/assets/svgs/Search.svg";
import wavingIcon from "@src/assets/svgs/waving.svg";
import Avatar from "@src/assets/svgs/avatar.svg";
import BreadCrumbs from "../breadcrumbs/breadcrumbs";
import TopbarSecondaryMenu from "../topbarSecondary/topBarSecondaryMenu";
import "../topbar/topbar.scss";
import { AuthContext } from "@src/components/hoc/AuthContext";
import { useContext } from "react";

const drawerWidth = 169;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#F5F5F5",
  borderBottom: "1px solid #9D9D9D",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Topbar = (props) => {
  const { open } = props;
  const location = useLocation();
  const { userData } = useContext(AuthContext);
  return (
    <>
      <AppBar
        className="app-bar-cls"
        elevation={0}
        position="absolute"
        open={open}
        sx={{ borderBottom: "none", left: "72px" }}
      >
        <Toolbar
          sx={{
            borderBottom: "none",
            backgroundColor: "white",
          }}
          className="appbar-toolbar-cls"
        >
          {location.pathname === "/" ? (
            <Box
              className="user-box"
              sx={{ display: "flex", flexGrow: 1, ml: "25px" }}
            >
              <Typography
                sx={{ fontWeight: "200" }}
                color="secondary"
                variant="h2"
                component="h2"
                className="user-title"
              >
                {userData?.first_name}
              </Typography>
              <img className="hey-img" src={wavingIcon} />
            </Box>
          ) : (
            <BreadCrumbs />
          )}

          <Box className="search-icon-box">
            <IconButton sx={{ color: "#130F26" }}>
              <img src={searchIcon} />
            </IconButton>
            <img src={lineIcon} />
          </Box>

          <Box className="search-icon-box">
            <IconButton sx={{ color: "#130F26" }}>
              <Badge badgeContent={0} color="error">
                <img src={bellIcon} />
              </Badge>
            </IconButton>
            <img src={lineIcon} />
          </Box>

          <img
            className="profile-pic"
            src={Avatar}
            alt="profile pic"
            style={{ height: "32px", borderRadius: "50%" }}
          />
          <TopbarSecondaryMenu />
        </Toolbar>
        <Divider />
      </AppBar>
    </>
  );
};
Topbar.propTypes = {
  open: PropTypes.bool,
};
export default Topbar;
