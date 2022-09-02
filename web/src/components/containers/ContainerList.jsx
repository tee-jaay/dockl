import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Stack, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PlayIcon from '@mui/icons-material/PlayCircleFilledTwoTone';
import StopIcon from '@mui/icons-material/StopCircleTwoTone';
import DeleteIcon from '@mui/icons-material/HighlightOffTwoTone';
import Layout from '../../layouts/Layout';
import ComponentHeader from '../inc/ComponentHeader';
import DockerCommands from '../../constants/commands';
import ProgressBarLinear from '../inc/ProgressBarLinear';
import AlertError from '../inc/AlertError';
import StatusSnackbar from '../inc/StatusSnackbar';

const ContainerList = () => {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [containers, setContainers] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        getContainerList();
    }, []);

    async function getContainerList() {
        try {
            const res = await eel.get_container_list(DockerCommands.PASSWORD_SUDO, DockerCommands.CONTAINER_LIST)();
            console.log(res);
            setContainers(res.data);
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }

    const handleContainerStart = async (containerId) => {
        setIsLoading(true);
        setContainers([]);
        const command = `${DockerCommands.CONTAINER_START} ${containerId}`;
        const password = DockerCommands.PASSWORD_SUDO;
        try {
            if (containerId !== null) {
                const res = await eel.container_start(password, command)();
                if (res[0] === containerId) {
                    setMessage("Container started");
                    setSnackbarOpen(true);
                }
            }
        } catch (error) {
            setError(error);
            console.log(error);
        }
        getContainerList();
        setIsLoading(false);
    };

    const handleContainerStop = async (containerId) => {
        setIsLoading(true);
        setContainers([]);
        const command = `${DockerCommands.CONTAINER_STOP} ${containerId}`;
        const password = DockerCommands.PASSWORD_SUDO;
        try {
            if (containerId !== null) {
                const res = await eel.container_stop(password, command)();
                if (res[0] === containerId) {
                    setMessage("Container stoped");
                    setSnackbarOpen(true);
                }
            }
        } catch (error) {
            console.log(error);
            setError(error);
        }
        getContainerList();
        setIsLoading(false);
    };

    const handleContainerDelete = async (containerId) => {
        setIsLoading(true);
        setContainers([]);
        const command = `${DockerCommands.CONTAINER_DELETE} ${containerId}`;
        const password = DockerCommands.PASSWORD_SUDO;
        try {
            if (containerId !== null) {
                const res = await eel.container_delete(password, command)();
                if (res[0] === containerId) {
                    setMessage("Container deleted");
                    setSnackbarOpen(true);
                }
            }
        } catch (error) {
            setError(error);
            console.log(error);
        }
        getContainerList();
        setIsLoading(false);
    };

    return (
        <Layout>
            {/* <ComponentHeader title={"docker container list --all"} /> */}
            {!isLoading && error && <AlertError />}
            {isLoading && !error && <ProgressBarLinear />}
            {!isLoading && !error &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>CONTAINER ID</TableCell>
                                        <TableCell>IMAGE</TableCell>
                                        <TableCell>PORTS</TableCell>
                                        <TableCell>NAMES</TableCell>
                                        <TableCell>ACTION</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {containers && containers.map((container, index) =>
                                        <TableRow key={container?.ID}>
                                            <TableCell>{container?.ID}</TableCell>
                                            <TableCell>{container?.Image}</TableCell>
                                            <TableCell>{container?.Ports ? container?.Ports : "N/A"}</TableCell>
                                            <TableCell>{container?.Names}</TableCell>
                                            <TableCell>
                                                {container?.State === "running" ?
                                                    <Tooltip title="Stop" placement="left" onClick={() => handleContainerStop(container?.ID)} sx={{ cursor: 'pointer' }} >
                                                        <StopIcon color='warning' />
                                                    </Tooltip>
                                                    :
                                                    <Stack direction="row">
                                                        <Tooltip title="Start" placement="left" onClick={() => handleContainerStart(container?.ID)} sx={{ cursor: 'pointer' }} >
                                                            <PlayIcon color='success' />
                                                        </Tooltip>
                                                        <Tooltip title="Delete" placement="right" onDoubleClick={() => handleContainerDelete(container?.ID)} sx={{ cursor: 'pointer' }} >
                                                            <DeleteIcon color='error' />
                                                        </Tooltip>
                                                    </Stack>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            }
            <StatusSnackbar
                snackbarOpen={snackbarOpen}
                message={message}
                color={"info"}
                severity="info"
                handleSnackbarClose={handleSnackbarClose}
            />
        </Layout>
    );
};

export default ContainerList;