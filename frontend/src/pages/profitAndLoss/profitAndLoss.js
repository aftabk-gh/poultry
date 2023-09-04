import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import uploadIcon from "@src/assets/svgs/plus.svg";
import "./profitAndLoss.scss";
import {
  useFlocksOtherExpenseListQuery,
  useFlocksOtherIncomeListQuery,
  useFlocksProfitAndLossListQuery,
} from "@src/store/api";
import OtherExpenseModal from "@src/components/shared/popups/otherExpenseModal/otherExpenseModal";
import OtherIncomeModal from "@src/components/shared/popups/otherIncomeModal/otherIncomeModal";
import { useParams } from "react-router-dom";

const ProfitAndLoss = () => {
  const { id: flockId } = useParams();
  const { data: otherExpenseData = [], isLoading } =
    useFlocksOtherExpenseListQuery(
      {
        flockId,
      },
      { skip: !flockId },
    );
  const [expData, setOtherExpData] = useState([]);
  const { data: otherIncomeData = [], isIncomeDataLoading } =
    useFlocksOtherIncomeListQuery(
      {
        flockId,
      },
      { skip: !flockId },
    );
  const { data: profit_loss_data = [], isProfitLossLoading } =
    useFlocksProfitAndLossListQuery(
      {
        flockId: flockId,
      },
      { skip: !flockId },
    );
  const [expAction, setExpAction] = useState("add");
  const [rowExpCellId, setExpRowCellId] = useState();
  const [incAction, setIncAction] = useState("add");
  const [rowIncCellId, setIncRowCellId] = useState();
  const [incomeData, setOtherIncomeData] = useState([]);
  const [dataLoading, setIsDataLoading] = useState(true);
  const [openIncomeModal, setIncomeOpenModal] = useState(false);
  const [openExpModal, setExpOpenModal] = useState(false);

  const handleModalOpen = (item) => {
    item == "exp" && setExpOpenModal(true);
    item == "inc" && setIncomeOpenModal(true);
  };

  const handleModalClose = (item) => {
    if (item == "exp") {
      setExpRowCellId(undefined);
      setExpAction("add");
      setExpOpenModal(false);
    } else if (item == "inc") {
      setIncRowCellId(undefined);
      setIncAction("add");
      setIncomeOpenModal(false);
    }
  };

  const handleEditModalOpen = (event, cellId, item) => {
    event.stopPropagation();
    if (item == "exp") {
      setExpRowCellId(cellId);
      setExpAction("edit");
      setExpOpenModal(true);
    } else if (item == "inc") {
      setIncRowCellId(cellId);
      setIncAction("edit");
      setIncomeOpenModal(true);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (otherExpenseData.length) {
        setOtherExpData(otherExpenseData);
      } else {
        setOtherExpData([]);
      }
      setIsDataLoading(false);
    }
  }, [otherExpenseData, isLoading]);

  useEffect(() => {
    if (!isIncomeDataLoading) {
      if (otherIncomeData.length) {
        setOtherIncomeData(otherIncomeData);
      } else {
        setOtherIncomeData([]);
      }
      setIsDataLoading(false);
    }
  }, [otherIncomeData, isIncomeDataLoading]);

  return (
    <Box className="myContainer">
      <Typography textAlign="center" variant="h2" marginBottom="2rem">
        {"Profit And Loss Statement"}
      </Typography>
      {isProfitLossLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Box className="boxContainer">
            <Typography className="heading">
              {"Additional Information"}
            </Typography>
            <Grid container mt={2}>
              <Grid item gap={2} display="flex" alignItems="center" xs={4}>
                <Typography variant="body1" className="additaionalInfotitle">
                  Company Name:
                </Typography>
                <Typography variant="body1" className="text">
                  {profit_loss_data.company_name}
                </Typography>
              </Grid>
              <Grid item gap={2} display="flex" alignItems="center" xs={4}>
                <Typography variant="body1" className="additaionalInfotitle">
                  Email:
                </Typography>
                <Typography variant="body1" className="text">
                  {profit_loss_data.email}
                </Typography>
              </Grid>
              <Grid item gap={2} display="flex" alignItems="center" xs={4}>
                <Typography variant="body1" className="additaionalInfotitle">
                  Address
                </Typography>
                <Typography variant="body1" className="text">
                  {profit_loss_data.company_address}
                </Typography>
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid item gap={2} display="flex" alignItems="center" xs={4}>
                <Typography variant="body1" className="additaionalInfotitle">
                  Input Date:
                </Typography>
                <Typography variant="body1" className="text">
                  {profit_loss_data.input_date}
                </Typography>
              </Grid>
              <Grid item gap={2} display="flex" alignItems="center" xs={4}>
                <Typography variant="body1" className="additaionalInfotitle">
                  Input Quantity:
                </Typography>
                <Typography variant="body1" className="text">
                  {profit_loss_data.input_quantity}
                </Typography>
              </Grid>
              <Grid item gap={2} display="flex" alignItems="center" xs={4}>
                <Typography variant="body1" className="additaionalInfotitle">
                  Sale Date:
                </Typography>
                <Typography variant="body1" className="text">
                  {profit_loss_data.sale_date}
                </Typography>
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid item gap={2} display="flex" alignItems="center" xs={4}>
                <Typography variant="body1" className="additaionalInfotitle">
                  Sale Quantity:
                </Typography>
                <Typography variant="body1" className="text">
                  {profit_loss_data.sale_qty}
                </Typography>
              </Grid>
              <Grid item gap={2} display="flex" alignItems="center" xs={4}>
                <Typography variant="body1" className="additaionalInfotitle">
                  Flock Duration:
                </Typography>
                <Typography variant="body1" className="text">
                  {profit_loss_data.flock_duration
                    ? `${profit_loss_data.flock_duration} days`
                    : ""}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className="boxContainer">
            <Typography className="heading">{"Description"}</Typography>
            <Grid container gap={2}>
              <Grid item xs={6}></Grid>
              <Grid item xs={1}>
                <strong>{"Amount (Rs)"}</strong>
              </Grid>
              <Grid item xs={1}>
                <strong>{"% To Sale"}</strong>
              </Grid>
            </Grid>
            <Grid container gap={2} mt=".5rem">
              <Grid item xs={6} className="title">
                {"Sale of Broiler"}
              </Grid>
              <Grid item xs={1} className="value">
                {profit_loss_data.total_sale}
              </Grid>
              <Grid item xs={1} className="value">
                {`${profit_loss_data.total_sale_percent}%`}
              </Grid>
            </Grid>
            <Grid container gap={2}>
              <Grid item xs={6} className="title">
                {"Cost of flock"}
              </Grid>
              <Grid item xs={1} className="value">
                {profit_loss_data.total_expense}
              </Grid>
              <Grid item xs={1} className="value">
                {`${profit_loss_data.total_exp_percent}%`}
              </Grid>
            </Grid>
            <Grid container gap={2}>
              <Grid item xs={6} className="title">
                {"Profit/ Loss"}
              </Grid>
              <Grid item xs={1} className="value">
                {profit_loss_data.profit_loss}
              </Grid>
              <Grid item xs={1} className="value">
                {`${profit_loss_data.profit_loss_percent}%`}
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {!dataLoading && (
        <Box className="boxContainer">
          <Typography className="heading">{"Expenses"}</Typography>
          <Grid container gap={2}>
            <Grid item xs={6}></Grid>
            <Grid item xs={1}>
              <strong>{"Amount (Rs)"}</strong>
            </Grid>
            <Grid item xs={1}>
              <strong>{"% To Expense"}</strong>
            </Grid>
          </Grid>
          {expData.map((item, key) => {
            return (
              <Grid
                container
                gap={2}
                mt=".5rem"
                key={key}
                style={{
                  cursor: "pointer",
                }}
                onClick={(event) => handleEditModalOpen(event, item.id, "exp")}
              >
                <Grid item xs={6} className="title">
                  {item.title}
                </Grid>
                <Grid item xs={1} className="value">
                  {item.value}
                </Grid>
                <Grid item xs={1} className="value">
                  {`${item.vlaue_percentage}%`}
                </Grid>
              </Grid>
            );
          })}
          <Grid container gap={2}>
            <Grid item xs={6}>
              <Button
                className="upload-btn"
                onClick={() => handleModalOpen("exp")}
              >
                <span>
                  <img className="upload-img" src={uploadIcon} />
                </span>
                {"Add new "}
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Box>
      )}
      {!isIncomeDataLoading && (
        <Box className="boxContainer">
          <Typography className="heading">{"Other income"}</Typography>
          <Grid container gap={2}>
            <Grid item xs={6}></Grid>
            <Grid item xs={1}>
              <strong>{"Amount (Rs)"}</strong>
            </Grid>
            <Grid item xs={1}>
              <strong>{"% To Income"}</strong>
            </Grid>
            {incomeData.map((item, key) => {
              return (
                <Grid
                  container
                  key={key}
                  style={{
                    cursor: "pointer",
                  }}
                  gap={2}
                  mt=".5rem"
                  onClick={(event) =>
                    handleEditModalOpen(event, item.id, "inc")
                  }
                >
                  <Grid item xs={6} className="title">
                    {item.title}
                  </Grid>
                  <Grid item xs={1} className="value">
                    {item.value}
                  </Grid>
                  <Grid item xs={1} className="value">
                    {`${item.vlaue_percentage}%`}
                  </Grid>
                </Grid>
              );
            })}
            <Grid container gap={2}>
              <Grid item xs={6}>
                <Button
                  className="upload-btn"
                  onClick={() => handleModalOpen("inc")}
                >
                  <span>
                    <img className="upload-img" src={uploadIcon} />
                  </span>
                  {"Add new "}
                </Button>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Grid>
        </Box>
      )}
      <OtherExpenseModal
        otherExpenseId={rowExpCellId}
        action={expAction}
        open={openExpModal}
        handleClose={() => handleModalClose("exp")}
      />
      <OtherIncomeModal
        otherIncomeId={rowIncCellId}
        action={incAction}
        open={openIncomeModal}
        handleClose={() => handleModalClose("inc")}
      />
    </Box>
  );
};

export default ProfitAndLoss;
