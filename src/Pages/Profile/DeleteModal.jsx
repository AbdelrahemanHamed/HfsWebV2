// DeleteModal.jsx
import { useState, useContext } from "react";
import { Modal, Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Context } from "@/Context";
import useApi from "@/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DeleteModal({ open, handleClose }) {
  // Config
  const navigate = useNavigate();
  const api = useApi();
  let { logout } = useContext(Context);

  // State
  const [loading, setLoading] = useState(false);

  // Methods
  const handleDelete = async () => {
    try {
      setLoading(true);
      const req = await api.post("/edit/profile");
      handleClose();

      toast.success(req.data.message);
      handleLogout();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

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
        <Card
          sx={{ minWidth: "500px", pointerEvents: "auto" }}
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Are you sure you want delete this profile?
            </Typography>
          </CardContent>

          <CardActions>
            <Box sx={{ m: "0 20px 0 auto" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                disabled={loading}
                loading={loading.toString()}
                sx={{ mx: 3 }}
              >
                Yes
              </Button>
              <Button onClick={handleClose}>No</Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}