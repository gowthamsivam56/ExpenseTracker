import React from "react";
import Paper from '@mui/material/Paper';
import { Formik, Form, Field } from "formik";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";
import { Box } from '@mui/material';
import { gql, useMutation } from "@apollo/client";
import { useNavigate, useParams } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { regex } from '../../config';
import useAlert, { Success, Error, Warning } from '../../components/Alert/CustomAlert';

const RESETPASSWORD = gql`
    mutation resetPassword($userId: ID!, $token: String!, $password: String!) {
        resetPassword(userId: $userId, token: $token, password: $password) {
            code
            success
            message
        }
    }
`;

const ResetPassword = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {open: openSuccess, message: messageSuccess, handleOpen: showSuccess, handleClose: closeSuccess} = useAlert();
    const [generalError, setGeneralError] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const { userId, token } = useParams();

    const [resetPassword, { loading: resetPasswordLoading, error: resetPasswordError, data: resetPasswordData }] = useMutation(RESETPASSWORD, {
        onCompleted(data) {
            if (data?.resetPassword?.success === true) {
                showSuccess(data?.resetPassword?.message);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
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
            <Success open={openSuccess} message={messageSuccess} onClose={closeSuccess} />
            <Paper variant="elevation" sx={{
                ...theme.glassCard,
                width: "40%",
                padding: '20px',
            }} >
                <Formik
                    initialValues={{
                        password: '',
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        else if(!regex.Password.test(values.password)) {
                            errors.password = 'Password must be 8-25 characters and contain one uppercase, lowercase, number and special character except space and back-slash';
                        }

                        return errors;
                    }}
                    onSubmit={async (values) => {
                        setGeneralError("");
                        try{
                            const { data } = await resetPassword({ variables: { userId, token, ...values } });
                            if (data?.resetPassword?.success === false) {
                                setGeneralError(data?.resetPassword?.message);
                            }
                        }
                        catch(error) {
                            setGeneralError("Something went wrong");
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
                                    Reset Password
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Field
                                    component={TextField}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    label="New Password"
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
                            {
                                generalError &&
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="body2" color="error">{generalError}</Typography>
                                </Grid>
                            }
                            <Grid size={{ xs: 12 }}>
                                <Button type="submit" sx={{ ...theme.glassCard }} fullWidth>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Paper>
        </Box>
    );
};

export default ResetPassword;