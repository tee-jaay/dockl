import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function AlertError({ errorMessage }) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{errorMessage ? "Error: " + errorMessage : "Error occured"}</Alert>
        </Stack>
    );
}
export default AlertError;