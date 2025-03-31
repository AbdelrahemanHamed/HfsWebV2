import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import useApi from "@/api";

export default function FirstTable({ sidebarOpen }) {
  // config
  const api = useApi();

  // data
  const [volume, setVolume] = useState({
    left_leg_volume: "-",
    right_leg_volume: "-",
  });
  const [count, setCount] = useState({
    left_downlines_count: "-",
    right_downlines_count: "-",
  });

  // methods
  const getVolumes = async () => {
    try {
      const res = await api.get("/downlines-volume");

      const data = await res.data.notwork_voluum;

      setVolume(data);
    } catch (err) {
      toast.error(err.response?.data?.message);

      console.error(err);
    }
  };
  const getCounts = async () => {
    try {
      const res = await api.get("/downline-counts");

      const data = await res.data.count;

      setCount(data);
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.error(err);
    }
  };

  // on render
  useEffect(() => {
    getVolumes();
    getCounts();
  }, []);

  return (
    <Box
      sx={{
        width: sidebarOpen
          ? { xs: "100%", md: "600px", xl: "900px" }
          : { xs: "100%", md: "700px", xl: "900px" },
        height: { xs: "288px", xl: "288px" },
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(280.13deg, #DC4B9A 40.3%, #51D5F5 59.7%)",
          height: "71px",
          borderRadius: "15px 15px 0 0",
          display: "flex",
          justifyContent: "space-between",
          px: "30px",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "19px" }}>LEFT</Typography>
        <Typography sx={{ fontSize: "19px" }}>Network status</Typography>
        <Typography sx={{ fontSize: "19px" }}>RIGHT </Typography>
      </Box>

      <Box
        sx={{
          height: "auto",
          px: "30px",
          py: "50px",
          backgroundColor: "#091B29",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          borderRadius: "0 0  15px 15px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography> 0</Typography>
          <Typography>{volume.left_leg_volume}</Typography>
          <Typography>{count.left_downlines_count}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography>Rank volume</Typography>
          <Typography>Total Network volume</Typography>
          <Typography>Total down line </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography>0</Typography>
          <Typography>{volume.right_leg_volume}</Typography>
          <Typography>{count.right_downlines_count}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
