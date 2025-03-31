import { useContext } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { IoMenuOutline } from "react-icons/io5";
import { Context } from "@/Context";
import navBarBg from "@/assets/images/dashboardNavBar_BG.webp";

// component
function NavbarPages() {
  let { setSidebarOpen, user } = useContext(Context);
  const userArray = JSON.parse(localStorage.getItem("user"));
  const UserFullName = userArray.full_name;
  const UserImage = userArray.photo; // Use 'photo' here to get the image URL
  console.log(UserImage); // Check if the image URL is correct

  return (
    <Box
      sx={{
        backgroundColor: "#130E14",
        backgroundImage: `url(${navBarBg})`,
        backgroundSize: "cover",
        width: "100%",
        boxShadow: "0px 1px 10px 1px #411f37",
        height: "82px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: "20px",
        gap: "10px",
        zIndex: 2,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Box sx={{ width: "37px", height: "37px" }}>
          {UserImage ? ( // Use 'UserImage' here instead of 'user.image'
            <Avatar
              alt={UserFullName}
              src={UserImage} // Assign 'UserImage' to src
              sx={{
                backgroundColor: "white", // Set the background color
                fontWeight: "bold",
                color: "#411f37", // Set the text color
                textTransform: "capitalize", // Capitalize text
              }}
            />
          ) : (
            <User /> // Fallback to a demo user icon if no image is found
          )}
        </Box>
        <Typography sx={{ fontSize: "18px", fontWeight: "700", textAlign: "left" }}>
          <Typography sx={{ fontSize: "13px", fontWeight: "100", textAlign: "left" }}>
            Welcome
          </Typography>
          {UserFullName}
        </Typography>
      </Box>
      <Box
        sx={{ fontSize: "30px", cursor: "pointer" }}
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <IoMenuOutline />
      </Box>
    </Box>
  );
}

export default NavbarPages;

function User() {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(0 0 0)"
    >
      <path
        d="M16.4337 6.35C16.4337 8.74 14.4937 10.69 12.0937 10.69L12.0837 10.68C9.69365 10.68 7.74365 8.73 7.74365 6.34C7.74365 3.95 9.70365 2 12.0937 2C14.4837 2 16.4337 3.96 16.4337 6.35ZM14.9337 6.34C14.9337 4.78 13.6637 3.5 12.0937 3.5C10.5337 3.5 9.25365 4.78 9.25365 6.34C9.25365 7.9 10.5337 9.18 12.0937 9.18C13.6537 9.18 14.9337 7.9 14.9337 6.34Z"
        fill="#51d5f5"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <path
        d="M12.0235 12.1895C14.6935 12.1895 16.7835 12.9395 18.2335 14.4195V14.4095C20.2801 16.4956 20.2739 19.2563 20.2735 19.4344L20.2735 19.4395C20.2635 19.8495 19.9335 20.1795 19.5235 20.1795H19.5135C19.0935 20.1695 18.7735 19.8295 18.7735 19.4195C18.7735 19.3695 18.7735 17.0895 17.1535 15.4495C15.9935 14.2795 14.2635 13.6795 12.0235 13.6795C9.78346 13.6795 8.05346 14.2795 6.89346 15.4495C5.27346 17.0995 5.27346 19.3995 5.27346 19.4195C5.27346 19.8295 4.94346 20.1795 4.53346 20.1795C4.17346 20.1995 3.77346 19.8595 3.77346 19.4495L3.77345 19.4448C3.77305 19.2771 3.76646 16.506 5.81346 14.4195C7.26346 12.9395 9.35346 12.1895 12.0235 12.1895Z"
        fill="#51d5f5"
      />
    </svg>
  );
}
