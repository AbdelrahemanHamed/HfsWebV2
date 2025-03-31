// components
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { SlLocationPin } from "react-icons/sl";
import { GiCheckedShield } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { PiUserCircleCheckDuotone } from "react-icons/pi";
import { BsPatchCheck } from "react-icons/bs";

// assets
import img from "@/assets/images/HFSLOGO.png";

// css
import css from "./style.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <Box
          className={css.flex}
          sx={{
            justifyContent: "space-between",
            display: { xs: "block !important", md: "flex !important" },
          }}
        >
          <div className={css.logo}>
            <img src={img} alt="..." />
            {/* <span>HFS</span> */}
          </div>

          <div>
            <h3>Location</h3>
            <a href="#">
              <SlLocationPin className={css.icon} />

              <span>Dubai Silicon Oasis</span>
            </a>
          </div>
          {/* <div>
            <Link to="/home">About</Link>
          </div> */}
          <div>
            <h3>Links</h3>
            <Link to="/dashboard">
              <MdDashboard className={css.icon} /> Dashboard
            </Link>
            <Link to="/login">
              <PiUserCircleCheckDuotone className={css.icon} /> Login
            </Link>
          </div>
          {/* <div></div> */}
        </Box>

        <hr />
        <p>
          HFSSOCIETY E-COMMERCE under regulation no 54683 &copy;{" "}
          {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
