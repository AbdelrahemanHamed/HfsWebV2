// Loader.js
import React from "react";
import { Box } from "@mui/material";
import loadingGif from "@/assets/images/layout/loader.gif"; // Import the GIF from assets

const Loader = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#04020b", // Optional background color
    }}
  >
    <img src={loadingGif} alt="Loading..." width="500px" height="500px" />
  </Box>
);

export default Loader;
