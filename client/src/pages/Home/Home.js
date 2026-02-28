import React, { useContext } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { Box, Container, Grid } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { useNavigate } from 'react-router-dom';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { defineMessages, FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import "./Home.css";
import UpsertTransaction from "./UpsertTransaction";
import { ThemeToggleContext } from "../../theme/ThemeProviderWrapper";
import useAlert, { Success, Error, Warning } from '../../components/Alert/CustomAlert';


const messages = defineMessages({
  NoRecordsLabel: { id: 'Expense.NoRecords', description: 'Expense Table  - NoRecords', defaultMessage: 'No Records Found' },
});

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#FFCC33",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

const GET_TRANSACTION_BY_MONTH = gql`
  query getTransactionByMonth ($startDate: String!, $endDate: String!) {
    getTransactionByMonth (startDate: $startDate, endDate: $endDate) {
      totalIncome
      totalExpense
      availableBalance
      transactions {
        _id
        date
        category
        description
        amount
        transactionType
      }
    }
  }
`;

const DELETE_TRANSACTION_BY_ID = gql`
  mutation deleteTransactionById ($_id: ID!) {
    deleteTransactionById (_id: $_id) {
      code
      success
      message
    }
  }
`;

const Home = () => {
  const { mode, toggleTheme } = useContext(ThemeToggleContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const {open: openSuccess, message: messageSuccess, handleOpen: showSuccess, handleClose: closeSuccess} = useAlert();
  const {open: openError, message: messageError, handleOpen: showError, handleClose: closeError} = useAlert();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const name = localStorage.getItem("name") || "";
  const displayName = name.charAt(0).toUpperCase();
  const email = localStorage.getItem("email") || "";
  const [mothlytransactions, setMonthlytransactions] = React.useState([])

  const grouped = mothlytransactions?.transactions?.reduce((acc, t) => {
    const category = t.category;
    const amount = Number(t.amount);
    if (category != "Salary" && category != "Allowance" && category != "Bonus") {
      acc[category] = (acc[category] || 0) + amount;
    }
    return acc;
  }, {});

  const chartData = Object.entries(grouped || {})?.map(([category, total], index) => ({
    id: index,
    value: total,
    label: `${category} ${(total / mothlytransactions?.totalIncome * 100).toFixed(0)} %`,
  }));


  const [getTransactionByMonth, { data: getTransactionByMonthData, refetch: getTransactionByMonthRefetch }] = useLazyQuery(GET_TRANSACTION_BY_MONTH,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
      onCompleted(data) {
        setMonthlytransactions(data?.getTransactionByMonth);
      },
      onError(error) {
        console.log(`error`);
      },
    }
  );

  const [deleteTransactionById, { loading: deleteTransactionByIdLoading, error: deleteTransactionByIdError, data: deleteTransactionByIdData }] = useMutation(DELETE_TRANSACTION_BY_ID, {
    onCompleted(data) {
      if (data.deleteTransactionById.success === true) {
        // getTransactionRefetch();
        getTransactionByMonthRefetch();
      }
    },
    onError(error) {
      console.log(`error`);
    }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate('/');
  }

  const handleDelete = async (_id) => {
    await deleteTransactionById({ variables: { _id } });
  }

  const handleMonthChange = async (newMonth) => {
    const startDate = newMonth;
    const endDate = newMonth.add(1, "month");
    getTransactionByMonth({ variables: { startDate, endDate } })
  }

  const handleExportToCSV = async (data) => {
    if (!data?.length) return;

    const escapeCSV = (value) => {
      if (value == null) return "";

      const str = String(value);
      if (/[",\n]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const excludeKeys = ["_id", "__typename"];

    const allKeys = Object.keys(data[0]).filter((key) => !excludeKeys.includes(key));

    const header = allKeys.map(escapeCSV).join(",");

    const rows = data.map((obj) =>
      allKeys.map((key) => {
        let value = obj[key];
        if (key === "date") {
          value = new Date(Number(value)).toLocaleString();
        }

        return escapeCSV(value);
      }).join(",")
    );

    const csv = [header, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  React.useEffect(() => {
    const date = new Date();
    const newMonth = dayjs(new Date(date.getFullYear(), date.getMonth(), 1));
    const startDate = newMonth;
    const endDate = newMonth.add(1, "month");
    getTransactionByMonth({ variables: { startDate, endDate } })

  }, []);

  return (
    <Box>
      <Success open={openSuccess} message={messageSuccess} onClose={closeSuccess} />
      <Error open={openError} message={messageError} onClose={closeError} />
      <Container
        maxWidth="xl"
        sx={{ ...theme.glassCard, padding: '20px', marginY: '30px', marginX: 'auto' }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 1 }} sx={{ alignContent: "center" }}>
            <Tooltip
              title={mode === "dark" ? "Dark Mode" : "Light Mode"}
              placement="bottom-end"
            >
              <FormControlLabel
                control={
                  <MaterialUISwitch sx={{ m: 1 }} checked={mode === "dark"} />
                }
                // label="Mode"
                labelPlacement="bottom"
                onClick={toggleTheme}
              />
            </Tooltip>
          </Grid>
          <Grid
            size={{ xs: 10 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="h3" color="#7C7C7C">
              Expense Tracker
            </Typography>
          </Grid>
          <Grid size={{ xs: 1 }} sx={{ alignContent: "center" }}>
            <Tooltip title="My Account">
              <IconButton onClick={handleClick}>
                <Avatar sx={{ width: 45, height: 45 }}>{displayName}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    ...theme.glassCard,
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                  },
                },
              }}
              anchorOrigin={{ horizontal: 'right' }}
            >
              <MenuItem disabled sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}>
                <Typography variant="body2" fontSize="20px" fontWeight="600">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {email}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ ...theme.glassCard }} />
          </Grid>

          <Grid size={{ xs: 8 }}>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <UpsertTransaction
                    transactionType={"income"}
                    getTransactionByMonthRefetch={getTransactionByMonthRefetch}
                    showSuccess={showSuccess}
                    showError={showError}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <UpsertTransaction
                    transactionType={"expense"}
                    getTransactionByMonthRefetch={getTransactionByMonthRefetch}
                    showSuccess={showSuccess}
                    showError={showError}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={{ xs: 4 }}>
                  <Card sx={{ ...theme.glassCard }}>
                    <CardActionArea>
                      <CardContent sx={{ height: "158px" }}>
                        <Typography variant="h5">Total Income</Typography>
                        <Typography variant="h3" color="text.secondary">
                          <FormattedNumber value={getTransactionByMonthData?.getTransactionByMonth?.totalIncome || 0} style="currency" currency="INR" />
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Card sx={{ ...theme.glassCard }}>
                    <CardActionArea>
                      <CardContent sx={{ height: "158px" }}>
                        <Typography variant="h5">Total Expense</Typography>
                        <Typography variant="h3" color="text.secondary">
                          <FormattedNumber value={getTransactionByMonthData?.getTransactionByMonth?.totalExpense || 0} style="currency" currency="INR" />
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Card sx={{ ...theme.glassCard }}>
                    <CardActionArea>
                      <CardContent sx={{ height: "158px" }}>
                        <Typography variant="h5">Available Balance</Typography>
                        <Typography variant="h3" color="text.secondary">
                          <FormattedNumber value={getTransactionByMonthData?.getTransactionByMonth?.availableBalance || 0} style="currency" currency="INR" />
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid size={{ xs: 4 }} sx={{ ...theme.glassCard, alignContent: "center" }}>
            <PieChart
              series={[
                {
                  data: [
                    ...chartData,
                    ...(getTransactionByMonthData?.getTransactionByMonth?.availableBalance > 0 ? [{
                      value: getTransactionByMonthData?.getTransactionByMonth?.availableBalance,
                      label: `Available Balance ${(getTransactionByMonthData?.getTransactionByMonth?.availableBalance / getTransactionByMonthData?.getTransactionByMonth?.totalIncome * 100).toFixed(0)}%`,
                      color: "#249640",
                    }] : []
                    )
                  ],
                },
              ]}
              width={200}
              height={200}
            />
          </Grid>
          <Grid size={{ xs: 4 }} sx={{
            ...theme.glassCard,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                sx={{
                  width: "100%",
                  "& .MuiPickersDay-root": { height: 37, width: 40, fontSize: "1.40rem", marginX: "8px", marginY: "0.3px" },
                  "& .MuiTypography-root": { height: 37, width: 40, fontSize: "1.50rem", marginX: "8px", marginY: "8px" },
                  "& .MuiPickersCalendarHeader-label": { fontSize: "1.6rem" },
                }}
                views={["year", "month", "day"]}
                onMonthChange={handleMonthChange}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 8 }}>
            <TableContainer sx={{ ...theme.glassCard, height: "435px" }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h5">Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h5">Category</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h5">Description</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h5">Amount</Typography>
                    </TableCell>
                    {
                      getTransactionByMonthData?.getTransactionByMonth?.transactions?.length ?
                        <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <Tooltip title="Export">
                            <IconButton>
                              <DownloadOutlinedIcon onClick={() => handleExportToCSV(getTransactionByMonthData?.getTransactionByMonth?.transactions)} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        :
                        <TableCell />
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getTransactionByMonthData?.getTransactionByMonth?.transactions?.length ? 
                    (getTransactionByMonthData?.getTransactionByMonth?.transactions?.map((data) => (
                      <TableRow>
                        <TableCell>{new Date(Number(data?.date)).toLocaleString()}</TableCell>
                        <TableCell>{data?.category}</TableCell>
                        <TableCell>{data?.description}</TableCell>
                        <TableCell align="right">
                          <Typography
                            color={
                              data?.transactionType === "income" ? "green" : "red"
                            }
                          >
                            {data?.transactionType === "income" ? "+" : "-"}{" "}
                            {<FormattedNumber value={data?.amount} style="currency" currency="INR" />}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <UpsertTransaction transactionType={data?.transactionType} getTransactionByMonthRefetch={getTransactionByMonthRefetch} getTransactionData={data} showSuccess={showSuccess} showError={showError} />
                          <Tooltip title="Delete">
                            <IconButton>
                              <DeleteOutlineOutlinedIcon onClick={() => handleDelete(data?._id)} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Typography variant="body1">
                            <Box fontWeight="fontWeightBold" m={19.4} display="flex" justifyContent="center">
                              <FormattedMessage {...messages.NoRecordsLabel} />
                            </Box>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
