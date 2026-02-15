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
import { regex } from '../../config';

const SIGNUP = gql`
  mutation signUp($fullname: String!, $email: String!, $password: String!) {
    signUp(fullname: $fullname, email: $email, password: $password) {
      code
      success
      message
    }
  }
`;

const Signup = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [generalError, setGeneralError] = React.useState("");

    const [signUp, { loading: signupLoading, error: signupError, data: signupData }] = useMutation(SIGNUP, {
        onCompleted(data) {
            if (data?.signUp?.success === true) {
                navigate('/');
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
                        fullname: '',
                        email: '',
                        password: ''
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.fullname) {
                            errors.fullname = 'Required';
                        }
                        else if(!regex.Fullname.test(values.fullname)) {
                            errors.fullname = 'Supported Characters: Alphanumeric,Numbers,Space and \'.\-_!#^~\\';
                        }

                        if (!values.email) {
                            errors.email = 'Required';
                        }
                        else if(!regex.Mail.test(values.email)) {
                            errors.email = 'Enter a valid email';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        else if(!regex.Password.test(values.password)) {
                            errors.password = 'Password must be 8-25 characters and contain one uppercase, lowercase, number and special character except space and back-slash';
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setFieldError }) => {
                        setGeneralError("");
                        try{
                            const { data } = await signUp({ variables: { ...values } });
                            if (data?.signUp?.success === false) {
                                if(data?.signUp?.code === "I_SIGNUP_EMAIL_ALREADY_EXISTS") {
                                    setFieldError("email", data?.signUp?.message)
                                }
                                else {
                                    setGeneralError(data?.signUp?.message);
                                }
                            }
                        }
                        catch(error) {
                            setGeneralError("Server unreachable. Please try later");
                        }
                    }}
                >
                    {({ submitForm }) => (
                        <Form>
                            <Grid container spacing={2} direction="column">
                                <Grid size={{ xs: 12 }} sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }} >
                                    <Typography variant="h3" color="#7C7C7C">
                                        Sign Up
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        name="fullname"
                                        label="FullName"
                                        variant="outlined"
                                        fullWidth
                                    />
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
                                        type="password"
                                        name="password"
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                {
                                    generalError &&
                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="body2" color="error">{generalError}</Typography>
                                    </Grid>
                                }
                                <Grid size={{ xs: 12 }}>
                                    <Button type="submit" sx={{ ...theme.glassCard }} fullWidth>
                                        SIGN UP
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12 }} sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    Already have an account?
                                    <Link component={RouterLink} to="/" underline="hover">
                                        Login
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};

export default Signup;