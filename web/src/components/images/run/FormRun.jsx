import * as React from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FormRun = ({
    open,
    handleClose,
    handleContainerRun,
    containerName,
    setContainerName,
    portLocal,
    setPortLocal,
    portContainer,
    setPortContainer
}) => {
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Container</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can set optional settings for the new container.
                    </DialogContentText>
                    <Stack>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Container Name"
                            type="text"
                            variant="standard"
                            size='small'
                            value={containerName}
                            onChange={e => setContainerName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="portLocal"
                            label="Port Local"
                            type="text"
                            variant="standard"
                            size='small'
                            value={portLocal}
                            onChange={e => setPortLocal(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="portContainer"
                            label="Port Container"
                            type="text"
                            variant="standard"
                            size='small'
                            value={portContainer}
                            onChange={e => setPortContainer(e.target.value)}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' size='small' onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' size='small' onClick={handleContainerRun}>Run</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormRun;