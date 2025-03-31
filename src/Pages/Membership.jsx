/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Context } from "@/Context";
import useApi from "@/api";

// assets
import check_icon from "@/assets/images/layout/check_icon.png";
import x_mark_icon from "@/assets/images/layout/x_mark_icon.png";
import home_bg from "@/assets/images/pages_assets/home_bg.png";

// Component

import PurchaseButton from "../Components/Payment/Popup";

function CardComponent({ name, price, billing_period, features, cv, x, y, id }) {
	const api = useApi();
	const { token } = useContext(Context);

	// Function to handle subscription
	async function subscribe(id) {
		try {
			const res = await api.post(
				"/user/subscribe",
				{ package_id: id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			Swal.fire({
				title: "Good job!",
				text: res.data.message,
				icon: "success",
			});
		} catch (error) {
			console.error("Error in subscription:", error.response?.data?.message || error.message);
			Swal.fire({
				title: "Insufficient funds",
				text: error.response?.data?.message || "Subscription failed",
				icon: "error",
			});
		}
	}

	// Animation variants
	const childVariants = {
		hidden: { opacity: 0, scale: 0, x: x, y: y },
		visible: { opacity: 1, scale: 1, x: 0, y: 0, staggerChildren: 0.2 },
	};

	return (
		<Box
			component={motion.div}
			variants={childVariants}
			initial="hidden"
			whileInView="visible"
			transition={{ duration: 1 }}
			className="subs-card"
			sx={{
				width: { xs: "320px", xl: "400px" },
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				p: "20px 2.3em",
				pt: "40px",
				mt: "30px",
				borderRadius: "15px",
				background: "#xd",
				backdropFilter: "blur(26px)",
				boxShadow: "0px 2px 10px 3px #542b4b",
			}}
		>
			<Box sx={{ textAlign: "center", width: "100%" }}>
				<Typography sx={{ fontSize: { xs: "14px", xl: "20px" } }}>{name}</Typography>
				<Typography sx={{ fontSize: "14px" }}>
					{price}{" "}
					<Typography component="span" sx={{ fontSize: "8px" }}>
						/ {billing_period}
					</Typography>
				</Typography>
				<Typography sx={{ fontSize: "9px", fontWeight: "700" }}>{cv} CV</Typography>
			</Box>
			<Box sx={{ mt: "30px", display: "flex", flexDirection: "column", width: "100%" }}>
				{Object.keys(features).map((feature, index) => (
					<Box key={feature} sx={{ display: "flex", alignItems: "center", gap: "10px", color: "#CACACA" }}>
						<Box sx={{ width: ".6em" }} component="img" src={features[feature] ? check_icon : x_mark_icon} />
						<Typography sx={{ width: "100%", fontSize: "16px", color: "white", py: 1.1 }}>
							{feature}
						</Typography>
					</Box>
				))}
			</Box>
			<Box
				component={motion.div}
				initial={{ scale: 1 }}
				whileHover={{ scale: 1.2 }}
				transition={{ duration: 0.5 }}
				sx={{
					textAlign: "center",
					mt: "30px",
					width: "100%",
					height: "22px",
					borderRadius: "5px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<PurchaseButton id={id} />

			</Box>
		</Box>
	);
}
function Membership() {
	const api = useApi();
	const { token } = useContext(Context);
	const [cardsList, setCardsList] = useState([]);

	// Fetch membership packages
	const getPackages = async () => {
		try {
			const url = "https://production.hfssociety.com/api/v1/Packages"; // Correct URL
			console.log("Fetching from:", url);
			console.log("Authorization Token:", token);
	
			const res = await api.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
	
			console.log("API Response:", res.data);
			setCardsList(res.data?.result?.data || []);
		} catch (err) {
			console.error("Error fetching packages:", err.response?.data || err.message);
		}
	};
	
	// Run only when token is available
	useEffect(() => {
			getPackages();
		
	}, );

	return (
		<Box sx={{ backgroundImage: `url(${home_bg})`, backgroundSize: "cover", height: "100%" }}>
			<Box className="container" sx={{ width: "100%" }}>
				<Box
					component={motion.div}
					initial="hidden"
					whileInView="visible"
					sx={{
						display: "flex",
						justifyContent: { xs: "center", xl: "space-evenly" },
						flexWrap: "wrap",
						gap: "10px",
					}}
				>
					{cardsList.length > 0 ? (
						cardsList.map((card, index) => <CardComponent {...card} key={index} />)
					) : (
						<Typography sx={{ color: "white", textAlign: "center", mt: "20px" }}>
							No packages available
						</Typography>
					)}
				</Box>
			</Box>
		</Box>
	);
}

export default Membership;
