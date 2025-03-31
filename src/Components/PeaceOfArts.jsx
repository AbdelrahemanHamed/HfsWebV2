import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { keyframes } from "@mui/system";

import css from "./Home/OurStory/style.module.css";

// import { Autoplay } from "swiper"; // Add Autoplay here
// import peace_of_arts_img from "@/assets/peace_of_arts_img.png";
import img1 from "@/assets/images/peace_of_art_imgs/img1.png";
import img2 from "@/assets/images/peace_of_art_imgs/img2.png";
import img3 from "@/assets/images/peace_of_art_imgs/img3.png";
import img4 from "@/assets/images/peace_of_art_imgs/img4.png";
import img5 from "@/assets/images/peace_of_art_imgs/img5.png";
import img6 from "@/assets/images/peace_of_art_imgs/img6.png";
import img7 from "@/assets/images/peace_of_art_imgs/img7.png";
import img8 from "@/assets/images/peace_of_art_imgs/img8.png";
import img9 from "@/assets/images/peace_of_art_imgs/img9.png";
import img10 from "@/assets/images/peace_of_art_imgs/img10.png";
import img11 from "@/assets/images/StarsBG.png";
import Triangle from "@/assets/images/Trianle.png";
import BlueRing from "@/assets/images/BlueRing.png";

function PeaceOfArts() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  return (
    <Box
      id="media"
      sx={{
        // Container for the peace of arts section
        backgroundImage: `url(${img11})`,
        overflow: {
          xs: "hidden",
          md: "visible",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // height: "100vh",
        },
      }}
    >
      <img
        src={Triangle}
        alt=""
        style={{
          position: "absolute",
          top: "50%",
          left: "75%",
          width: "30%",
          opacity: 0.4,
          // height: "60%",
          zIndex: "-1",
          animation: `Fade 5s ease-in-out infinite`, // Adjust duration as needed
        }}
      />
      <img
        src={Triangle}
        alt=""
        style={{
          position: "absolute",
          bottom: "70%",
          right: "80%",
          width: "30%",
          opacity: 0.6,
          filter: "blur(20px)",

          // height: "60%",
          zIndex: "-1",
          animation: `Fade 5s ease-in-out infinite`, // Adjust duration as needed
        }}
      />
      <img
        src={BlueRing}
        alt=""
        style={{
          position: "absolute",
          top: "80%",
          right: "85%",
          width: "20%",
          // height: "40%",
          zIndex: "-1",
          animation: `Fade 2s 5s ease-in-out infinite`, // Adjust duration as needed
        }}
      />

      {/* Title */}
      <Typography
        id="media"
        className={css.my_title}
        sx={{
          fontSize: { xs: "50px ", md: "75px" },
          letterSpacing: { xs: "20px", md: "50px" },
          my: 5,
        }}
      >
        EVENTS
      </Typography>
      {/* pics slider */}
      <Box
        sx={{
          my: 5,
          overflow: "hidden",
          width: "90%",
          backgroundColor: "#19151d",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box width={"100%"} pt={"0px"}>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            spaceBetween={"10px"}
            slidesPerView="auto"
            loop={true}
            dir="ltr"
            speed={10000}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {images.map((src, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "300px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      objectFit: "cover",
                      zIndex: 1,
                      filter: "blur(4px)",
                    }}
                  />
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "253px",
                      position: "relative",
                      zIndex: 2,
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "100%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView="auto"
            loop={true} // Enable looping
            dir="rtl" // Ensures LTR direction
            rtl="true"
            speed={12000}
            style={{ width: "100%", height: "100%" }}
          >
            {images.map((src, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "300px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      objectFit: "cover",
                      zIndex: 1,
                      filter: "blur(4px)",
                    }}
                  />
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "253px",
                      position: "relative",
                      zIndex: 2,
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}

export default PeaceOfArts;
