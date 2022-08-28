import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Paper, Toolbar } from "@mui/material";

function Layout({ children }) {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Box component={Paper}>
            {children}
          </Box>
        </Box>
        <Footer sx={{ backgroundColor: 'red' }} />
      </Box>
    </React.Fragment>
  );
}

export default Layout;
