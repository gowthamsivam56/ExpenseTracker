import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Home.css';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


function createData(date, category, description, amount) {
  return { date, category, description, amount };
}

const rows = [
  createData('2025-10-01', 'Food', 'Lunch at Subway', 12.5),
  createData('2025-10-02', 'Transport', 'Uber to office', 8.75),
  createData('2025-10-03', 'Shopping', 'New headphones', 49.99),
  createData('2025-10-04', 'Utilities', 'Electricity bill', 64.0),
  createData('2025-10-05', 'Entertainment', 'Netflix subscription', 15.99),
];

const Home = () => {
    return (
        <Grid container spacing={2} className="myContainer container_shadow">
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3">
                    Expense Tracker
                </Typography>
                <Tooltip title="My Account">
                    <IconButton>
                        <AccountCircleIcon sx={{ fontSize: 40 }}/>
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="success" fullWidth>
                    Add Income
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="error" fullWidth>
                    Add Expense
                </Button>
            </Grid>          
            <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar views={['year', 'month', 'day']} />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardActionArea>
                        <CardContent sx={{ height: '100%' }}>
                        <Typography variant="h5">
                            Total Income
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            30000
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardActionArea>
                        <CardContent sx={{ height: '100%' }}>
                        <Typography variant="h5">
                            Available Balance
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            500
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Home