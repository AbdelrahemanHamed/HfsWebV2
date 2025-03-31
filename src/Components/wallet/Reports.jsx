import { React, useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import './style.css';
import toast from "react-hot-toast";
import axios from "axios";

// context || Api
import { Context } from "@/Context";
import useApi from "@/api"; // Assuming this hook is correctly configured

const CardColumn = () => {
  // Use the useApi hook to get the api function for making requests
  const api = useApi();
  const { user: auth_user } = useContext(Context);

  // States to store fetched data
  const [totalEarnings, setTotalEarnings] = useState("0.00"); // Default to "0.00"
  const [totalBounce, setTotalBounce] = useState("0.00");
  const [totalReceive, setTotalReceive] = useState("0.00");
  const [totalTransfer, setTotalTransfer] = useState("0.00");

  // Fetching data from the API
  const submit = async () => {
    try {
      // Make the API request for total earnings
      const res = await api.get("user/total/earning"); // Ensure the endpoint is correct

      // Assuming the response contains a "result" object with "total_earning"
      const data = res.data.result;

      // Update states with the fetched data
      setTotalEarnings(data.total_earning || "0.00");  // Handle default if no value
      setTotalBounce("0.00"); // You can update this if the API provides this value
      setTotalReceive("0.00"); // Same for receive
      setTotalTransfer("0.00"); // Same for transfer

    } catch (err) {
      console.error(err);
      toast.error("Error fetching data");
    }
  };

  // Call submit function when the component mounts or when auth_user changes
  useEffect(() => {
    if (auth_user) {
      submit();
    }
  }, [auth_user]); // Ensure that submit is called once after user is set

  return (
    <Box className="card-container">
      {/* Card 1: Total Earnings */}
      <Box className="card">
        <Box className="card-content">
          <Typography className="card-title">Total Earnings</Typography>
          <Box className="Breaker" />
          <Box className="cardMoney">
            <Typography variant="body2" className="card-text">
              {totalEarnings} {/* Displaying total earnings dynamically */}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Card 2: Total Bounce */}
      <Box className="card">
        <Box className="card-content">
          <Typography className="card-title">Total Bounce</Typography>
          <Box className="Breaker" />
          <Box className="cardMoney">
            <Typography variant="body2" className="card-text">
              {totalBounce} {/* Placeholder, update if the API provides this value */}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Card 3: Total Receive */}
      <Box className="card">
        <Box className="card-content">
          <Typography className="card-title">Total Receive</Typography>
          <Box className="Breaker" />
          <Box className="cardMoney">
            <Typography variant="body2" className="card-text">
              {totalReceive} {/* Placeholder, update if the API provides this value */}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Card 4: Total Transfer */}
      <Box className="card">
        <Box className="card-content">
          <Typography className="card-title">Total Transfer</Typography>
          <Box className="Breaker" />
          <Box className="cardMoney">
            <Typography variant="body2" className="card-text">
              {totalTransfer} {/* Placeholder, update if the API provides this value */}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardColumn;
