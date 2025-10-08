import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./Home.css";
import UpsertIncome from "./UpsertIncome";
import UpsertExpense from "./UpertExpense";

function createData(date, category, description, amount) {
  return { date, category, description, amount };
}

const rows = [
  createData("2025-10-01", "Food", "Lunch at Subway", 12.5),
  createData("2025-10-02", "Transport", "Uber to office", 8.75),
  createData("2025-10-03", "Shopping", "New headphones", 49.99),
  createData("2025-10-04", "Utilities", "Electricity bill", 64.0),
  createData("2025-10-05", "Entertainment", "Netflix subscription", 15.99),
];

const Home = () => {
  return (
    <Container
      maxWidth="md"
      className="myContainer background container_shadow"
      fixed
    >
      <Grid container spacing={2}>
        <Grid
          size={{ xs: 11 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h2" color="#7C7C7C">
            Expense Tracker
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 1 }}
          sx={{ alignContent: "center" }}
        >
          <Tooltip title="My Account">
            <IconButton>
              <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Divider className="background" />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <UpsertIncome />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <UpsertExpense />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              className="background"
              sx={{ width: "100%" }}
              views={["year", "month", "day"]}
            />
          </LocalizationProvider>
        </Grid>
        <Grid container size={{ xs: 6 }} direction="column" spacing={2}>
          <Card className="background">
            <CardActionArea>
              <CardContent sx={{ height: "158px" }}>
                <Typography variant="h5">Total Income</Typography>
                <Typography variant="h3" color="text.secondary">
                  30000
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className="background">
            <CardActionArea>
              <CardContent sx={{ height: "158px" }}>
                <Typography variant="h5">Available Balance</Typography>
                <Typography variant="h3" color="text.secondary">
                  500
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TableContainer className="background" component={Paper}>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton>
                          <EditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
