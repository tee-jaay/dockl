import React, { useEffect, useState } from 'react'
import { Box, Card, Grid, Typography } from "@mui/material";
import DockerCommands from '../../constants/commands';
import Layout from '../../layouts/Layout'
import ComponentHeader from '../inc/ComponentHeader';
import AlertError from '../inc/AlertError';
import ProgressBarLinear from '../inc/ProgressBarLinear';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    async function getDashboardData() {
        const res = await eel.get_dashboard_data(DockerCommands.PASSWORD_SUDO, DockerCommands.DASHBOARD_DATA)();
        setData(res);
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
                        <Card sx={{ paddingX: '12px' }}>
                            <strong>Client:</strong> <br />
                            Context:    {data?.ClientInfo?.Context} <br />
                            Debug Mode:  {data?.ClientInfo?.Debug} <br />
                            <br />
                            Server:<br />
                            Containers: {data?.Containers}  <br />
                            Running: {data?.ContainersRunning} <br />
                            Paused:{data?.ContainersPaused}  <br />
                            Stopped:{data?.ContainersStopped} <br />
                            Images: {data?.Images}  <br />
                            Server Version: {data?.ServerVersion}<br />
                            Storage Driver: {data?.Driver} br<br />
                            Driver Status: <br />
                            {data?.DriverStatus.map((item, index) => <><b key={index}>{item}</b> <br /></>)}
                            Logging Driver: {data?.LoggingDriver}  <br />
                            Cgroup Driver: {data?.CgroupDriver} <br />
                            Cgroup Version: {data?.CgroupVersion}  <br />
                            Plugins: <br />
                            Volume: {data?.Plugins?.Volume.map((item, _index) => <u key={item}>{`${item} `}</u>)}  <br />
                            Network: {data?.Plugins?.Network.map((item, _index) => <i key={item}>{`${item} `}</i>)}<br />
                            Log: {data?.Plugins?.Log.map((item, _index) => <b key={item}>{`${item} `}</b>)}<br />
                            Swarm: {data?.Swarm?.LocalNodeState}<br />
                            Runtimes: ... <br />
                            Default Runtime: runc  <br />
                            Init Binary: {data?.InitBinary}<br />
                            containerd version:<br />
                            runc version:  <br />
                            init version:  <br />
                            Security Options:  <br />
                            apparmor
                            seccomp
                            Profile: default br<br />
                            cgroupns
                            Kernel Version: {data?.KernelVersion}  <br />
                            Operating System: {data?.OperatingSystem}<br />
                            OSType: {data?.OSType}  <br />
                            Architecture: {data?.Architecture} <br />
                            CPUs: {data?.NCPU}<br />
                            Total Memory: {data?.MemTotal} <br />
                            Name: {data?.Name} <br />
                            ID: {data?.ID} <br />
                            Docker Root Dir: {data?.DockerRootDir} <br />
                            Debug Mode: false <br />
                            Registry: {data?.IndexServerAddress} <br />
                            Labels: <br />
                            Experimental: {data?.ExperimentalBuild} <br />
                            Insecure Registries: <br />
                            {data?.RegistryConfig?.InsecureRegistryCIDRs[0]} <br />
                            Live Restore Enabled: {data?.LiveRestoreEnabled} <br />
                            System time: {data?.SystemTime}
                        </Card>
                    </Grid>
                </Grid>
            }
        </Layout>
    )
}

export default Dashboard