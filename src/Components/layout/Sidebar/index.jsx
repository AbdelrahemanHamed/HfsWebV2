import toast from "react-hot-toast";

// assets
import logo from "@/assets/images/HFSLOGO.png";
import membership from "@/assets/images/pages_assets/membership.png";
import dashboard from "@/assets/images/pages_assets/dashboard.png";
import wallet from "@/assets/images/pages_assets/wallet.png";
import network from "@/assets/images/pages_assets/network.png";
import transactions from "@/assets/images/pages_assets/transactions.png";
import sidebar_bg from "@/assets/images/pages_assets/sidebar_bg.png";
import Tank from "@/assets/images/pages_assets/Tank.png";
import Support from "@/assets/images/pages_assets/Vector.svg";
import Group from "@/assets/images/pages_assets/Group.svg";
import RankReward1 from "@/assets/images/pages_assets/Group-1.svg";
import Profile from "@/assets/images/pages_assets/profile.png";
import subscriptions from "@/assets/images/pages_assets/subscriptions.svg";
import tradingSocietyLogo from "@/assets/images/pages_assets/tradingSocietyLogo.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// components
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/Context";
import { motion } from "framer-motion";

// css

import useApi from "@/api";
// import { RankReward } from '@/Pages/Bounces/index';

function Sidebar() {
    const api = useApi();
    let { logout } = useContext(Context);
	const { sidebarOpen, setSidebarOpen } = useContext(Context);
	const sidebarRef = useRef(null);
	const activeLinkRef = useRef(null);
	const navigate = useNavigate();

	const [links] = useState([
		{ name: "Dashboard", path: "/Dashboard", icon: dashboard },
		{ name: "Genealogy", path: "/Network", icon: network },
		{ name: "TANK", path: "/tank", icon: Tank },
		{ name: "Wallet", path: "/wallet", icon: wallet },
		{ name: "Transactions", path: "/Transactions", icon: transactions },
		{ name: "Commissions", path: "/Bounces", icon: Group },
		{ name: "Rank Reward", path: "/RankReward", icon: RankReward1 },
		{ name: "Membership", path: "/Membership", icon: subscriptions },
		{ name: "Profile", path: "/profile", icon: Profile },
		{ name: "Support", path: "/SupportPage", icon: Support },
	]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				window.innerWidth < 600 &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target)
			) {
				setSidebarOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setSidebarOpen]);

	const handleLinkClick = (e, path) => {
		navigate(path);

		if (activeLinkRef.current) {
			activeLinkRef.current.classList.remove("active");
		}
		e.currentTarget.classList.add("active");
		activeLinkRef.current = e.currentTarget;
	};

	const handleLogout = () => {
        localStorage.removeItem("token");
        logout();
		navigate("/login");
	};

	const goToTS = async () => {
		try {
			const res = await api.get("/sync-user");
			const token = encodeURIComponent(res.data.token);
			// Store the token in local storage
			localStorage.setItem("token", token);

			window.open(
				`https://tradingsociety.net/redirect?token=${token}`,
				"_blank"
			);
		} catch (err) {
			console.error(err);
			toast.error(
				err.response?.data?.message || "An unexpected error occurred"
			);
			window.open(`https://tradingsociety.net/`, "_blank");
		}
	};

	return (
		<Box
			ref={sidebarRef}
			sx={{
				width: sidebarOpen ? "260px" : "0",
				transition: "width 400ms",
				height: "100vh",
				paddingBottom: "40px",
				backgroundImage: `url(${sidebar_bg})`,
				backgroundSize: "100% 80%", // Scale the background image to 50% of the width
				backgroundRepeat: "no-repeat",

				backgroundPosition: "bottom left",
				position: { xs: "fixed", sm: "sticky" },
				left: "0",
				top: "0",
				bottom: "0",
				backgroundColor: "#141017",
				display: "flex",
				flexDirection: "column",
				gap: "50px",
				zIndex: "99999",
				overflowX: "hidden",
				overflowY: "auto",
				/* Custom Scrollbar */
				"&::-webkit-scrollbar": {
					width: "4px", // Width of the scrollbar
				},
				"&::-webkit-scrollbar-track": {
					background: "#1c1a20", // Track background color
				},
				"&::-webkit-scrollbar-thumb": {
					background: "#4d2341", // Thumb color
					borderRadius: "4px", // Rounded corners for the thumb
				},
				"&::-webkit-scrollbar-thumb:hover": {
					background: "#dc4b9a", // Thumb color on hover
				},
				"&::before": {
					content: '""',
					position: "absolute",
					paddingBottom: "40px",
					height: "150%",
					top: "0",
					left: "0",
					right: "0",
					bottom: "0",
					background: "rgba(0, 0, 0, 0.3)", // 70% opacity (3rd value is the transparency level)
					zIndex: -1, // Place the overlay behind the content
				},
			}}
		>
			<Box
				sx={{
					width: "88px",
					height: "60px",
					mx: "auto",
					mt: "30px",
					cursor: "pointer",
				}}
				onClick={() => navigate("/")}
			>
				<Box
					component="img"
					src={logo}
					sx={{ width: "100%", height: "100%" }}
				/>
			</Box>

			<Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				{links.map((link) => (
					<Box
						key={link.name}
						component={motion.div}
						sx={{ cursor: "pointer" }}
						onClick={(e) => handleLinkClick(e, link.path)}
						initial={{
							scale: 1,
							x: 0,
							background: `linear-gradient(0deg, transparent, transparent)`,
						}}
						whileHover={{
							scale: 1.1,
							x: 20,
							background:
								"linear-gradient(124.86deg, #63ccec 7.03%, #e44896 92.97%)",
							borderRadius: "10px",
						}}
						transition={{ duration: 0.5 }}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: "10px",
								height: "53px",
								textAlign: "center",
								width: "60%",
								mx: "auto",
							}}
						>
							<Box sx={{ width: "20px", height: "20px" }}>
								<Box
									component="img"
									src={link.icon}
									sx={{ width: "100%", height: "100%" }}
								/>
							</Box>
							<Typography
								sx={{
									fontSize: "15px",
									fontWeight: "600",
									textAlign: "center",
								}}
							>
								{link.name}
							</Typography>
						</Box>
					</Box>
				))}

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
						height: "53px",
						textAlign: "center",
						fontSize: "15px",
						fontWeight: "700",
						color: "#c1b4dd",
						mx: "auto",
						cursor: "pointer",
					}}
					// href="https://tradingsociety.net/"
					// href="https://production.hfssociety.com/api/v1/sync-user"
					target="_blank"
					onClick={goToTS}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<Box
							component="img"
							src={tradingSocietyLogo}
							sx={{ width: "25px", height: "#30px" }}
						/>{" "}
						{/* Door/Exit icon */}
						<Typography
							sx={{
								fontSize: "14px",
								fontWeight: "700",
								background:
									"linear-gradient(to right, #C3AD57, #5D5329)", // Define your gradient colors here
								WebkitBackgroundClip: "text", // Makes the gradient visible in text
								WebkitTextFillColor: "transparent", // Ensures the background shows through the text
								display: "inline-block", // Ensures gradient is applied to text only
							}}
						>
							Trading society
						</Typography>
					</Box>
				</Box>

				<Button
					sx={{
						width: "154px",
						height: "25px",
						margin: "auto",
						p: "1em",
						background:
							"linear-gradient(90deg, #E14696 0%, #46DFFC 100%)",
						color: "#fff",
						fontSize: "15px",
						fontWeight: "700",
						gap: "10px",
						mt: 2,
					}}
					onClick={handleLogout}
				>
					<ExitToAppIcon sx={{ fontSize: "20px" }} />{" "}
					{/* Door/Exit icon */}
					Logout
				</Button>
			</Box>
		</Box>
	);
}

export default Sidebar;
