import React, { useEffect, useState } from 'react';
import { Box, Card, CardHeader, Grid, Typography } from "@mui/material";
import DockerCommands from '../../constants/commands';
import Layout from '../../layouts/Layout';
import ComponentHeader from '../inc/ComponentHeader';
import AlertError from '../inc/AlertError';
import ProgressBarLinear from '../inc/ProgressBarLinear';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getDashboardData() {
        try {
            const res = await eel.get_dashboard_data(DockerCommands.PASSWORD_SUDO, DockerCommands.DASHBOARD_DATA)();
            setData(res);
        } catch (err) {
            setError(err);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getDashboardData();
    }, []);

    console.log(data && data);

    return (
        <Layout>
            {/* <ComponentHeader title={"Dashboard"} /> */}
            {!isLoading && error && <AlertError />}
            {isLoading && !error && <ProgressBarLinear />}
            {!error && !isLoading && data &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card sx={{ paddingX: '12px', marginBottom: '16px' }}>
                            ID: {data?.data?.ID} <br />
                            <strong>Client:</strong> <br />
                            Context:    {data?.data?.ClientInfo?.Context} <br />
                            Debug Mode:  {data?.data?.ClientInfo?.Debug} <br />
                            <br />
                            Server:<br />
                            Containers: {data?.data?.Containers}  <br />
                            Running: {data?.data?.ContainersRunning} <br />
                            Paused:{data?.data?.ContainersPaused}  <br />
                            Stopped:{data?.data?.ContainersStopped} <br />
                            Images: {data?.data?.Images}  <br />
                            Server Version: {data?.data?.ServerVersion}<br />
                            Storage Driver: {data?.data?.Driver} br<br />

                            Logging Driver: {data?.data?.LoggingDriver}  <br />
                            Cgroup Driver: {data?.data?.CgroupDriver} <br />
                            Cgroup Version: {data?.data?.CgroupVersion}  <br />
                            Swarm: {data?.data?.Swarm?.LocalNodeState}<br />
                            Runtimes: ... <br />
                            Default Runtime: runc  <br />
                            Init Binary: {data?.data?.InitBinary}<br />
                            containerd version:<br />
                            runc version:  <br />
                            init version:  <br />
                            Docker Root Dir: {data?.data?.DockerRootDir} <br />
                            Debug Mode: false <br />
                            Registry: {data?.data?.IndexServerAddress} <br />
                        </Card>
                        <Card sx={{ paddingX: '12px', marginBottom: '16px' }}>
                            Plugins: <br />
                            Volume: {data?.data?.Plugins?.Volume.map((item, _index) => <u key={item}>{`${item} `}</u>)}  <br />
                            Network: {data?.data?.Plugins?.Network.map((item, _index) => <i key={item}>{`${item} `}</i>)}<br />
                            Log: {data?.data?.Plugins?.Log.map((item, _index) => <b key={item}>{`${item} `}</b>)}<br />
                        </Card>
                        <Card sx={{ paddingX: '12px', marginBottom: '16px' }}>
                            Security Options:  <br />
                            apparmor <br />
                            seccomp <br />
                        </Card>
                        <Card sx={{ paddingX: '12px', marginBottom: '16px' }}>
                            Profile: default br<br />
                            cgroupns <br />
                            Kernel Version: {data?.data?.KernelVersion}  <br />
                            Operating System: {data?.data?.OperatingSystem}<br />
                            OSType: {data?.data?.OSType}  <br />
                            Architecture: {data?.data?.Architecture} <br />
                            CPUs: {data?.data?.NCPU}<br />
                            Total Memory: {data?.data?.MemTotal} <br />
                            Name: {data?.data?.Name} <br />
                        </Card>
                        <Card sx={{ paddingX: '12px', marginBottom: '16px' }}>
                            Labels: <br />
                            Experimental: {data?.data?.ExperimentalBuild} <br />
                        </Card>
                        <Card sx={{ paddingX: '12px', marginBottom: '16px' }}>
                            Insecure Registries: <br />
                            {data?.data?.RegistryConfig?.InsecureRegistryCIDRs[0]} <br />
                            Live Restore Enabled: {data?.data?.LiveRestoreEnabled} <br />
                            System time: {data?.data?.SystemTime}
                        </Card>
                        <Card sx={{ paddingX: '12px', marginBottom: '16px' }}>
                            Driver Status: <br />
                            {data?.data?.DriverStatus.map((item, index) => <><b key={index}>{item}</b> <br /></>)}
                        </Card>
                    </Grid>
                </Grid>
            }
        </Layout>
    );
};

export default Dashboard;