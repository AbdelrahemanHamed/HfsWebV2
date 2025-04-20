// EditProfileModal.jsx
import {
    Modal, 
    Box, 
    Backdrop, 
    Card, 
    CardContent, 
    Typography, 
    TextField, 
    CardActions, 
    Button,
    CircularProgress
  } from "@mui/material";
  import { useForm } from "react-hook-form";
  
  export default function EditProfileModal({ 
    open, 
    handleClose, 
    localUser, 
    onSubmit, 
    loading 
  }) {
    const { register, handleSubmit } = useForm();
  
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "grid",
            placeContent: "center",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <Backdrop
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
              zIndex: 1,
            }}
            open={open}
          />
  
          <Card
            sx={{
              minWidth: "min(80vw, 500px)",
              maxHeight: "min(80vh, 600px)",
              pointerEvents: "auto",
              margin: "auto",
              boxShadow: 3,
              overflowY: "scroll",
              position: "relative",
              backdropFilter: "blur(10px)",
              backgroundColor: "#17111854",
              color: "#000",
              borderRadius: "20px",
              zIndex: 2,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                "&:hover": {
                  backgroundColor: "#555",
                },
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
              },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent>
              <Typography
                sx={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: { xs: "16px", sm: "25px" },
                  fontWeight: "bold",
                }}
              >
                Edit Profile
              </Typography>
              <hr />
  
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* First Name */}
                <Box sx={{ marginBottom: 2, mt: 4 }}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    defaultValue={localUser.first_name}
                    {...register("first_name")}
                    sx={textFieldStyles}
                  />
                </Box>
  
                {/* Last Name */}
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    defaultValue={localUser.last_name}
                    {...register("last_name")}
                    sx={textFieldStyles}
                  />
                </Box>
  
                {/* Mobile */}
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    defaultValue={localUser.mobile}
                    {...register("mobile")}
                    sx={textFieldStyles}
                  />
                </Box>
  
                {/* Add fields for CV values */}
                <Box sx={{ marginBottom: 2, display: "flex", gap: 2 }}>
                  <TextField
                    label="CV"
                    variant="outlined"
                    fullWidth
                    value={localUser.cv}
                    disabled
                    sx={textFieldStyles}
                  />
                  <TextField
                    label="Left Leg CV"
                    variant="outlined"
                    fullWidth
                    value={localUser.left_leg_cv}
                    disabled
                    sx={textFieldStyles}
                  />
                  <TextField
                    label="Right Leg CV"
                    variant="outlined"
                    fullWidth
                    value={localUser.right_leg_cv}
                    disabled
                    sx={textFieldStyles}
                  />
                </Box>
  
                {/* User Status */}
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Account Status"
                    variant="outlined"
                    fullWidth
                    value={localUser.account_status}
                    disabled
                    sx={textFieldStyles}
                  />
                </Box>
  
                {/* Submit Button */}
                <CardActions sx={{ display: "flex", justifyContent: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={loading}
                    sx={{
                      padding: "10px",
                      fontSize: "16px",
                      width: "20%",
                      height: "30px",
                      background: "linear-gradient(45deg, #6fbfe4, #d459a1)",
                      color: "#fff",
                      "&:hover": {
                        background: "linear-gradient(45deg, #d459a1, #6fbfe4)",
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : "Update"}
                  </Button>
                </CardActions>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    );
  }
  
  // Common styles for text fields
  const textFieldStyles = {
    input: {
      fontSize: "16px",
      color: "#fff",
    },
    label: { color: "#bbb" },
    backgroundColor: "#333",
    marginBottom: 2,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#444",
      },
      "&:hover fieldset": {
        borderColor: "#bbb",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
  };