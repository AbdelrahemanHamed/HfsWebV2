// src/components/FloatingCallButton.js
import React, { useState } from "react";
import { Box, TextField, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import Close icon from Material-UI
import XIcon from "@mui/icons-material/Close"; // Import Close icon from Material-UI
import { keyframes } from "@emotion/react";
import emailjs from "emailjs-com"; // Import EmailJS

// assets
import myIcon from "@/assets/images/placeholder/technical-support-svgrepo-com.svg"; // Adjust the path as necessary

const rotateAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const FloatingCallButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to manage Snackbar visibility
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    country: "",
    phoneNumber: "",
    comments: "",
  }); // State to manage form input values

  const handleClick = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility
  };

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update specific field in formData
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send email using EmailJS
    emailjs
      .send(
        "service_y2qymbm",
        "template_3jnqw7f",
        formData,
        "HpSfbtz-Zq_tnqura"
      )
      .then(
        (response) => {
          setOpenSnackbar(true);
          setIsFormVisible(false); // Close form after submission
          // Reset form fields
          setFormData({
            firstName: "",
            email: "",
            country: "",
            phoneNumber: "",
            comments: "",
          });
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );
  };

  const waveAnimation = keyframes`
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
    `;

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        onClick={handleClick} // Open phone dialer on button click
        sx={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          overflow: "hidden",
          background: "linear-gradient(90deg, #46DFFC, #E14696, #46DFFC)",
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 50%",
          // animation: `${waveAnimation} 4s ease-in-out infinite`,
          zIndex: 99999999,
          // Rotate when form is visible
          animation: isFormVisible ? `${rotateAnimation} 1s linear` : "none", // Apply rotation animation
        }}
      >
        <Box className="waves" />
        <Box className="waves" />
        <Box className="waves" />
        {isFormVisible ? (
          <XIcon sx={{ color: "white", width: "40px", height: "40px" }} /> // Show close icon when form is open
        ) : (
          <Box
            component="img"
            src={myIcon}
            alt="Phone Icon"
            sx={{
              filter: "invert(1)", // Inverts colors; works well for black icons
              width: "40px", // Set the width of the icon
              height: "40px", // Set the height of the icon
            }}
          />
        )}
        {/* Replace icon with close icon when form is visible */}
        {isFormVisible && (
          <IconButton
            onClick={handleFormToggle}
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              color: "white",
            }} // Close icon style
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {isFormVisible && (
        <Box
          sx={{
            position: "fixed",
            bottom: "100px", // Position above the button
            right: "30px",
            width: "250px",
            padding: "16px",
            background: "#fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "8px",
            animation: "slideIn 0.5s ease-out", // Add slide-in animation
            zIndex: 9999999,
          }}
        >
          <IconButton
            onClick={handleFormToggle}
            sx={{ position: "absolute", top: "8px", right: "8px" }}
          >
            <CloseIcon />
          </IconButton>
          <h3>Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Comments"
              name="comments"
              multiline
              rows={3}
              value={formData.comments}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      )}

      {/* Snackbar for submission confirmation */}
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="We will contact you soon!"
        autoHideDuration={1000} // Automatically close after 4 seconds
      />
    </Box>
  );
};

export default FloatingCallButton;
