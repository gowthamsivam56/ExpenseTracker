import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const SnackbarAlert =(props) => {
    const {open, message, onClose, severity} = props;

    return (
        <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} slots={{ transition: SlideTransition }} >
            <Alert
            onClose={onClose}
            severity={severity}
            variant="filled"
            sx={{ width: '100%' }}
            >
            {message}
            </Alert>
        </Snackbar>
        </div>
    );
};

export default SnackbarAlert;