import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/client';
import { DATA, GET_USER } from './query';
import { Container, Grid } from '@mui/material';
import Home from './components/Home/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Home/>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
