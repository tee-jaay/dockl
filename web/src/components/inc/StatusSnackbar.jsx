import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const StatusSnackbar = ({ snackbarOpen, message, severity, handleSnackbarClose }) => {
    return (
        <Snackbar open={snackbarOpen} onClose={handleSnackbarClose} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default StatusSnackbar;