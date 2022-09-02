import * as React from 'react';
import { Avatar, Box, Chip, Paper, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import DockerCommands from '../../../constants/commands';


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function SearchResult({ imagesSummaries, imagesCount }) {
    const [expanded, setExpanded] = React.useState('panel1');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleChange = (panel) => (_event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleClickPull = async (imageSlug) => {
        console.log(imageSlug);
        setIsLoading(true);
        console.log(isLoading);
        const command = `${DockerCommands.IMAGE_PULL} ${imageSlug}`;
        const password = DockerCommands.PASSWORD_SUDO;
        try {
            const res = await eel.image_pull(password, command)();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
        console.log(isLoading);
        console.log({ res });
    };

    const pullButton = (slug) => {
        if (isLoading) {
            return <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<CloudDownloadIcon />}
                variant="contained"
                size="small"
                color="info"
                onClick={() => handleClickPull(slug)}
            >
                Pull
            </LoadingButton>;
        } else {
            return <LoadingButton
                startIcon={<CloudDownloadIcon />}
                variant="contained"
                size="small"
                color="info"
                onClick={() => handleClickPull(slug)}
            >
                Pull
            </LoadingButton>;
        }
    };

    console.log(imagesSummaries && imagesSummaries);

    return (
        <Box sx={{ padding: '24px' }}>
            <Box component={Paper}>
                {imagesSummaries.map((item, index) =>
                    <Accordion expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)} key={item.id}>
                        <AccordionSummary aria-controls={`panel${index + 1}d-content`} id={`panel${index + 1}d-header`}>
                            <Stack direction={'row'}>
                                <Chip
                                    avatar={<Avatar alt={item?.name} src={item.logo_url.small ? item.logo_url.small : item.logo_url.large} />}
                                    label={<Typography sx={{ fontWeight: 'bold' }}>{item?.name}</Typography>}
                                    variant="outlined"
                                />
                                <Typography variant='div' sx={{ marginLeft: '8px', color: item?.certification_status === "certified" ? "green" : "yellow" }}>{item?.certification_status}</Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1">By {item?.publisher?.name}
                                <Typography variant='body2'>{item?.updated_at ? item?.updated_at : item?.created_at} ago</Typography>
                            </Typography>
                            <Box>
                                {item?.architectures.map((architecture, index) => (
                                    <Chip key={index} label={architecture?.name} size="small" />
                                ))}
                            </Box>
                            <Typography>Popularity: {item?.popularity}</Typography>
                            <Typography>Operating Systems: {item?.operating_systems.map((os, index) => <span style={{ fontStyle: 'italic', paddingX: '12px', paddingY: '8px', marginRight: '8px' }} key={index}>{os.label}</span>)}</Typography>
                            <Typography>Source: {item?.source}</Typography>
                            <Typography>Star Count: {item?.star_count}</Typography>
                            <Typography>Type: {item?.type}</Typography>
                            <Typography>Categories: {item?.categories.map((category, _index) => <Box key={category.name}>{category.label}</Box>)}</Typography>
                            <Typography>
                                Description: {item?.short_description}
                            </Typography>
                            {
                                pullButton(item?.slug)
                            }
                        </AccordionDetails>
                    </Accordion>
                )}
            </Box>
        </Box>
    );
}
export default SearchResult;