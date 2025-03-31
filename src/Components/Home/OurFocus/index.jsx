import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

// assets
import vector from "@/assets/images/vector.png";
import verctor2 from "@/assets/images/vector2.png";
import vector1 from "@/assets/images/bg1.webp";

import css from "./style.module.css";

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
function OurFocus() {
  return (
    <Box className={css.container} id="focus">
      <Box className="container">
        {/* first image */}
      <Box 
        display={{ md: "none" }} 
        sx={{ width: { xs: "100%", md: "173px" }, height: "173px" }}>
                <Box
                  component="img"
                  src={vector}
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                    height: "100%",
                    animation: `${rotate} 10s linear infinite`,
                  }}
                  
                />
              </Box>
        <Typography
          className={css.my_title}
          sx={{
            fontSize: { xs: "70px ", md: "75px" },
            letterSpacing: { xs: "20px", md: "50px" },
          }}
        >
          OUR FOCUS
        </Typography>

        <Box
          className={css.cover}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Box
            sx={{ position: "relative", width: { xs: "100%", md: "173px" } }}
          >
            <Box
              className={css.icon}
              sx={{ width: { xs: "100%", md: "173px" } }}
            >
              {/* secon image */}
              <Box 
                display={{ xs: "none", md: "block" }}
                sx={{ width: { xs: "100%", md: "173px" }, height: "173px" }}>
                  <Box
                    component="img"
                    src={vector}
                    sx={{
                      width: "100%",
                      objectFit: "contain",
                      height: "100%",
                      animation: `${rotate} 10s linear infinite`,
                    }}
                  />
              </Box>

              <Typography
                sx={{
                  fontSize: "75px",
                  fontFamily: "Tanseek Modern Pro Arabic",
                  lineHeight: "105.6px",
                  // display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  gap: { xs: "22px", md: 0 },
                  "& span": { display: "block" },
                }}
                display={{ xs: "none", md: "flex" }}
                
              >
                <span>S</span>
                <span>O</span>
                <span>C</span>
                <span>I</span>
                <span>E</span>
                <span>T</span>
                <span>Y</span>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* left side */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                pt: { md: "120px" },
                justifyContent: "center",
              }}
              alignItems={{ xs: "center", md: "flex-end" }}
            >
                {/* our vision */}
              <Box
                // className="card"
                sx={{
                  // width: "371px",
                  // height: "424px",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "linear-gradient(135deg, rgba(78, 42, 71, 0.1), rgba(217, 79, 156, 0.1))", // Gradient with 10% opacity
                  backdropFilter: 'blur(3px)', // Apply blur effect
                }}
                  width={{xs: "350px", md: "371px"}}
                  height={{xs: "324px", md: "424px"}}
              >
                {" "}
                <Box 
                width={{xs: "300px", md: "314px"}}
                height={{xs: "310px", md: "221px"}}
                sx={{ 
                  // width: "314px", 
                  // height: "221px",
                  // background: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
                  // backdropFilter: 'blur(20px)', // Apply blur effect
                  // border: '1px solid rgba(255, 255, 255, 0.3)', // Optional: subtle border for definition
                  // borderRadius: '10px', // Rounded corners
                  // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow
                  // // padding: '20px', // Inner spacing

                  }}>
                  <Typography
                    className="text-gradient"
                    sx={{
                      fontSize: "30px",
                      fontWeight: "900",
                      fontFamily: "SF Pro Display",
                      lineHeight: "35.8px",
                      mb: "20px",
                    }}
                  >
                    Our Vision
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontFamily: "SF Pro Display",
                      fontWeight: "400",
                      lineHeight: "23.87px",
                    }}
                  >
                    At HFS , our vision is to empower families worldwide by
                    providing the resources, support, and opportunities they
                    need to thrive. We aim to foster financial independence,
                    health, and well-being for every household, building a
                    stronger future together.
                  </Typography>
                </Box>
              </Box>
              {/* Our Objectives */}
              <Box
              width={{xs: "350px", md: "471px"}}
              height={{xs: "324px", md: "424px"}}
                // className="card"
                sx={{

                    borderRadius: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(135deg, rgba(78, 42, 71, 0.1), rgba(217, 79, 156, 0.1))", // Gradient with 10% opacity
                    backdropFilter: 'blur(3px)', // Apply blur effect
                }}
              >
                <Box sx={{ width: "314px", height: "221px" }}>
                  <Typography
                    className="text-gradient"
                    sx={{
                      fontSize: "30px",
                      fontWeight: "900",
                      fontFamily: "SF Pro Display",
                      lineHeight: "35.8px",
                      mb: "20px",
                    }}
                  >
                    Our Objectives
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontFamily: "SF Pro Display",
                      fontWeight: "400",
                      lineHeight: "23.87px",
                    }}
                  >
                    At HFS , our goal is to empower families with the resources
                    they need for financial independence and personal growth. We
                    focus on promoting health and wellness, building strong
                    communities, and continuously improving our services to meet
                    the evolving needs of families worldwide.
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* Right side */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
              alignItems={{ xs: "center", md: "flex-start" }}
            >
               {/* Our Mission */}
              <Box
                // className="card"
                sx={{
                  // width: "271px",
                  // height: "424px",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "linear-gradient(135deg, rgba(78, 42, 71, 0.1), rgba(217, 79, 156, 0.1))", // Gradient with 10% opacity
                  backdropFilter: 'blur(3px)', // Apply blur effect
                }}
                width={{xs: "350px", md: "471px"}}
                height={{xs: "324px", md: "424px"}}
              >
                <Box sx={{ width: "314px", height: "221px" }}>
                  <Typography
                    className="text-gradient"
                    sx={{
                      fontSize: "30px",
                      fontWeight: "900",
                      fontFamily: "SF Pro Display",
                      lineHeight: "35.8px",
                      mb: "20px",
                    }}
                  >
                    Our Mission
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontFamily: "SF Pro Display",
                      fontWeight: "400",
                      lineHeight: "23.87px",
                    }}
                  >
                    At HFS , our mission is to enhance the quality of life for
                    families by offering a wide range of essential services that
                    promote financial stability, personal growth, and
                    well-being. We are committed to building a supportive
                    community where individuals can thrive both personally and
                    professionally.
                  </Typography>
                </Box>
              </Box>
              {/* Our Goals */}
              <Box
                // className="card"
                sx={{
                  // width: "371px",
                  // height: "424px",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "linear-gradient(135deg, rgba(78, 42, 71, 0.1), rgba(217, 79, 156, 0.1))", // Gradient with 10% opacity
                  backdropFilter: 'blur(3px)', // Apply blur effect
                }}
                width={{xs: "350px", md: "371px"}}
                height={{xs: "324px", md: "424px"}}
              >
                <Box sx={{ width: "314px", height: "221px" }}>
                  <Typography
                    className="text-gradient"
                    sx={{
                      fontSize: "30px",
                      fontWeight: "900",
                      fontFamily: "SF Pro Display",
                      lineHeight: "35.8px",
                      mb: "20px",
                    }}
                  >
                    Our Goals
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontFamily: "SF Pro Display",
                      fontWeight: "400",
                      lineHeight: "23.87px",
                    }}
                  >
                    At HFS , our goals are to empower families to achieve
                    financial stability, foster personal and professional
                    development, and promote overall well-being. We are
                    dedicated to building strong, supportive communities and
                    continuously improving our services to better serve families
                    worldwide.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <div
        style={{
          height: "100%",
          width: "100vw",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box className={css.overlay1}>
          <Box component="img" src={verctor2} />
        </Box>
        <Box className={css.overlay2}>
          <Box component="img" src={vector1} />
        </Box>
      </div>
    </Box>
  );
}

export default OurFocus;
