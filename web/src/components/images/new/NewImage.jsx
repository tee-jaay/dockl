import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import SearchResult from './SearchResult';
import { Paper, TextField } from '@mui/material';
import AlertError from '../../inc/AlertError';
import ProgressBarLinear from '../../inc/ProgressBarLinear';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const NewImage = ({ openNewImage, handleClickNewImageClose, }) => {
    const [keyword, setKeyword] = React.useState('');
    const [imagesSummaries, setImagesSummaries] = React.useState([]);
    const [imagesCount, setImagesCount] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const searchKeyword = async () => {
        try {
            if (keyword.length > 3) {
                setIsLoading(true);
                let res = await eel.image_search(keyword)();
                setImagesCount(res?.count);
                setImagesSummaries(res?.summaries);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog
            fullScreen
            open={openNewImage}
            onClose={handleClickNewImageClose}
            TransitionComponent={Transition}
            sx={{ backgroundColor: 'rgb(243, 247, 247)' }}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClickNewImageClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 2 }} variant="body1" component="div">
                        Search & pull new image
                    </Typography>
                    <Paper sx={{ flex: 1 }}>
                        <TextField
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                            onKeyUp={searchKeyword}
                            focused
                            fullWidth
                            size="small"
                            id="image-name"
                            label=""
                            placeholder="Enter a docker image name"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon
                                        aria-label="search docker image"
                                        edge="end"
                                    >
                                    </SearchIcon>
                                )
                            }}
                        />
                    </Paper>
                </Toolbar>
            </AppBar>

            {isLoading && <ProgressBarLinear />}

            {error && !isLoading && <AlertError />}

            {!error && !isLoading && imagesSummaries &&
                <SearchResult
                    imagesSummaries={imagesSummaries}
                    imagesCount={imagesCount}
                />
            }
        </Dialog>
    );
};

export default NewImage;