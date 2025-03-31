import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const target = 100; // Monthly target
const progress = 65; // Current progress (can be dynamically calculated)

function RegisterPopup() {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (progressValue < (progress / target) * 100) {
        setProgressValue(prev => Math.min(prev + 1, (progress / target) * 100));
      } else {
        clearInterval(progressInterval);
      }
    }, 10); // Change progress every 10ms for a smooth transition

    return () => clearInterval(progressInterval);
  }, [progressValue]);

  return (
    <Box
      sx={{
        width: "100%",
        height: {
          xs: "100%",
          md: "80%",
        },
        
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        pt: "30px",
        alignItems: "center",
        background: "linear-gradient(180deg, #2D1220 7.03%, #5E2C52 99.97%)",
        borderRadius: "15px",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "white",
          pb: "30px",
        }}
      >
        OUR TARGET
      </Typography>
      <Box sx={{ width: "100%", height: "5px", background: "#171118" }}></Box>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          variant="determinate"
          value={progressValue} // Use the animated value
          size={250}
          thickness={4}
          sx={{
            color: "#51d5f5",
            animation: "pulse 1.5s infinite ease-in-out", // Pulse animation on progress circle
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          {`${progress}%`}
        </Box>
      </Box>
    </Box>
  );
}

export default RegisterPopup;
