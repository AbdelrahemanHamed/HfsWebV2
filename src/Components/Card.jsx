/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

function Card({ data }) {
  return (
    <Box
      sx={{
        width: "125px",
        height: "152px",
        position: "relative",
        boxShadow: "0px 2px 8.4px 3px #000000",
        borderRadius: "15px",
        alignSelf: "center",
      }}
    >
      <Box className="network-header" />

      <Box
        sx={{
          height: "97px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography sx={{ width: "100%", fontSize: "12px", mt: "20px" }}>
          {data.label}
        </Typography>
        <Typography sx={{ width: "100%", fontSize: "12px" }}>
          {data.id}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "76px",
          height: "76px",
          borderRadius: "50%",
          position: "absolute",
          backgroundColor: "#fff",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-80%)",
        }}
      />

      {/* الخط الرأسي */}

      {data.heightLine && (
        <Box
          sx={{
            width: "3px",
            height: `${data.heightLine}px`,
            backgroundColor: "#fff",
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      )}

      {/* الخط الأفقي بعرض متغير */}
      {data.lineWidth && (
        <Box
          sx={{
            width: `${data.lineWidth}px`,
            height: "4px",
            backgroundColor: "#fff",
            position: "absolute",
            top: "160%",
            left: "50%",
            transform: "translateX(-50%)",
            "&::after": {
              content: "'R'",
              position: "absolute",
              right: "-30px",
              top: "-10px",
            },
            "&::before": {
              content: "'L'",
              position: "absolute",
              left: "-30px",
              top: "-10px",
            },
          }}
        />
      )}
    </Box>
  );
}

export default Card;
