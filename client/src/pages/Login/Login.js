import React from "react";
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
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
    const [generalError, setGeneralError] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

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
            console.log(`error`,error);
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
                    validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Required';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setFieldError }) => {
                        setGeneralError("");
                        try{
                            const { data } = await logIn({ variables: { ...values } });
                            if (data?.logIn?.success === false) {
                                if(data?.logIn?.code === "I_LOGIN_EMAIL_NOT_FOUND") {
                                    setFieldError("email", data?.logIn?.message)
                                }
                                else if(data?.logIn?.code === "I_LOGIN_INVALID_PASSWORD") {
                                    setFieldError("password", data?.logIn?.message)
                                }
                                else {
                                    setGeneralError(data?.logIn?.message);
                                }
                            }
                        }
                        catch(error) {
                            setGeneralError("Server unreachable. Please try later");
                        }
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
                            {
                                generalError &&
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="body2" color="error">{generalError}</Typography>
                                </Grid>
                            }
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
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position={'end'}>
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Link component={RouterLink} to="/forgot-password" underline="hover">
                                    Forgot password?
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
                                <Link component={RouterLink} to="/signup" underline="hover">
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