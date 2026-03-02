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
import MenuItem from "@mui/material/MenuItem";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Tooltip from "@mui/material/Tooltip";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ADD_TRANSACTION = gql`
  mutation addTransaction($date: String!, $category: String!, $description: String!, $amount: Float!, $transactionType: String!) {
    addTransaction(date: $date, category: $category, description: $description, amount: $amount, transactionType: $transactionType) {
      code
      success
      message
    }
  }
`;

const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($_id: ID!, $date: String!, $category: String!, $description: String!, $amount: Float!, $transactionType: String!) {
    updateTransaction(_id: $_id, date: $date, category: $category, description: $description, amount: $amount, transactionType: $transactionType) {
      code
      success
      message
    }
  }
`;

const UpsertTransaction = (props) => {
  const theme = useTheme();
  const { transactionType, getTransactionByMonthRefetch, getTransactionData, showSuccess, showError } = props;
  const [open, setOpen] = React.useState(false);

  const categories =
    transactionType === "income"
      ? [
        { label: "Salary", value: "Salary" },
        { label: "Business / Freelance", value: "Business / Freelance" },
        { label: "Other Income", value: "Other Income" }
      ]
      : [
        { label: "Food & Dining", value: "Food & Dining" },
        { label: "Groceries", value: "Groceries" },
        { label: "Transportation", value: "Transportation" },
        { label: "Rent", value: "Rent" },
        { label: "Bills & Utilities", value: "Bills & Utilities" },
        { label: "EMI / Loan", value: "EMI / Loan" },
        { label: "Shopping", value: "Shopping" },
        { label: "Entertainment", value: "Entertainment" },
        { label: "Subscriptions", value: "Subscriptions" },
        { label: "Health & Medical", value: "Health & Medical" },
        { label: "Education", value: "Education" },
        { label: "Travel", value: "Travel" }
      ];

  const [addTransaction, { loading: addTransactionLoading, error: addTransactionError, data: addTransactionData }] = useMutation(ADD_TRANSACTION, {
    onCompleted(data) {
      if (data?.addTransaction?.success === true) {
        if(transactionType === "income") {
          showSuccess("Income Added Successfully");
        }
        else{
          showSuccess("Expense Added Successfully");
        }
      }
      else{
        showError(data?.addTransaction?.message)
      }
    },
    onError(error) {
      console.log(`error`);
      showError(error)
    },
  });

  const [updateTransaction, { loading: updateTransactionLoading, error: updateTransactionError, data: updateTransactionData }] = useMutation(UPDATE_TRANSACTION, {
    onCompleted(data) {
      if (data?.updateTransaction?.success === true) {
        if(transactionType === "income") {
          showSuccess("Income Updated Successfully");
        }
        else{
          showSuccess("Expense Updated Successfully");
        }
      }
      else {
        showError(data?.updateTransaction?.message)
      }
    },
    onError(error) {
      console.log(`error`);
      showError(error)
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
      enableReinitialize={true}
      initialValues={{
        date: getTransactionData?.date ? dayjs(Number(getTransactionData?.date)) : dayjs(new Date()),
        amount: getTransactionData?.amount ? getTransactionData?.amount : "",
        category: getTransactionData?.category ? getTransactionData?.category : "",
        description: getTransactionData?.description ? getTransactionData?.description : "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.amount) {
          errors.amount = 'Required';
        }
        else if(Number(values.amount)<1 || Number(values.amount)>10000000) {
          errors.amount = "Allowed range: ₹1 - ₹1,00,00,000";
        }

        if (!values.category) {
          errors.category = 'Required';
        }

        if (!values.description) {
          errors.description = 'Required';
        }

        return errors;
      }}
      onSubmit={async (values, { resetForm }) => {
        getTransactionData ?
          await updateTransaction({ variables: { _id: getTransactionData?._id, ...values, amount:Number(values?.amount), transactionType } })
          :
          await addTransaction({ variables: { ...values, amount:Number(values?.amount), transactionType } });
        resetForm();
        setOpen(false);
        await getTransactionByMonthRefetch();
      }}
    >
      {({ submitForm, isSubmitting, values, setFieldValue }) => (
        <React.Fragment>
          {
            getTransactionData ?
              (<Tooltip title="Edit">
                <IconButton>
                  <EditOutlinedIcon onClick={handleClickOpen} />
                </IconButton>
              </Tooltip>)
              :
              (<Button
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
              )}
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
              {transactionType === "income" ? getTransactionData ? "Edit Income" : "Add Income" : getTransactionData ? "Edit Expense" : "Add Expense"}
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
                      format="DD-MM-YYYY"
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
                    type="number"
                    name="amount"
                    label="Amount"
                    variant="outlined"
                    fullWidth
                    InputProps={{ inputProps: {min: 1, max: 10000000} }}
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
              <Button loading={ addTransactionLoading || updateTransactionLoading } loadingPosition="start" autoFocus onClick={submitForm}>
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
