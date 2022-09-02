import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const StatusSnackbar = ({ color, snackbarOpen, message, severity, handleSnackbarClose }) => {
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