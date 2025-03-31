import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
} from "chart.js";
import {
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend
);

const SalesGraph = () => {
	const [selectedSalesType, setSelectedSalesType] = useState("yearly");
	const [salesData, setSalesData] = useState({
		weekly_sales: {},
		monthly_sales: {},
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sponsorIdCode, setSponsorIdCode] = useState(null); // New state for sponsor_id_code

	// Retrieve token from localStorage
	const token = localStorage.getItem("token");

	const handleSalesTypeChange = (event) => {
		setSelectedSalesType(event.target.value);
	};

	useEffect(() => {
		const fetchSalesData = async () => {
			if (!token) {
				setError("No token available");
				setLoading(false);
				return;
			}

			console.log("User Token:", token); // Log the token for debugging

			try {
				const response = await axios.get(
					"https://production.hfssociety.com/api/v1/members/yearly-sales-in-Weeks",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				// Log the entire response to the console
				console.log("API Response:", response);

				if (response.data.status) {
					setSalesData(response.data.data);
				} else {
					setError("Failed to fetch data");
				}
			} catch (err) {
				console.error(
					"Error fetching data:",
					err.response ? err.response.data : err.message
				);
				// setError('Error fetching data');
			} finally {
				setLoading(false);
			}
		};

		const fetchSponsorIdCode = async () => {
			if (!token) {
				setError("No token available for sponsor data");
				setLoading(false);
				return;
			}

			try {
				const response = await axios.get(
					"https://production.hfssociety.com/api/v1/user/data",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				// Log the entire response to the console for debugging
				console.log("Sponsor API Response:", response);

				if (response.data.status) {
					// Extract and set sponsor_id_code
					setSponsorIdCode(
						response.data["user data"].sponsor_id_code
					);
					console.log(
						"Sponsor ID Code:",
						response.data["user data"].sponsor_id_code
					); // Log the sponsor_id_code
				} else {
					setError("Failed to fetch sponsor data");
				}
			} catch (err) {
				console.error(
					"Error fetching sponsor data:",
					err.response ? err.response.data : err.message
				);
			}
		};

		if (token) {
			fetchSalesData();
			fetchSponsorIdCode(); // Fetch sponsor_id_code as well
		} else {
			setLoading(false); // Stop loading if token isn't available
		}
	}, [token]); // Dependency on token to refetch if it changes

	const yearlySalesData = Object.values(salesData.weekly_sales);
	const monthlySalesData = Object.values(salesData.monthly_sales);

	const labelsForWeeks = Object.keys(salesData.weekly_sales).map(
		(week) => `Week ${week}`
	);
	const labelsForMonths = Object.keys(salesData.monthly_sales);

	const data = {
		labels:
			selectedSalesType === "yearly" ? labelsForWeeks : labelsForMonths,
		datasets: [
			{
				label:
					selectedSalesType === "yearly"
						? "Yearly Sales"
						: "Monthly Sales",
				data:
					selectedSalesType === "yearly"
						? yearlySalesData
						: monthlySalesData,
				borderColor:
					selectedSalesType === "yearly" ? "#36A2EB" : "#cb4b93",
				backgroundColor:
					selectedSalesType === "yearly"
						? "rgba(54, 162, 235, 0.2)"
						: "rgba(203, 75, 147, 0.2)",
				pointBackgroundColor:
					selectedSalesType === "yearly" ? "#36A2EB" : "#cb4b93",
				pointBorderColor:
					selectedSalesType === "yearly" ? "#36A2EB" : "#cb4b93",
				tension: 0.4,
				borderWidth: window.innerWidth <= 600 ? 2 : 3, // Adjust line thickness based on screen width
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text:
					selectedSalesType === "yearly"
						? "Yearly Sales (Weekly Data)"
						: "Yearly Sales (Monthly Data)",
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text:
						selectedSalesType === "yearly"
							? "Weeks of the Year"
							: "Months of the Year",
				},
			},
			y: {
				title: {
					display: true,
					text: "Sales (in USD)",
				},
			},
		},
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<Box sx={{ width: "100%", padding: "2rem" }}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
					marginBottom: 3,
				}}
			>
				<Typography
					variant="h6 "
					sx={{
						textAlign: { xs: "center", sm: "left" },
						width: "100%",
					}}
				>
					Select Sales Graph Type
				</Typography>
				<RadioGroup
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						gap: 2,
						justifyContent: { xs: "center", sm: "flex-start" },
						alignItems: { xs: "center", sm: "flex-start" },
					}}
					row
					aria-label="salesType"
					name="salesType"
					value={selectedSalesType}
					onChange={handleSalesTypeChange}
				>
					<FormControlLabel
						value="yearly"
						control={<Radio />}
						label="Yearly Sales (Weeks)"
						sx={{
							"& .MuiRadio-root": {
								color:
									selectedSalesType === "yearly"
										? "#36A2EB"
										: "gray",
							},
							"& .MuiFormControlLabel-label": {
								fontSize: "16px",
								fontWeight:
									selectedSalesType === "yearly"
										? "bold"
										: "normal",
							},
						}}
					/>
					<FormControlLabel
						value="monthly"
						control={<Radio />}
						label="Monthly Sales (Months)"
						sx={{
							"& .MuiRadio-root": {
								color:
									selectedSalesType === "monthly"
										? "#cb4b93"
										: "gray",
							},
							"& .MuiFormControlLabel-label": {
								fontSize: "16px",

								fontWeight:
									selectedSalesType === "monthly"
										? "bold"
										: "normal",
							},
						}}
					/>
				</RadioGroup>
			</Box>
			<Box sx={{ height: "400px" }}>
				<Line data={data} options={options} />
			</Box>
		</Box>
	);
};

export default SalesGraph;
