import { Box, Typography } from "@mui/material";
import UserProfile from "@/assets/images/UserProfile.png";

export default function UserDetailsCard({ localUser }) {
  const userDetails = [
    { label: "First Name", value: localUser.first_name },
    { label: "Last Name", value: localUser.last_name },
    { label: "Sponsor Name", value: localUser.sponsor_name },
    { label: "Sponsor ID", value: localUser.sponsor_id_code },
    { label: "Subscription", value: localUser.subscription },
    { label: "ID Code", value: localUser.id_code },
    { label: "CV", value: localUser.cv },
    { label: "Left Leg CV", value: localUser.left_leg_cv },
    { label: "Right Leg CV", value: localUser.right_leg_cv },
    { label: "Status", value: localUser.account_status },
  ];

  return (
    <Box
      sx={{
        mb: 2,
        borderRadius: "15px",
        backgroundImage: `url(${UserProfile})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 3,
        position: "relative",
        overflow: "hidden",
        flex: "1 1 30%",
      }}
    >
      {/* Overlay for dark blur effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(6px)",
          zIndex: 0,
          borderRadius: "15px",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          rowGap: 2,
          color: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          User Details
        </Typography>

        {userDetails.map((detail, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              pb: 1,
            }}
          >
            <Typography sx={{ color: "#ccc", fontWeight: "bold" }}>
              {detail.label}:
            </Typography>
            <Typography>{detail.value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
