import { useState, useEffect, useContext } from "react";
// components
import { Box, Typography } from "@mui/material";
import Balance from "./Balance";
import Charging from "./Charging";
import WithDraw from "./WithDraw";
import Transformation from "./Transformation";
import CardColumn from "../../Components/wallet/Reports";
import BarChart from "../../Components/wallet/analyticsReports/IncomeGraph";
import WeeklyChart from "../../Components/wallet/WeeklyChart/WeeklyChart";
import TokenWallet from "./TokenWallet";
import { Context } from "@/Context";
// css


// api
import useApi from "@/api";


export default function WalletCard() {
	// setup
	const api = useApi();
	const { baseUrl, token } = useContext(Context);
	const [loading, setLoading] = useState(false);
	const [wallet, setWallet] = useState("");
	const [numberInWallet, setNumberInWallet] = useState(0);

	// State for live date and time
	const [currentTime, setCurrentTime] = useState("");

	useEffect(() => {
		// Function to update the date and time
		const updateDateTime = () => {
			const options = {
				timeZone: "Africa/Cairo",
				hour: "2-digit",
				minute: "2-digit",
				hour12: true, // Enable AM/PM format
				day: "numeric",
				month: "short",
				year: "numeric",
			};
			const formatter = new Intl.DateTimeFormat("en-US", options);
			setCurrentTime(formatter.format(new Date()));
		};

		updateDateTime(); // Initial call
		const interval = setInterval(updateDateTime, 60000); // Update every minute

		return () => clearInterval(interval); // Cleanup on unmount
	}, []);

	// Update the getWallet function
	async function getWallet() {
		try {
			setLoading(true);
			let res = await api.get(`/wallet/commission`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			const data = res.data.message;
			setWallet(data);
			if (wallet) {
				setNumberInWallet(wallet?.split(" ").splice(5, 6)[0]);
			}
		} catch (err) {
			console.error("Error fetching wallet balance:", err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Box sx={{ pb: "70px" }}>
			{/* page title */}
			<Typography
				variant="h4"
				sx={{
					textAlign: "left",
					fontSize: {
						xs: "1.5rem", // Font size for extra-small screens
						md: "2rem", // Font size for medium screens
						lg: "3rem", // Font size for large screens
					},
					fontWeight: "bold",
					marginBottom: "20px",
					pl: "20px",
					pt: "20px",
				}}
			>
				Your Wallet
			</Typography>

			{/* Live Date and Time */}
			<Typography
				variant="h6"
				sx={{
					textAlign: "left",
					fontSize: {
						xs: ".8rem", // Font size for extra-small screens
						md: "1rem", // Font size for medium screens
						lg: "1.4rem", // Font size for large screens
					},
					marginBottom: "20px",
					pl: "20px",
				}}
			>
				{currentTime}
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "20px",
				}}
			>
				{/* wallet reports cards */}
				<CardColumn />
				{/* wallet control cards for mobile view */}
				<Box
					sx={{
						display: { xs: "flex", md: "none" }, // Responsive display
						flexWrap: "wrap", // Allow items to wrap
						justifyContent: "space-between", // Space between items
						gap: "2px", // Gap between items
						alignItems: "start", // Align items to the start vertically
						width: "100%", // Full width
						px: "20px", // Padding on the x-axis
						flexDirection: "row", // Inner content in rows
					}}
				>
					<Box
						sx={{
							display: "flex", // Flexbox container
							flexWrap: "wrap", // Allow wrapping
							width: "48%", // Set the container width
							justifyContent: "space-between",
							gap: "25px", // Add a 2px gap between items
						}}
					>
						<Box sx={{ width: "100%" }}>
							{" "}
							{/* Each section takes 48% of the row */}
							<Balance
								getWallet={getWallet}
								wallet={wallet}
								token={token}
							/>
						</Box>
						<Box sx={{ width: "100%", height: "100%" }}>
							<WithDraw token={token} />
						</Box>
					</Box>

					<Box
						sx={{
							display: "flex", // Flexbox container
							flexWrap: "wrap", // Allow wrapping
							width: "48%", // Set the container width
							justifyContent: "space-between",
							gap: "25px", // Add a 2px gap between items
						}}
					>
						<Box
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "start",
								alignItems: "start",
							}}
						>
							<Charging getWallet={getWallet} token={token} />
						</Box>

						<Box sx={{ width: "100%" }}>
							<Transformation
								getWallet={getWallet}
								token={token}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* contanier for wallet control cards and analytics reports for desktop view */}
			<Box
				sx={{
					width: "100%",
					display: {
						xs: "block",
						md: "flex",
					},
					gap: "20px",
					px: "20px",
					// overflow: "hidden",
					// backgroundColor:"red"
				}}
			>
				{/* analytics reports */}
				<Box
					sx={{
						// backgroundColor:"yellow",

						height: {
							xs: "600px",
							md: "1000px",
							// lg: "100%",
						},
						width: {
							xs: "100%",
							md: "100%",
							lg: "100%",
						},
						maxWidth: "800px",
						mt: "10px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start",
						alignItems: "center",
					}}
				>
					<Typography
						variant="h6"
						sx={{
							textAlign: "left",
							fontSize: "2rem",
							fontWeight: "bold",
							pt: "10px",
							// pb: "50px",
							marginBottom: "20px",
							pl: "20px",
						}}
					>
						Analytics Reports
					</Typography>

					<Box
						sx={{
							height: {
								xs: "100%",
								md: "1000px",
								lg: "1000px",
							},
							width: "90%",
							mt: "20px",
							// backgroundColor:"green"
						}}
					>
						<WeeklyChart />
					</Box>
					<Box
						sx={{
							height: {
								xs: "1050px",
								md: "100px",
								lg: "1000px",
							},
							width: "90%",
							mt: "20px",
							// backgroundColor:"green"
						}}
					>
						<BarChart />
					</Box>
				</Box>

				{/* wallet controol cards */}
				<Box
					sx={{
						display: {
							xs: "none",
							md: "flex",
						},
						justifyContent: "center",
						alignItems: "center", // Align items to the start vertically
						width: "40%", // Full width
						// px: "20px", // Padding on the x-axis
						flexDirection: "column", // Inner content in rows
						gap: "2px", // Gap between items
					}}
				>
					<Balance
						getWallet={getWallet}
						wallet={wallet}
						token={token}
					/>

					<TokenWallet/>
					<Charging getWallet={getWallet} token={token} />
					<WithDraw token={token} />
					<Transformation getWallet={getWallet} token={token} />
				</Box>
			</Box>
		</Box>
	);
}
