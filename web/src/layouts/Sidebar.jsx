import React from "react";
import { Link } from "react-router-dom";
import { Box, Drawer, Toolbar, List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import GradientIcon from '@mui/icons-material/Gradient';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import HelpIcon from '@mui/icons-material/Help';
import { CONTAINERS, DASHBOARD, HELP, IMAGES, VOLUMES } from "../constants/routes";

const drawerWidth = 180;

const sidebarMenuItems = [
  {
    label: 'Dashboard',
    path: DASHBOARD,
    icon: <DashboardIcon />
  },
  {
    label: 'Images',
    path: IMAGES,
    icon: <GradientIcon />
  },
  {
    label: 'Containers',
    path: CONTAINERS,
    icon: <ViewListIcon />
  },
  {
    label: 'Volumes',
    path: VOLUMES,
    icon: <ViewAgendaIcon />
  },
  {
    label: 'Help',
    path: HELP,
    icon: <HelpIcon />
  }
];

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sidebarMenuItems.map(
            (item, _index) => (
              <ListItem component={Link} to={item.path} key={item.label}>
                <ListItemIcon sx={{ minWidth: '36px' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText sx={{ color: '#000000' }} primary={item.label} />
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
