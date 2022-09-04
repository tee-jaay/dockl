import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const StatusSnackbar = ({ snackbarObj, handleSnackbarClose }) => {
    if (import.meta.env.PROD) {
        console.log(snackbarObj);
    }
    const { color, snackbarOpen, message, severity } = snackbarObj;
    return (
        <Snackbar
            open={snackbarOpen}
            onClose={handleSnackbarClose}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            sx={{ border: '1px solid #dedede' }}
        >
            <Alert color={color} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default StatusSnackbar;