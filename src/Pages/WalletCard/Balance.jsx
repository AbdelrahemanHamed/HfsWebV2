/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { CardContent, Typography, IconButton, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios"; // Import axios

// css
import css from "./style.module.css";

export default function CommissionBalance() {
  const [wallet, setWallet] = useState("0.00");
  const [isWalletVisible, setIsWalletVisible] = useState(false);

  useEffect(() => {
    const fetchCommissionBalance = async () => {
      try {
        const authToken = localStorage.getItem("token"); // Get token from localStorage

        const response = await axios.get(
          "https://production.hfssociety.com/api/v1/wallet/commission",
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Include token in headers
            },
          }
        );

        console.log(response.data);
        if (response.data?.status) {
          const balance = response.data.result.data[0]?.balance || "---";
          setWallet(balance);
        }
      } catch (error) {
        console.error("Error fetching commission balance:", error);
      }
    };

    fetchCommissionBalance();
  }, []);

  return (
    <Box className={`${css.card} ${css.item1} `}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "#5f2f51", fontSize: "20px", fontWeight: "bold" }}
        >
          Commission Wallet Balance
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: "#5f2f51",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            justifyContent: "center",
            fontSize: "25px",
          }}
        >
          {isWalletVisible ? wallet : "*****"}
          <IconButton
            onClick={() => setIsWalletVisible(!isWalletVisible)}
            sx={{ ml: 1 }}
          >
            {isWalletVisible ? (
              <VisibilityOff style={{ fontSize: "15px" }} />
            ) : (
              <Visibility style={{ fontSize: "15px", color: "#5f2f51" }} />
            )}
          </IconButton>
        </Typography>
      </CardContent>
    </Box>
  );
}
