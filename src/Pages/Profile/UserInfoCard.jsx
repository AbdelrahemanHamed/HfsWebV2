// UserInfoCard.jsx
import { Box, Typography, Avatar } from "@mui/material";
import UserProfile from "@/assets/images/UserProfile.png";

export default function UserInfoCard({ user }) {
  return (
    <Box
      sx={{
        mb: 2,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backgroundImage: `url(${UserProfile})`,
        backgroundSize: "cover",
        backgroundPosition: {
          xs: "center",
          sm: "right",
          md: "right",
        },
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        padding: "10px",
        height: "200px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "20px",
        pl: "20px",
        pr: "50px",
        alignItems: "center",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          pl: "20px",
        }}
      >
        <Avatar
          src={user.photo}
          sx={{
            mb: 2,
            backgroundColor: "rgba(163, 4, 123, 0.86)",
            backdropFilter: "blur(10px)",
            padding: "10px",
            height: 100,
            width: 100,
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            alignItems: "center",
            boxShadow: "0px 0px 30px 1px rgb(231, 225, 225,.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {user.photo ? "" : user.first_name?.charAt(0).toUpperCase() || "?"}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "white",
              fontWeight: "800",
              fontSize: "20px",
            }}
          >
            {user.full_name}
          </Typography>
          <Typography
            sx={{
              color: "#ddd",
              fontSize: "15px",
            }}
          >
            {user.id_code}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.86)",
          backdropFilter: "blur(10px)",
          borderRadius: "30px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          boxShadow: "0px 0px 30px 1px rgb(231, 225, 225,.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Typography
          sx={{
            color: "#ddd",
            fontSize: "15px",
          }}
        >
          {user.rank_name}
        </Typography>
      </Box>
    </Box>
  );
}