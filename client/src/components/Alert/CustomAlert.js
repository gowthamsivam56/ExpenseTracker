import React from "react";
import SnackbarAlert from "./SnackbarAlert";


const withSeverity = (Alert, severity) => props => {
    return (
        <Alert {...props} severity={severity} />
    );
}

const Success = withSeverity(SnackbarAlert, 'success');
const Error = withSeverity(SnackbarAlert, 'error');
const Warning = withSeverity(SnackbarAlert, 'warning');

const useAlert = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');


    const handleOpen = (message) => {
        setOpen(false);
        setMessage(message);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return {
        open,
        message,
        handleOpen,
        handleClose
    }
};

export default useAlert;

export { Success, Error, Warning };