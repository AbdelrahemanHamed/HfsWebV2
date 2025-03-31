import { Box, Typography } from "@mui/material";

// assets
import vector1 from "@/assets/images/pages_assets/vector1.png";
import border from "@/assets/images/pages_assets/border.png";
import jade from "@/assets/images/pages_assets/jade.png";
import pearl from "@/assets/images/pages_assets/pearl.png";
import sapphire from "@/assets/images/pages_assets/sapphire.png";

function MembershipTier() {
  return (
    <Box className="container">
      <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
        Membership Tier
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${border})`,
            width: "176px",
            height: "176px",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "133px", height: "133px" }}>
            <Box
              component="img"
              sx={{ width: "100%", height: "100%" }}
              src={vector1}
            />
          </Box>
        </Box>
        <Typography sx={{ letterSpacing: "10px" }}>JADE</Typography>

        <Typography>
          300 <sup>Days</sup>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "space-between" },
          mt: "100px",
          gap: "10px",
        }}
      >
        <Box sx={{ width: "292px", height: "605px" }}>
          <Box
            sx={{ width: "100%", height: "100%" }}
            component="img"
            src={jade}
          />
        </Box>
        <Box sx={{ width: "292px", height: "605px" }}>
          <Box
            sx={{ width: "100%", height: "100%" }}
            component="img"
            src={pearl}
          />
        </Box>
        <Box sx={{ width: "292px", height: "605px" }}>
          <Box
            sx={{ width: "100%", height: "100%" }}
            component="img"
            src={sapphire}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default MembershipTier;
