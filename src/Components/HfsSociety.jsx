import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// assets
import hfs_scoiety_img from "@/assets/images/hfs-society-img.png";
import companyCallCard from "@/assets/images/company_call.png";

// Import Swiper styles
import "swiper/css";
function HfsSociety() {
  return (
    <Box
      id="Webinars"
      className="container"
      sx={{
        width: "100vw",
        overflow: "hidden !important;",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "469px", height: "469px" }}>
          <Box
            component="img"
            src={hfs_scoiety_img}
            sx={{ width: "100%", height: "100%" }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: { xs: "30px", md: "50px" },
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Want to join the community?
          <br />
          Join the next webinar
        </Typography>
      </Box>

      <Box sx={{ pt: "150px" }}>
        <Swiper spaceBetween={50} slidesPerView="auto">
          {[1, 2, 3, 4, 5].map((_, index) => {
            return (
              <SwiperSlide key={index} style={{ width: "min(100%, 420px)" }}>
                <Box
                  component="img"
                  src={companyCallCard}
                  sx={{ width: "100%", display: "block" }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
}

export default HfsSociety;
