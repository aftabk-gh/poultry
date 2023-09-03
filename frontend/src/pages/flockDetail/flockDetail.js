import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FarmExpense from "../farmExpense/farmExpense";
import CashBook from "../cashBook/cashBook";
import Attendance from "../attendance/attendance";
import Sale from "../sale/sale";
import Medicine from "../medicine/medicine";
import Feed from "../feed/feed";
import Staff from "../staff/staff";
import Capital from "../capital/capital";
import ProfitAndLoss from "../profitAndLoss/profitAndLoss";
import FlockMedicine from "../medicine/flockMedicine";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FlockDetail() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          aria-label="basic tabs example"
        >
          <Tab label="Farm Expense" {...a11yProps(0)} />
          <Tab label="Cash Book" {...a11yProps(1)} />
          <Tab label="Medicine Usage" {...a11yProps(2)} />
          {/* <Tab label="Feed" {...a11yProps(3)} /> */}
          <Tab label="Sale" {...a11yProps(4)} />
          <Tab label="Profit & Loss" {...a11yProps(5)} />
          <Tab label="Staff" {...a11yProps(6)} />
          <Tab label="Capital" {...a11yProps(7)} />
          <Tab label="Attendance" {...a11yProps(8)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FarmExpense />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CashBook />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FlockMedicine />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <Feed />
      </TabPanel> */}
      <TabPanel value={value} index={4}>
        <Sale />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ProfitAndLoss />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Staff />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Capital />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <Attendance />
      </TabPanel>
    </Box>
  );
}
