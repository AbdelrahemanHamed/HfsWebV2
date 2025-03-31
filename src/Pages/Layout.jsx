import { Box } from "@mui/material";
import NavbarPages from "../Components/NavbarPages";
import Sidebar from "../Components/layout/Sidebar/index.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box sx={{ display: "flex", flexGrow: "1", height: "100%" }}>
      <Sidebar />

      <Box sx={{ width: "100%" }}>
        <NavbarPages />

        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
