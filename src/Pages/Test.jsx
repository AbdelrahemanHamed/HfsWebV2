import { Box, Typography } from "@mui/material";
function Test() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "125px",
          height: "152px",
          borderRadius: "15px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(124.86deg, #63CCEC 7.03%, #E44896 92.97%)",
            width: "100%",
            height: "40%",
            borderRadius: "15px 15px 0 0",
          }}
        ></Box>

        <Box
          sx={{
            backgroundColor: "#02070B",
            height: "60%",
            borderRadius: "0 0 15px 15px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "10px" }}>Abdelraheman Hamed</Typography>
          <Typography sx={{ fontSize: "10px" }}>id</Typography>
        </Box>
        <Box
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        ></Box>
      </Box>
    </Box>
  );
}

export default Test;
