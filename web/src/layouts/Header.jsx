import React from "react";
import { Box, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar variant="dense">
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box sx={{ width: '180px' }}>
            DockL
          </Box>
          <Box sx={{ backgroundColor: '#1565c0', padding: '4px 8px', borderRadius: '4px', minWidth: '480px' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>
                Containers: 7
              </span>
              <span>
                Running: 0
              </span>
              <span>
                Paused: 0
              </span>
              <span>
                Stopped: 7
              </span>
              <span>
                Images: 4
              </span>
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
