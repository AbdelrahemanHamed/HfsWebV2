import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion"; // استيراد framer-motion
import { keyframes } from "@mui/system";
import { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";

// assets
// import About_img from "@/assets/images/aboutus_img.png";
import bg1 from "@/assets/images/bg1.webp";
import bg2 from "@/assets/images/bg2.webp";

import css from "./style.module.css";

const shadowPulse = keyframes`
  0% { box-shadow: 100px 0px 50px 1px rgba(0, 0,0, 0.75); }
  50% { box-shadow: 10px 50px 60px 3px rgba(219, 219, 219, 0.85); }
  100% { box-shadow: 10px 0px 50px 1px rgba(0, 0, 0, 1.0); }
`;

const rotateAndFade = keyframes`
  0% { transform: rotate(0deg); opacity: 1; }
  50% { transform: rotate(45deg); opacity: 0.5; }
  100% { transform: rotate(180deg 90deg); opacity: 0 2; }
  
`;
const Fade = keyframes`
  0% { transform:  opacity: 1; }
  25% { transform:  opacity: 0.1; }
  50% { transform:  opacity: 0.1; }
  75% { transform:  opacity: 0.1; }
  100% { transform:  opacity: 1; }
`;
function About() {
  const videoUrl = "https://api.hfssociety.com/assets/HFS.mp4";
  const init = [
    { label: "Years Experience", value: 10, start: 0 },
    { label: "Countries", value: 16, start: 0 },
    { label: "Ways to earn", value: 8, start: 0 },
  ];
  const [values, setValues] = useState(init);

  const handleAnimation = (index, start, end) => {
    setValues(init);
    const step = Math.random() * 3 + 1;
    let current = start;

    const interval = setInterval(() => {
      if (current >= end) {
        return clearInterval(interval);
      } else {
        current += step;
        setValues((v) =>
          v.map((n, i) =>
            i == index ? { ...n, start: Math.floor(current) } : n
          )
        );
      }
    }, 1);
  };

  return (
    <Box
      id="home"
      className={`container ${css.hero}`}
      sx={{
        pb: { xs: "30px", md: "0" },
        overflow: "visible",
        // pt: { xs: "20px", md: "10vh" },
      }}
    >
      {/* content */}
      <Box
        className={css.container}
        // sx={{
        //   width: "100%",
        //   flexDirection: { xs: "column", md: "row" },
        //   flexWrap: { xs: "wrap", md: "nowrap" },
        //   justifyContent: { xs: "center", md: "space-between" },
        // }}
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
            mb: { xs: 4, md: 0 },
            flex: 1,
            py: 5,
            width: "100%",
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 1.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            sx={{
              transform: "rotate(45deg)",
              position: "absolute",
            }}
          >
            <Box sx={{ 
              position: "relative",
              top: "0vh",
              right: "0vh", 
              }}>

            <Box
              component="img"
              // src={bg2}
              sx={{
                width: "30%",
              
                height: "100%",
                animation: `${Fade} 5s ease-in-out infinite`, // Adjust duration as needed
                backgroundPosition: "50px 100px", // Control position by pixels (horizontal vertical)
                backgroundRepeat: "no-repeat", // Ensure the background doesn't repeat
                backgroundSize: "contain", // Adjust size if needed
                zIndex: "-1",
              }}
            />
          </Box>
            </Box>

          <Box>
            <Typography
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              sx={{
                fontSize: { xs: "40px", md: "70px", xl: "90px" },
                fontWeight: "400",
                lineHeight: "1.1",
                fontFamily: "Bebas Neue",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Smart Business <br /> with Smart People
            </Typography>

            <Typography
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              sx={{
                fontSize: { xs: "16px", md: "20px", lg: "20px" },
                lineHeight: "1.5",
                fontWeight: "400",
                mt: 2,
              }}
            >
              Grow your business to the next level to
              <br /> improve your business performance to <br /> stay
              competitive
            </Typography>

            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              sx={{
                display: "flex",
                textAlign: "center",
                flexWrap: "wrap",
                m: "24px auto",
                width: "100%",
                justifyContent: "space-around",
                maxWidth: "600px",
              }}
            >
              {values.map((item, index) => (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  onViewportEnter={() => handleAnimation(index, 0, item.value)}
                  key={index}
                  sx={{
                    minWidth: "100px",
                    fontSize: { xs: "14px", sm: "20px", md: "25px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "36px", md: "48px" },
                      lineHeight: "1.2",
                      fontFamily: "Bebas Neue",
                    }}
                  >
                    {item.start}+
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "24px", md: "25px" },
                      lineHeight: "1.5",
                      color: "#BFA0A0",
                      fontFamily: "Bebas Neue",
                    }}
                  >
                    {item.label}
                  </Typography>
              
                </Box>
                
              ))}
              
            </Box>
            <Box 
              sx={{ 
                width: "100%",
                height: "0px", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                mb: { xs: 4, md: 0 },
                zIndex: "1",
                }}>
                  <Box 
                    sx={{ 
                      width: "35%", 
                      height: ".4px",
                      backgroundColor: "#BFA0A0", 
                      boxShadow: "0px 0px 15px 1px rgb(255, 255, 255)",
                      }}>
                    
                  </Box>
                </Box>
          </Box>
        </Box>

        {/* video */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          sx={{
            width: "100%",
            height: "100dvh",

            // width: { xs: "100%", md: "45%", lg: "58%" },
            position: "relative",
            flex: 1,
            zIndex: "1",
            mb: { xs: 4, md: 0 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "auto",
            }}
          />
          <div
            style={{
              width: "100%",
              // borderRadius: "20px",
              animation: `${shadowPulse} 1s ease-in-out infinite`,
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                // borderRadius: "20px",
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <Box>
              {/* <Box
                component="img"
                src={About_img}
                sx={{ width: "100%", height: "100%" }}
              /> */}
            </Box>
          </div>
        </Box>
      </Box>

      {/* background */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 1.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        sx={{
          width: "2000px",
          height: "2200px",
          position: "absolute",
          top: "-30vh",
          right: "-100vh",
          transform: "rotate(45deg)",
        }}
      >
        <Box
          // component="img"
          // src={bg1}
          // sx={{
          //   width: "100%",
          //   height: "100%",
          //   // animation: `${rotateAndFade} 5s ease-in-out infinite`, // Adjust duration as needed
          // }}
        />
      </Box>
    </Box>
  );
}

export default About;
