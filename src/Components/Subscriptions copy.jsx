/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

// assets
import check_icon from "@/assets/images/layout/check_icon.png";
import x_mark_icon from "@/assets/images/layout/x_mark_icon.png";
import { Link } from "react-router-dom";

function CardComponent({ title, price, cardItems }) {
  return (
    <Box
      sx={{
        width: { xs: "320px", xl: "400px" },
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "20px 2.3em",
        borderRadius: "15px",
        background: "#130E4D",

        backdropFilter: "blur(26px)",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
          {price}{" "}
          <Typography component="span" sx={{ fontSize: "12px" }}>
            / Monthly
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          mt: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {cardItems.map((card, index) => {
          const isLastItem = index === cardItems.length - 1;
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                position: "relative",
                color: "#CACACA",
              }}
            >
              <Box
                sx={{ width: "7px", height: "7px" }}
                component="img"
                src={card.icon}
              />

              <Typography
                sx={{
                  width: "100%",
                  "&::after": !isLastItem && {
                    content: '""',
                    position: "absolute",
                    bottom: "-10px",
                    border: "1px solid #fff",
                    width: "90%",
                    left: "20px",
                    fontSize: "11px",
                    borderColor: "#CACACA",
                  },
                }}
              >
                {card.title}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ textAlign: "center", ml: "30px" }}>
        {/* <Typography>Affiliate program with extra Bonus 25 CV</Typography> */}
        <Box
          component={Link}
          to="/register"
          sx={{
            backgroundColor: "#FFFFFF",
            my: "50px",
            p: ".5em 4em",
            m: "2em auto",
            borderRadius: "5px",
            display: "block",
            width: "230px",
            transition: ".3s",
            "&:hover": {
              scale: "1.1",
            },
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #4ED8F7 0%, #D057A1 100%)",
              backgroundClip: "text",
              color: "#0000",
              fontWeight: "bold",
            }}
          >
            START YOUR JOURNEY
          </span>
        </Box>
      </Box>
    </Box>
  );
}

function Subscriptions() {
  const [cardLists] = useState([
    {
      title: "Essential",
      price: "99",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: check_icon, title: "Live trading" },
        { icon: x_mark_icon, title: "Live sessions" },
        { icon: x_mark_icon, title: "Advance course" },
        { icon: x_mark_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: x_mark_icon, title: "All scanner" },
        { icon: x_mark_icon, title: "private sessions with selected coach" },
      ],
    },
    {
      title: "Basic",
      price: "399",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: x_mark_icon, title: "Live trading" },
        { icon: check_icon, title: "Live sessions" },
        { icon: x_mark_icon, title: "Advance course" },
        { icon: x_mark_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: x_mark_icon, title: "All scanner" },
        { icon: x_mark_icon, title: "private sessions with selected coach" },
      ],
    },
    {
      title: "Premium",
      price: "749",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: check_icon, title: "Live trading" },
        { icon: check_icon, title: "Live sessions" },
        { icon: check_icon, title: "Advance course" },
        { icon: x_mark_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: check_icon, title: "One scanner" },
        { icon: x_mark_icon, title: "private sessions with selected coach" },
      ],
    },
    {
      title: "Pro",
      price: "1499",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: check_icon, title: "Live trading" },
        { icon: check_icon, title: "Live sessions" },
        { icon: check_icon, title: "Advance course" },
        { icon: check_icon, title: "Expert course" },
        { icon: x_mark_icon, title: "Expert plus course" },
        { icon: check_icon, title: "All scanners" },
        { icon: check_icon, title: "private sessions with selected coach" },
      ],
    },
    {
      title: "Premium",
      price: "749",
      items: [
        { icon: check_icon, title: "Trade alert" },
        { icon: check_icon, title: "Beginner course" },
        { icon: check_icon, title: "Basics course" },
        { icon: check_icon, title: "Live trading" },
        { icon: check_icon, title: "Live sessions" },
        { icon: check_icon, title: "Advance course" },
        { icon: check_icon, title: "Expert course" },
        { icon: check_icon, title: "Expert plus course" },
        { icon: check_icon, title: "All scanners" },
        { icon: check_icon, title: "private sessions with selected coach" },
      ],
    },
  ]);

  return (
    <Box>
      <Box className="container" sx={{ width: "85%" }}>
        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          {cardLists.map((card, index) => (
            <CardComponent
              key={index}
              title={card.title}
              price={card.price}
              cardItems={card.items}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Subscriptions;
