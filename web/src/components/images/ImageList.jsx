import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Stack, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RunContainerIcon from '@mui/icons-material/ForwardTwoTone';
import InspectIcon from '@mui/icons-material/RemoveRedEye';
import NewImageIcon from '@mui/icons-material/AddToQueue';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Layout from '../../layouts/Layout';
import ComponentHeader from '../inc/ComponentHeader';
import DockerCommands from '../../constants/commands';
import FormRun from './run/FormRun';
import AlertError from '../inc/AlertError';
import ProgressBarLinear from '../inc/ProgressBarLinear';
import { faker } from '@faker-js/faker';
import NewImage from './new/NewImage';

const ImageList = () => {
    const [open, setOpen] = useState(false);
    const [openNewImage, setOpenNewImage] = useState(false);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [containerName, setContainerName] = useState(null);
    const [portLocal, setPortLocal] = useState(null);
    const [portContainer, setPortContainer] = useState(null);

    useEffect(() => {
        getImageList();
    }, []);

    async function getImageList() {
        setIsLoading(true);
        try {
            const res = await eel.get_image_list(DockerCommands.PASSWORD_SUDO, DockerCommands.IMAGE_LIST)();
            setImages(res.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const handleClickOpen = (name) => {
        setImageName(name);
        setOpen(true);
    };

    const handleClose = () => {
        setImageName(null);
        setOpen(false);
    };

    const handleContainerRun = async () => {
        console.log({ imageName });
        let newPorts;
        setOpen(false);
        setIsLoading(true);
        setImages([]);
        const randomContainerName = faker.animal.type().toLowerCase() + "_" + imageName;
        const newContainerName = containerName ? containerName.toLowerCase() : randomContainerName;
        if (portLocal && portContainer) {
            newPorts = `-p 127.0.0.1:${portLocal}:${portContainer}`;
        } else {
            newPorts = '';
        }
        const command = `${DockerCommands.CONTAINER_RUN} --name ${newContainerName} ${newPorts} -d ${imageName}`;
        const password = DockerCommands.PASSWORD_SUDO;
        console.log(command);
        try {
            const res = await eel.container_run(password, command)();
            console.log("handleContainerRun", res);
        } catch (error) {
            console.log(error);
        }
        setImageName(null);
        getImageList();
        setIsLoading(false);
    };

    const handleInspect = (id) => {
        console.log("handleInspect", id);
    };

    const handleRemove = async (imageId) => {
        console.log("handleRemove", imageId);
        setIsLoading(true);
        const command = `${DockerCommands.IMAGE_REMOVE} ${imageId}`;
        const password = DockerCommands.PASSWORD_SUDO;
        console.log(command);
        try {
            const res = await eel.image_destroy(password, command)();
            console.log({ res });
        } catch (error) {
            console.log(error);
        }
        setImages([]);
        getImageList();
        setIsLoading(false);
    };

    const handleClickNewImageOpen = () => {
        setOpenNewImage(true);
    };
    const handleClickNewImageClose = () => {
        setOpenNewImage(false);
    };

    return (
        <Layout>
            {!isLoading && error && <AlertError />}
            {isLoading && !error && <ProgressBarLinear />}
            {!isLoading && !error && images &&
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>REPOSITORY</TableCell>
                                        <TableCell>TAG</TableCell>
                                        <TableCell>IMAGE ID</TableCell>
                                        <TableCell>CREATED</TableCell>
                                        <TableCell>SIZE</TableCell>
                                        <TableCell>ACTION</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {images.map((image, _index) =>
                                        <TableRow key={image?.ID}>
                                            <TableCell>{image?.Repository}</TableCell>
                                            <TableCell>{image?.Tag}</TableCell>
                                            <TableCell>{image?.ID}</TableCell>
                                            <TableCell>
                                                <span title={image?.CreatedSince}>
                                                    {image?.CreatedAt.substring(0, 11)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span title={`Virtual Size :${image?.VirtualSize}`}>
                                                    {image?.Size}
                                                </span>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Stack direction={"row"} spacing={1}>
                                                    <Button startIcon={<RunContainerIcon />} variant='contained' size='small' color='info' sx={{ fontSize: '10px' }} onClick={() => handleClickOpen(image?.ID)}>Run</Button>
                                                    <InspectIcon sx={{ cursor: 'pointer' }} color='success' onClick={() => handleInspect(image?.ID)} />
                                                    <Tooltip title="double click">
                                                        <DeleteForeverIcon sx={{ cursor: 'pointer' }} color="error" onDoubleClick={() => handleRemove(image?.ID)} />
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginY: '8px' }}>
                                <Button onClick={handleClickNewImageOpen} size="small" startIcon={<NewImageIcon />}>
                                    New Image
                                </Button>
                            </Box>
                        </TableContainer>
                    </Grid>
                </Grid>
            }

            <FormRun
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                handleContainerRun={handleContainerRun}
                containerName={containerName}
                setContainerName={setContainerName}
                portLocal={portLocal}
                setPortLocal={setPortLocal}
                portContainer={portContainer}
                setPortContainer={setPortContainer}
            />

            <NewImage
                openNewImage={openNewImage}
                handleClickNewImageClose={handleClickNewImageClose}
            />
        </Layout>
    );
};

export default ImageList;