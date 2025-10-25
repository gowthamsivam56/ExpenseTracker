import Paper from '@mui/material/Paper';
import { Formik, Form, Field } from "formik";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

const Signup = () => {
    const theme = useTheme();
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
                >
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
                                    type="text"
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Button type="submit" sx={{
                                    ...theme.glassCard
                                }} fullWidth>SIGN UP</Button>
                            </Grid>
                            <Grid size={{ xs: 12 }} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                Already have an account?
                                <Link href="/" underline="hover">
                                    Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Paper>
        </Box>
    );
};

export default Signup;