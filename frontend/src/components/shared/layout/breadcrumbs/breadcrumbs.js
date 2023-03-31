import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalizeFirstLowercaseRest } from "@src/helpers/utils/utils";
import ArrowIcon from "@src/assets/svgs/ArrowDown.svg";
import "../breadcrumbs/breadcrumbs.scss";

const BreadCrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumbs
      separator={<img src={ArrowIcon} style={{ marginTop: "10px" }} />}
      aria-label="breadcrumb"
      className="bread-crumbs"
      sx={{ ml: "25px", flexGrow: 1, display: { xs: "none", sm: "block" } }}
    >
      {pathnames.length > 0 ? (
        <Link
          color="inherit"
          underline="none"
          className="link-cls"
          onClick={() => navigate("/")}
          sx={{ fontSize: "14px", fontWeight: "400", cursor: "pointer" }}
        >
          {"Home"}
        </Link>
      ) : (
        <Typography fontWeight={600} variant={"h5"} color="text.primary">
          {" "}
          {"Home"}{" "}
        </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}/`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography
            key={name}
            fontWeight={600}
            variant={"h5"}
            color="text.primary"
          >
            {capitalizeFirstLowercaseRest(name)}
          </Typography>
        ) : (
          <Link
            key={name}
            color="inherit"
            underline="none"
            className="link-cls"
            onClick={() => navigate(routeTo)}
            sx={{ fontSize: "14px", fontWeight: "400", cursor: "pointer" }}
          >
            {capitalizeFirstLowercaseRest(name)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
export default BreadCrumbs;
