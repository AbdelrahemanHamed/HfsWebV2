import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid2,
  Divider,
} from "@mui/material";
import { useState } from "react";
import logo from "@/assets/images/HFSLOGO.png";

import css from "./style.module.css";

// import brand from "../../assets/brand.png";
import instagramIcon from "@/assets/images/instagram.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaMap, FaEnvelope } from "react-icons/fa";
import navBarBg from "@/assets/images/dashboardNavBar_BG.webp";

function Footer() {




  return (
    <Box
      sx={{
        backgroundColor: "#130E14",
        backgroundImage: `url(${navBarBg})`,
        backgroundPosition: "right",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        pt: "2px",
        pb: "24px",
        color: "#fff",
        mt: "80px",
      }}
    >
      <Container>
        <Grid2 container gap={{ xs: 3, md: 30 }} spacing={{ xs: 4, md: 30 }} sx={{ mt: "40px" }}>
                  {/* about Company */}
          <Grid2 height={"180px"}  size={{ xs: 23, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                
                flexDirection: { xs: "column", md: "column" },
                justifyContent: { xs: "center", md: "flex-startd" },
                alignItems: { xs: "center", md: "flex-start" },
                mb: { xs: 4, md: 0 },
                textAlign: { xs: "center", md: "left" },
                gap: "1em",
                // transform: { lg: "translate(-60px,-30px)" },
              }}
            >
              <Box
                component="img"
                src={logo}
                sx={{
                  
                  width: { xs: "fit-content", md: "fit-content" },
                  mb: { xs: 2, md: 0 },
                  height: "75px",
                  display: "block",
                  objectFit: "contain",
                }}
              />
              <Box
                sx={{
                  color: "gray",
                  fontSize: { xs: "14px", md: "18px", xl: "25px" },
                  // fontFamily: "TanseekModernProArabic-ExBold",
                  textAlign: { xs: "center", md: "left" },
                  mb: { xs: 4, md: 0 },
                }}
              >
                <Typography>
                HFS Society E-Commerce: Empowering Dreams, Building Connections, and Creating Opportunities for Holistic Growth and Success Together
                </Typography>
              </Box>
            </Box>
          </Grid2>
                  {/* quick links */}
          <Grid2 
        
            size={{ xs: 12, md: 4 }} 
            sx={{ display: "flex",flexDirection:"column", gap:"1.5em" 
            }}>
            <Typography
              className={css.sectionTitle}
              sx={{
                fontSize: { xs: "16px", md: "40px", xl: "22px",  },
              }}
            >
              Quick Links
            </Typography>

            <Box
              sx={{
                fontSize: { xs: "20px", md: "25px", xl: "30px" },
                display: "flex",
              }}
            >
              <Box>
                <Typography className={css.item}>About Us</Typography>
                <Typography className={css.item}>Support</Typography>
                <Typography className={css.item}>Academy</Typography>
                <Typography className={css.item}>
                  Terms and Conditions
                </Typography>
                <Typography className={css.item}>Privacy Policy</Typography>
              </Box>

            </Box>
          </Grid2>
                  {/* get in touch */}
          <Grid2  size={{ xs: 12, md: 4 }}  sx={{ display: "flex",flexDirection:"column", gap:"1.5em" }}>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px", xl: "22px" },
              }}
              className={css.sectionTitle}
            >
              Get in Touch
            </Typography>
              <Box>
                <Box>
                    <Box className={css.item}>
                      <IoCall className={css.icon} />
                      <Typography>971 582 323 368</Typography>
                  </Box>
                  <Box className={css.item}>
                      <FaMap className={css.icon} />
                      <Typography>Silicon Oasis - Dubai - UAE</Typography>
                  </Box>
                  <Box className={css.item}>
                    <FaEnvelope className={css.icon} />
                    <Typography>info@hfssociety.net</Typography>
                  </Box> 
                </Box>
                <Box>
                <Box className={css.social_links}>
              <a href="#" target="_blank">
                <FaFacebookF
                  className={css._icon}
                  style={{ color: "#4267B2" }}
                />
              </a>

              <a href="#" target="_blank">
                <FaYoutube className={css._icon} style={{ color: "#FF0000" }} />
              </a>
              <a href="#" target="_blank">
                <FaInstagram
                  className={css._icon}
                  style={{ color: "#7b2672" }}
                />
              </a>
            </Box>
                </Box>
              </Box>
              
          </Grid2>
        </Grid2>
      </Container>

      <Divider sx={{ backgroundColor: "#000",height:"3px", my: "12px" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "cneter",
          mt: "12px",
          height: { xs: "30px", lg: "0px" },
          color: "text.secondary",
        }}
      >
        <Typography sx={{ fontSize: "15px",color:"white" }}>
          © {new Date().getFullYear()} HFS. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
