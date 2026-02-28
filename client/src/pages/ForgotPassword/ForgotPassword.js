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
import { Link as RouterLink } from 'react-router-dom';
import useAlert, { Success, Error, Warning } from '../../components/Alert/CustomAlert';

const FORGOTPASSWORD = gql`
    mutation forgotPassword($email: String!) {
        forgotPassword(email: $email) {
            code
            success
            message
        }
    }
`;

const ForgotPassword = () => {
    const theme = useTheme();
    const {open: openSuccess, message: messageSuccess, handleOpen: showSuccess, handleClose: closeSuccess} = useAlert();
    const [generalError, setGeneralError] = React.useState("");

    const [forgotPassword, { loading: forgotPasswordLoading, error: forgotPasswordError, data: forgotPasswordData }] = useMutation(FORGOTPASSWORD, {
        onCompleted(data) {
            showSuccess(data?.forgotPassword?.message);
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
            <Success open={openSuccess} message={messageSuccess} onClose={closeSuccess} />
            <Paper variant="elevation" sx={{
                ...theme.glassCard,
                width: "40%",
                padding: '20px',
            }} >
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setFieldError }) => {
                        setGeneralError("");
                        try{
                            const { data } = await forgotPassword({ variables: { ...values } });
                            if (data?.forgotPassword?.success === false) {
                                if(data?.forgotPassword?.code === "I_FORGOT_PASSWORD_EMAIL_NOT_FOUND") {
                                    setFieldError("email", data?.forgotPassword?.message)
                                }
                                else {
                                    setGeneralError(data?.forgotPassword?.message);
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
                                    Forgot Password
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
                                <Button type="submit" sx={{ ...theme.glassCard }} fullWidth>
                                    Send Reset Link
                                </Button>
                            </Grid>
                            {
                                generalError &&
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="body2" color="error">{generalError}</Typography>
                                </Grid>
                            }
                            <Grid size={{ xs: 12 }} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Link component={RouterLink} to="/" underline="hover">
                                    Back to Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Paper>
        </Box>
    );
};

export default ForgotPassword;