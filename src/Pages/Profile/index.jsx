// Profile.jsx
import { Box, Typography, Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState, useEffect, useContext } from "react";
import { Context } from "@/Context";
import { keyframes } from "@mui/system";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useApi from "@/api";

// Components
import UserInfoCard from "./UserInfoCard";
import UserDetailsCard from "./UserDetailsCard";
import EditProfileModal from "./EditProfileModal";
import DeleteModal from "./DeleteModal";

export default function Profile() {
  // Config
  const api = useApi();
  const { user, setUser: setUserContext } = useContext(Context);

  // State
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localUser, setLocalUser] = useState(user);
  const [deleteModal, setDeleteModal] = useState(false);
  const [rotating, setRotating] = useState(false);

  // Animations
  const rotateAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

  // Methods
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    setRotating(!rotating);
    handleOpen();
  };

  const getUserData = async () => {
    try {
      const res = await api.get("/me");
      const userData = res.data.result.user;

      const updatedUser = {
        ...userData,
        username: userData.full_name,
        rank_name: userData.placement || "No Rank",
        sponsor_name: userData.sponsor?.full_name || "No Sponsor",
        sponsor_id_code: userData.sponsor?.id_code || "No Sponsor ID",
        subscription: userData.account_status || "Not Active",
      };

      setLocalUser(updatedUser);
      setUserContext(updatedUser);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load user data");
    }
  };

  const submit = async (payload) => {
    try {
      setLoading(true);
      const res = await api.post("/edit/profile", payload);
      const data = res.data.result.user;

      // Update local state and context
      setUserContext({
        ...data,
        username: data.full_name,
        rank_name: data.placement || "No Rank",
        sponsor_name: data.sponsor?.full_name || "No Sponsor",
        sponsor_id_code: data.sponsor?.id_code || "No Sponsor ID",
        subscription: data.account_status || "Not Active",
      });

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(data));
      handleClose();
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      await submit(formData);

      // Update local state immediately
      setLocalUser((prev) => ({
        ...prev,
        ...formData,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    getUserData();
  }, []);

  if (user) {
    return (
      <Box sx={{ p: 7 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ mb: 2, fontSize: "30px", fontWeight: "700" }}>
            Your Profile
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={handleClick}
              sx={{
                width: "10px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(92, 6, 63, 1)",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 1)",
                "&:hover": {
                  backgroundColor: "#3700b3",
                },
                transition: "background-color 0.3s ease, transform 0.3s ease",
              }}
            >
              <SettingsIcon
                sx={{
                  color: "white",
                  fontSize: "25px",
                  transform: rotating ? "rotate(360deg)" : "rotate(0deg)",
                  animation: rotating ? `${rotateAnimation} 0.5s ease` : "none",
                }}
              />
            </Button>
            <Link to="/reset-password">Reset Password</Link>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* First column with user info card */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: "1 1 50%",
            }}
          >
            <UserInfoCard user={user} />
          </Box>

          {/* Second column with user details */}
          <UserDetailsCard localUser={localUser} />

          {/* Third box (empty for now) */}
          <Box
            sx={{
              mb: 2,
              borderRadius: "10px",
              padding: "10px",
              flex: "1 1 30%",
            }}
          ></Box>
        </Box>
        
        {/* Modals */}
        <EditProfileModal 
          open={open} 
          handleClose={handleClose}
          localUser={localUser}
          onSubmit={onSubmit}
          loading={loading}
        />
        
        <DeleteModal
          open={deleteModal}
          handleClose={() => setDeleteModal(false)}
        />
      </Box>
    );
  } else return <div>Loading...</div>;
}