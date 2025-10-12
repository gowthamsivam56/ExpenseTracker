import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Formik, Field } from "formik";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TextField } from "formik-mui";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ADD_TRANSACTION = gql`
  mutation addTransaction(
    $date: String!
    $category: String!
    $description: String!
    $amount: String!
    $transactionType: String!
  ) {
    addTransaction(
      date: $date
      category: $category
      description: $description
      amount: $amount
      transactionType: $transactionType
    ) {
      code
      success
      message
    }
  }
`;

const UpsertTransaction = (props) => {
  const theme = useTheme();
  const { transactionType, getTransaction } = props;
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");

  const categories =
    transactionType === "income"
      ? [
          { label: "Salary", value: "Salary" },
          { label: "Allowance", value: "Allowance" },
          { label: "Bonus", value: "Bonus" },
        ]
      : [
          { label: "Food", value: "Food" },
          { label: "Movie", value: "Movie" },
          { label: "Subscription", value: "Subscription" },
        ];

  const [
    addTransaction,
    {
      loading: transactionLoading,
      error: transactionError,
      data: transactionData,
    },
  ] = useMutation(ADD_TRANSACTION, {
    onCompleted(data) {
      if (data.addTransaction.success === true) {
        // showSuccess(messages.cpeRebootSuccess);
        getTransaction();
      } else {
        // showError(data?.rebootSystem);
      }
    },
    onError(error) {
      console.log(`error`);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Formik
      initialValues={{
        date: dayjs(new Date()),
        amount: "",
        category: "",
        description: "",
      }}
      validate={(values) => {
        const errors = {};

          if (!values.amount) {
           errors.amount = 'Required';
         }
           if (!values.category) {
           errors.category = 'Required';
         }

         if (!values.description) {
           errors.description = 'Required';
         }
         
         return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        addTransaction({
          variables: {
            ...values,
            transactionType,
          },
        });
        resetForm();
        setOpen(false);
      }}
    >
      {({ submitForm, isSubmitting, values, setFieldValue }) => (
        <React.Fragment>
          <Button
            variant="contained"
            className={
              transactionType == "income" ? "buttonGreen" : "buttonRed"
            }
            sx={{ ...theme.glassCard, p: 2 }}
            onClick={handleClickOpen}
            fullWidth
          >
            {transactionType === "income" ? "Add Income" : "Add Expense"}
          </Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            slotProps={{
              paper: {
                sx: {
                  ...theme.glassCard,
                },
              },
              backdrop: {
                sx: {
                  background: document.body.style.background,
                },
              },
            }}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              {transactionType === "income" ? "Add Income" : "Add Expense"}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={(theme) => ({
                ...theme.glassCard,
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid size={{ xs: 7 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      value={values.date}
                      views={["year", "month", "day"]}
                      sx={{ width: "100%" }}
                      onChange={(newValue) => setFieldValue("date", newValue)}
                      slotProps={{
                        popper: {
                          sx: {
                            "& .MuiPickerPopper-paper": {
                              ...theme.glassCard,
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 5 }}>
                  <Field
                    component={TextField}
                    type="text"
                    name="amount"
                    label="Amount"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Field
                    component={TextField}
                    select
                    name="category"
                    label="Category"
                    variant="outlined"
                    fullWidth
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            ...theme.glassCard,
                          },
                        },
                      },
                    }}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Field
                    component={TextField}
                    type="text"
                    name="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button autoFocus onClick={submitForm}>
                Save
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default UpsertTransaction;
