import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function AlertError() {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">Error — check it out!</Alert>
        </Stack>
    );
}
export default AlertError;