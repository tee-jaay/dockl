import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ViewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/HighlightOffTwoTone';
import Layout from '../../layouts/Layout';
import ComponentHeader from '../inc/ComponentHeader';
import DockerCommands from '../../constants/commands';
import AlertError from '../inc/AlertError';
import ProgressBarLinear from '../inc/ProgressBarLinear';

const VolumeList = () => {
    const [volumes, setVolumes] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        getVolumeList();
    }, []);

    async function getVolumeList() {
        setIsLoading(true);
        try {
            const res = await eel.get_volume_list(DockerCommands.PASSWORD_SUDO, DockerCommands.VOLUME_LIST)();
            console.log(res);
            setVolumes(res.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const handleVolumeDelete = async (volumeId) => {
        setIsLoading(true);
        setVolumes([]);
        const command = `${DockerCommands.VOLUME_DELETE} ${volumeId}`;
        const password = DockerCommands.PASSWORD_SUDO;
        try {
            if (volumeId !== null) {
                const res = await eel.volume_delete(password, command)();
                if (res[0] === volumeId) {
                    console.log(res[0], "volume delete success");
                }
            }
        } catch (error) {
            console.log(error);
        }
        getVolumeList();
        setIsLoading(false);
    };

    return (
        <Layout>
            {/* <ComponentHeader title={"docker volume ls"} /> */}
            {!isLoading && error && <AlertError />}
            {isLoading && !error && <ProgressBarLinear />}
            {!isLoading && !error && volumes &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>DRIVER</TableCell>
                                        <TableCell>LABELS</TableCell>
                                        <TableCell>LINKS</TableCell>
                                        <TableCell>MOUNTPOINT</TableCell>
                                        <TableCell>NAME</TableCell>
                                        <TableCell>SCOPE</TableCell>
                                        <TableCell>SIZE</TableCell>
                                        <TableCell>ACTION</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {volumes.map((volume, _index) =>
                                        <TableRow key={volume?.Name}>
                                            <TableCell>{volume?.Driver}</TableCell>
                                            <TableCell>{volume?.Labels ? volume?.Labels : "N/A"}</TableCell>
                                            <TableCell>{volume?.Links}</TableCell>
                                            <TableCell>
                                                <span title={volume?.Mountpoint}>
                                                    {`${volume?.Mountpoint.substring(0, 16)}...`}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span title={volume?.Name}>
                                                    {`${volume?.Name.substring(0, 12)}...`}
                                                </span>
                                            </TableCell>
                                            <TableCell>{volume?.Scope}</TableCell>
                                            <TableCell>{volume?.Size}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Inspect" placement="left" sx={{ cursor: 'pointer' }} >
                                                    <ViewIcon color='info' />
                                                </Tooltip>
                                                <Tooltip title="Delete" placement="right" onDoubleClick={() => handleVolumeDelete(volume?.Name)} sx={{ cursor: 'pointer', marginLeft: '8px' }} >
                                                    <DeleteIcon color='error' />
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

            }
        </Layout>
    );
};

export default VolumeList;