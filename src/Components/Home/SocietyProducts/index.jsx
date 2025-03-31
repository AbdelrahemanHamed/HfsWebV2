import { Box, Typography } from "@mui/material";

import css from "./style.module.css";

// assets
import blankImg from "@/assets/images/blank.png";
import googlePlay from "@/assets/images/googleplay.png";
import appleStore from "@/assets/images/apple.png";
import card1Bg from "@/assets/images/card1-bg.png";
import card1_vector from "@/assets/images/card1_vector.png";
import card2_vector from "@/assets/images/card2_vector.png";
import card1Bg2 from "@/assets/images/card1_bg2.png";
import cardsBg from "@/assets/images/ProductCardBG2.png";
import cardsB3 from "@/assets/images/CSproductBG.png";
import card2bg from "@/assets/images/card2-bg.png";
import card2bg2 from "@/assets/images/card2-bg2.png";

import card1 from "@/assets/images/card1.png";
import card2 from "@/assets/images/card2.png";
// import { useEffect } from "react";

function SocietyProducts() {
  return (
    <Box id="art">
      <Box className="container">
        <Typography
          className={css.my_title}
          sx={{
            fontSize: { xs: "50px ", md: "75px" },
            letterSpacing: { xs: "20px", md: "50px" },
            my: 5,
          }}
        >
          SOCIETY
          <br />
          ART
        </Typography>
        {[card1, card2].map((e, n) => (
          <Box className={css.card} key={n}>
            <div className={css.container}>
              <img src={e} alt="..." className={css.img} />

              <Box
                className={css.cardBtns}
                sx={{
                  flexDirection: { xs: "row", md: "row", height: "20%" },
                }}
              >
                <Box
                  component="a"
                  href="https://play.google.com/store/search?q=trading%20society&c=apps"
                  target="_blank"
                  sx={{
                    // flex: "1",
                    cursor: "pointer",
                    display: "block",
                    transition: "400ms transform",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={googlePlay}
                    sx={{ height: "100%", objectFit: "contain", width: "100%" }}
                  />
                </Box>
                <Box
                  component="a"
                  href="https://play.google.com/store/search?q=trading%20society&c=apps"
                  target="_blank"
                  sx={{
                    // flex: "1",
                    cursor: "pointer",
                    display: "block",
                    transition: "400ms transform",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={appleStore}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </Box>
              </Box>
            </div>
          </Box>
        ))}{" "}
      </Box>
    </Box>
  );
}

export default SocietyProducts;
