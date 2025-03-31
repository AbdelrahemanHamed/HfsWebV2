import css from "./style.module.css";

import {
	Box,
	Button,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai"; // استيراد الأيقونة الجديدة
import logo from "@/assets/images/HFSLOGO.png";
import { Context } from "../../../Context";

function Navbar() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const links = [
		{ name: "Home", path: "#home" },
		{ name: "What’s HFS Society", path: "#focus" },
		// { name: "Achievements", path: "/academy" },
		// { name: "partners", path: "/sessions" },
		{ name: "Events", path: "#media" },
		{ name: "Society Art", path: "#art" },
		{ name: "Webinars", path: "#Webinars" },
		{ name: "Packages", path: "#packages" },
	];
	let { logout } = useContext(Context);

	const handleLogout = () => {
		localStorage.removeItem("token");
		logout();
		navigate("/login");
	};

	const goTo = (id, e) => {
		e.preventDefault();
		const targetElement = document.querySelector(id);
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<Box className={" navbar " + css.navbar} sx={{}}>
			<Box className={css.container + " container"}>
				{/* Links for Medium and Larger Screens */}
				<Box
					className={css.links}
					sx={{
						display: { xs: "none", lg: "flex" },
					}}
				>
					{/* Logo */}
					<Box component="img" src={logo} className={css.logo} />
					{links.map((link) => (
						<a
							href={link.path}
							onClick={(e) => goTo(link.path, e)}
							key={link.name}
							className={css.nav_link}
						>
							{link.name}
						</a>
					))}
					<Link className={css.nav_link} to={"/login"}>
						Login
					</Link>

					{/* Buttons */}
					{!token ? (
						<>
							<Button
								className={css.join_us}
								onClick={() => navigate("/register")}
							>
								Join us
							</Button>
						</>
					) : (
						<Button
							className={css.join_us}
							sx={{
								background: "#E14696",
							}}
							onClick={handleLogout}
						>
							Logout
						</Button>
					)}

					<Button className={css.lang}>AR</Button>
				</Box>

				{/* Menu Button for Small Screens */}

				<Box
					className={css.links}
					sx={{
						display: { xs: "flex", lg: "none" },
						padding: "10px !important",
					}}
				>
					{/* Logo */}
					<Box component="img" src={logo} className={css.logo} />
					<IconButton
						sx={{ color: "#fff" }}
						onClick={() => setIsDrawerOpen(true)}
					>
						<AiOutlineMenu />
					</IconButton>
				</Box>
			</Box>

			{/* Drawer for Small Screens */}
			<Drawer
				anchor="left"
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
			>
				<Box
					sx={{
						width: 250,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						paddingTop: "20px",
						backgroundColor: "#000",
						overflow: "auto",
						height: "100%",

						minHeight: "100dvh",
						p: 1,
						color: "#fff",
					}}
				>
					<List sx={{ width: "100%" }}>
						{links.map((link) => (
							<ListItem
								button
								key={link.name}
								onClick={() => setIsDrawerOpen(false)}
							>
								<a
									onClick={(e) => goTo(link.path, e)}
									href={link.path}
									style={{
										color: "#fff",
										textDecoration: "none",
										width: "100%",
										textAlign: "center",
									}}
								>
									<ListItemText primary={link.name} />
								</a>
							</ListItem>
						))}
					</List>

					<Link
						to="/login"
						style={{
							color: "#fff",
							textDecoration: "none",
							width: "100%",
							textAlign: "center",
						}}
					>
						<ListItemText primary="Login" />
					</Link>
					{!token ? (
						<Button
							sx={{
								width: "154px",
								height: "25px",
								background:
									"linear-gradient(90deg, #46DFFC 0%, #E14696 100%)",
								color: "#fff",
								fontSize: "15px",
								fontWeight: "700",
								mt: 2,
							}}
							onClick={() => {
								navigate("/register");
								setIsDrawerOpen(false);
							}}
						>
							Join us
						</Button>
					) : (
						<Button
							sx={{
								width: "154px",
								height: "25px",
								background:
									"linear-gradient(90deg, #E14696 0%, #46DFFC 100%)",
								color: "#fff",
								fontSize: "15px",
								fontWeight: "700",
								mt: 2,
							}}
							onClick={handleLogout}
						>
							Logout
						</Button>
					)}
				</Box>
			</Drawer>
		</Box>
	);
}

export default Navbar;
