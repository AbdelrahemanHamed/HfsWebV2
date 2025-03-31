import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "@/Context";

function Wallet() {
	const { baseUrl,token } = useContext(Context);
	const [walletData, setWalletData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const getBalance = async () => {
		setLoading(true);
		setError(null);
		try {
            const res = await axios.get(`${baseUrl}/wallet/commission`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			if (res.data.status && res.data.result.data.length > 0) {
				setWalletData(res.data.result.data[0]);
			} else {
				setError("No wallet data available");
			}
		} catch (err) {
			setError("Failed to fetch balance. Please try again.");
			console.error("Error fetching balance:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			className="container"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: 4,
				backgroundColor: "#171118",
				borderRadius: 2,
				boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
				maxWidth: 400,
				margin: "auto",
				mt: 4,
				color: "white",
			}}
		>
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				sx={{ color: "#51d5f5" }}
			>
				Wallet Balance
			</Typography>

			{loading ? (
				<CircularProgress sx={{ color: "#51d5f5" }} />
			) : error ? (
				<Typography color="error">{error}</Typography>
			) : walletData ? (
				<Box sx={{ textAlign: "center", mt: 2 }}>
					<Typography
						variant="h5"
						component="p"
						sx={{ color: "white" }}
					>
						Balance: ${walletData.balance}
					</Typography>
					<Typography variant="body1" sx={{ mt: 1, color: "#888" }}>
						Account Name: {walletData.user.name}
					</Typography>
					<Typography variant="body2" sx={{ color: "#666" }}>
						Account ID: {walletData.user.id}
					</Typography>
				</Box>
			) : (
				<Typography variant="body1" sx={{ color: "#888" }}>
					Click the button below to fetch your balance
				</Typography>
			)}

			<Button
				variant="contained"
				onClick={getBalance}
				disabled={loading}
				sx={{
					mt: 3,
					backgroundColor: "#51d5f5",
					"&:hover": {
						backgroundColor: "#3ba8c3",
					},
				}}
			>
				{loading ? "Fetching..." : "Get Balance"}
			</Button>
		</Box>
	);
}

export default Wallet;
