import { Box, Typography } from "@mui/material";
import vector3 from "@/assets/images/vector3.png";
import vector4 from "@/assets/images/vector4.png";

import css from "./style.module.css";

function OurStory() {
  return (
    <Box
      sx={{ position: "relative", overflow: { xs: "hidden", md: "visible" } }}
    >
      <Box className="container" sx={{ position: "relative", zIndex: 1, p: 6 }}>
        <Typography
          className={css.my_title}
          sx={{
            fontSize: { xs: "50px ", md: "75px" },
            letterSpacing: { xs: "20px", md: "50px" },
          }}
        >
          OUR STORY
        </Typography>

        <Typography
          sx={{
            width: { xs: "100%", md: "70%" },
            mx: "auto",
            mt: "30px",
            textAlign: "center",
            fontFamily: "SF Pro Display",
            fontSize: { xs: "17px", md: "22px" },
            lineHeight: "23.87px",
          }}
        >
          At HFS, we believe that success is not just measured by numbers, but
          by the connections we build, the lives we touch, and the dreams we
          help turn into reality. Founded with a simple yet profound vision, HFS
          stands for Home, Family, and Supporta reflection of the values that
          guide everything we do.
          <br />
          {/* <Box sx={{ mt: "10px" }} /> */}
          Our journey began with a desire to create more than just a business.
          We wanted to build a community where people can thrive together,
          supporting each other in reaching their highest potential. We
          recognized that in today’s fast-paced world, people are searching for
          something deeper genuine connections, meaningful opportunities, and a
          sense of belonging. That’s what HFS is all about.
          {/* <Box sx={{ mt: "10px" }} /> */}
          <br />
          We bring together the power of network marketing, trading expertise,
          programming solutions, and wellness products to offer holistic growth
          opportunities. Our products are designed to enhance your financial,
          mental, and physical well-being, while our supportive community lifts
          you up every step of the way. We are more than just a company we are a
          family that stands by you.
          {/* <Box sx={{ mt: "10px" }} /> */}
          <br />
          At HFS, we’re here to support your journey, no matter where it begins.
          Whether you’re looking to build a thriving business, improve your
          skills, or live a healthier life, we provide the tools and the network
          to help you achieve your goals. Together, we rise, and together, we
          succeed. Join us at HFS, where home, family, and support meet
          opportunity.
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100vh",
          height: "100vh",
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
      >
        <Box
          component="img"
          src={vector3}
          sx={{ width: "100%", height: "100%", opacity: 0.2 }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100px", md: "179px" },
          position: "absolute",
          right: "0",
          bottom: "0",
          zIndex: 0,
        }}
      >
        {/* <Box
          sx={{ width: "100%", height: "100%" }}
          component="img"
          // src={vector4}
        /> */}
      </Box>
    </Box>
  );
}

export default OurStory;
