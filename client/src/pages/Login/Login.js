import Paper from '@mui/material/Paper';
import { Formik, Form, Field } from "formik";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';

const LOGIN = gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      code
      success
      message
      user{
        fullname
        email
        dbName
      }
    }
  }
`;

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [logIn, { loading: logInLoading, error: logInError, data: logInData }] = useMutation(LOGIN, {
        onCompleted(data) {
            if (data?.logIn?.success === true) {
                localStorage.setItem("dbName", data?.logIn?.user?.dbName);
                localStorage.setItem("name", data?.logIn?.user?.fullname);
                localStorage.setItem("email", data?.logIn?.user?.email);
                navigate('/home');
            }
        },
        onError(error) {
            console.log(`error`);
        },
    });

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", minHeight: "100vh"
        }}>
            <Paper variant="elevation" sx={{
                ...theme.glassCard,
                width: "40%",
                padding: '20px',
            }} >
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={async (values) => {
                        await logIn({ variables: { ...values } });
                    }}
                >
                    <Form>
                        <Grid container spacing={2} direction="column">
                            <Grid size={{ xs: 12 }} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }} >
                                <Typography variant="h3" color="#7C7C7C">
                                    Login
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Field
                                    component={TextField}
                                    type="text"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Field
                                    component={TextField}
                                    type="text"
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Link href="#" underline="hover">
                                    Forget password?
                                </Link>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Button type="submit" sx={{ ...theme.glassCard }} fullWidth>
                                    Log In
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 12 }} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Link href="/signup" underline="hover">
                                    Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Paper>
        </Box>
    );
};

export default Login;