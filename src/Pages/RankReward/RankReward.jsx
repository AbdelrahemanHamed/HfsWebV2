import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Context } from "@/Context";
import axios from "axios";

const RankReward = () => {
	const [ranks, setRanks] = useState([]);
	const [loading, setLoading] = useState(true);
	const { token, user, baseUrl } = useContext(Context);

	useEffect(() => {
		const fetchRanks = async () => {
			if (!token) {
				console.error("No token found");
				return;
			}

			try {
				const response = await axios.get(`${baseUrl}/ranks`, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (response.data.status) {
					setRanks(response.data.result.data);
				}
			} catch (error) {
				console.error("Error fetching ranks:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchRanks();
	}, [token, baseUrl]);

	// Updated to use user from context directly
	const updatedRanks = ranks.map((rank) => ({
		...rank,
		reached: user?.rank?.name === rank.name,
	}));

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					backgroundColor: "#171118",
				}}
			>
				<CircularProgress sx={{ color: "#51d5f5" }} />
			</Box>
		);
	}

	return (
		<Box
			sx={{
				padding: "20px",
				textAlign: "center",
				backgroundColor: "#171118",
			}}
		>
			<Typography
				variant="h4"
				sx={{ mb: 4, fontWeight: "bold", color: "white" }}
			>
				Rank Rewards
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					gap: "20px",
					flexWrap: "wrap",
				}}
			>
				{updatedRanks.map((rank) => (
					<Box
						key={rank.id}
						sx={{
							textAlign: "center",
							width: "300px",
							borderRadius: "8px",
							padding: "20px",
							backgroundColor: "#2A1B2E",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							transition: "transform 0.3s, box-shadow 0.3s",
							"&:hover": {
								transform: "scale(1.05)",
								boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
							},
						}}
					>
						<Box
							component="img"
							src={rank.image}
							alt={rank.name}
							sx={{
								width: "100%",
								height: "200px",
								objectFit: "contain",
								filter: rank.reached
									? "none"
									: "grayscale(100%)",
								opacity: rank.reached ? 1 : 0.6,
							}}
						/>
						<Typography
							variant="h6"
							sx={{
								mt: 2,
								fontWeight: "bold",
								color: rank.reached ? "#51d5f5" : "#888",
							}}
						>
							{rank.name.replace(/_/g, " ")}
						</Typography>
						<Typography
							variant="body1"
							sx={{ mt: 1, color: "white" }}
						>
							Left Volume: {rank.left_volume}
						</Typography>
						<Typography
							variant="body1"
							sx={{ mt: 1, color: "white" }}
						>
							Right Volume: {rank.right_volume}
						</Typography>
						<Typography
							variant="body1"
							sx={{ mt: 1, color: "white" }}
						>
							Direct Referrals: {rank.direct_referrals}
						</Typography>
						{rank.downline_requirements.length > 0 && (
							<Box
								sx={{
									mt: 2,
									color: "white",
									textAlign: "left",
								}}
							>
								<Typography
									variant="body2"
									sx={{ fontWeight: "bold" }}
								>
									Downline Requirements:
								</Typography>
								{rank.downline_requirements.map(
									(req, index) => (
										<Box key={index}>
											{Object.entries(req).map(
												([key, value]) =>
													key !== "min_per_leg" && (
														<Typography
															key={key}
															variant="body2"
														>
															{key}: {value}
														</Typography>
													)
											)}
										</Box>
									)
								)}
							</Box>
						)}
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default RankReward;
