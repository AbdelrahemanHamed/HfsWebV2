/* eslint-disable no-irregular-whitespace */
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import membershipBG from "@/assets/images/membershipBG.svg";
// components
import { Box, IconButton, Typography } from "@mui/material";


// loacl components
import NextRank from "../Components/dashboardComponents/NextRansk/NextRanks.jsx";
import SalesGraph from "../Components/dashboaedstatics/salesGraph.jsx";
import MonthelyTarget from "../Components/dashboardComponents/MonthelyTarget/MonthelyTarget";
// context || Api
import { Context } from "@/Context";
import useApi from "@/api";

// assets
import copy_icon from "@/assets/images/pages_assets/copy_icon.png";
import arrow from "@/assets/images/pages_assets/arrow.png";



function Dashboard() {
	// config
	const api = useApi();
	const { sidebarOpen, user, setUser } = useContext(Context);
	const navigate = useNavigate();
	// sponsor id
	const [sponsorIdCode, setSponsorIdCode] = useState(null); // New state for sponsor_id_code
	const [subscription, setSubscription] = useState(null); // New state for sponsor_id_code
	const token = localStorage.getItem("token");
	
	// Get user data from localStorage

	const [volume, setVolume] = useState({
		left_leg_volume: "-",
		right_leg_volume: "-",
	});
	const [count, setCount] = useState({
		left_downlines_count: "-",
		right_downlines_count: "-",
	});
	const referral = `${window.location.origin}/referral?u=${user.id_code}`;

	const [rows, setRows] = useState([
		{ right: "0", left: "0", rank: "ROYAL CROWN DIAMOND" },
		{ right: "0", left: "0", rank: "CROWN DIAMOND" },
		{ right: "0", left: "0", rank: "BLACK DIAMOND" },
		{ right: "0", left: "0", rank: "BLUE DIAMOND" },
		{ right: "0", left: "0", rank: "DIAMOND" },
		{ right: "0", left: "0", rank: "EMERALD" },
		{ right: "0", left: "0", rank: "RUBY" },
		{ right: "0", left: "0", rank: "SAPPHIRE" },
		{ right: "0", left: "0", rank: "JADE" },
		{ right: "0", left: "0", rank: "EXACTIVE" },
	]);
	const [evaluate, setEvaluate] = useState(null);
	const [err, setError] = useState(null);
	const [rank, setRank] = useState(null);

	const [legData, setLegData] = useState({
		left_leg: null,
		right_leg: null,
	});

	let containerVariants = {
		initial: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
		},
	};

	// methods

	////////////////////////////////////////////////////////////////////////////////////////////
	const CriteriaForNextRank = "test";
	useEffect(() => {
		const 	CriteriaForNextRank = async () => {
			// Ensure token is available before proceeding
			if (!token) {
				setError("No token available for sponsor data");
				return;
			}

			try {
				// Fetch sponsor data from the API
				const response = await axios.get(
					"https://production.hfssociety.com/api/v1/next/rank",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const current_rank = response.data.result.current_rank;
				const Next_rank = response.data.result.next_rank;
				const left_required = response.data.result.left_required;
				const left_current = response.data.result.left_current;
				const right_required = response.data.result.right_required;
				const right_current = response.data.result.right_current;
				const direct_required = response.data.result.direct_required;
				const current_direct = response.data.result.current_direct;
				// Log the response for debugging purposes
				console.log("Sponsor API current_rank:", Next_rank);

		
			
			} catch (err) {
				// Log detailed error information for debugging
				console.error(
					"Error fetching sponsor data:",
					err.response ? err.response.data : err.message
				);
				setError("Error fetching sponsor data");
			}
		};

		// Trigger the API call to fetch sponsor data
	 	CriteriaForNextRank();
	}, [token]); // Dependency on token

	////////////////////////////////////////////////////////////////////////////////////////////

	const getVolumes = async () => {
		try {
			const res = await api.get("/downlines-volume");

			const data = await res.data.notwork_voluum;

			setVolume(data);
		} catch (err) {
			// toast.error(err.response?.data?.message);

			console.error(err);
		}
	};
	const getCounts = async () => {
		try {
			const res = await api.get("/downline-counts");

			const data = await res.data.count;

			setCount(data);
		} catch (err) {
			// toast.error(err.response?.data?.message);
			console.error(err);
		}
	};
	const getRank = async () => {
		try {
			const res = await api.get("/rank");
			setRank(res.data.rank);
		} catch (err) {
			console.error(err);
		}
	};
	const getMemberDownLine = async () => {
		try {
			const res = await api.get("/members/downlines");
			const data = res.data.downline_details;
			setRows(data);
		} catch (err) {
			consol.error(err);
		}
	};
	const getUser = async () => {
		try {
			const { data } = await api.get("/user/data");
			const userData = data["user data"];

			setUser(userData);
			setLegData({
				left_leg: userData.left_leg || {
					id: "-",
					id_code: "-",
					full_name: "No Left Leg",
				},
				right_leg: userData.rightLeg || {
					id: "-",
					id_code: "-",
					full_name: "No Right Leg",
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	const getRankEvaluate = async () => {
		try {
			const res = await api.get("/rank/evaluate");

			const data = res.data;
			setEvaluate(data);
		} catch (err) {
			setError(err.response?.data?.message);
		}
	};

	const copyReferral = async () => {
		try {
			await navigator.clipboard.writeText(referral);
			toast.success("Referral Link has been copied to clipboard");
		} catch (error) {
			toast.error("Can't copy the `Referral Link`");
		}
	};

	// on render
	useEffect(() => {
		getVolumes();
		getCounts();
		getRank();
		getMemberDownLine();
		getRankEvaluate();
		getUser();
	}, []);



	// get user data from local storage

	const userArray = JSON.parse(localStorage.getItem("user"));

	const userId = userArray.id ;
	// const sponserId = userArray.sponsor.id_code;
	const CurrentRank = userArray.rank.name ; // Indexes correspond to the positions in the array
	const left_leg_cv = user.left_leg_cv;
	const rankImg = userArray.rank.image?.url || 'https://via.placeholder.com/150';
	const userSubscription = userArray.subscription.name  ;
	const usersubscriptionDate = userArray.subscription.expired_at  ;
	const usersubscriptionRemainingDays = userArray.subscription.remaining_days ;
	const total_downline = userArray.total_downline ;


	






	// data

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{/* first section */}
			<Box
				component={motion.div}
				// className="container"
				variants={containerVariants}
				initial="initial"
				animate="visible"
				transition={{ duration: 3 }}
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: { xs: "column", lg: "row" },
					justifyContent: "center",
					gap: "30px",
					transition: "400ms all ",
					px: "50px",
					pt: "50px",
					// backgroundColor: "green",
				}}
			>
				{/* left Side */}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: { xs: "5px", xl: "30px" },
						flex: 1,
					}}
				>
					<Box
						sx={{
							// width: sidebarOpen
							// ? { xs: "100%", md: "600px", xl: "900px" }
							// : { xs: "100%", md: "700px", xl: "900px" },
							height: { xs: "288px", xl: "288px" },
							borderRadius: "15px",
						}}
					>
						<Box
							sx={{
								background:
									"linear-gradient(340.13deg, #DC4B9A 40.3%, #51D5F5 59.7%)",
								height: "71px",
								borderRadius: "15px 15px 0 0",
								display: "flex",
								justifyContent: "space-between",
								px: "30px",
								alignItems: "center",
							}}
						>
							<Typography
								sx={{
									fontSize: {
										xs: "12px",
										sm: "18px",
										md: "20px",
									},
								}}
							>
								LEFT
							</Typography>
							<Typography
								sx={{
									fontSize: {
										xs: "13px",
										sm: "18px",
										md: "20px",
									},
									fontWeight: "bold",
								}}
							>
								Network status
							</Typography>
							<Typography
								sx={{
									fontSize: {
										xs: "12px",
										sm: "18px",
										md: "20px",
									},
								}}
							>
								RIGHT
							</Typography>
						</Box>

						<Box
							sx={{
								height: "auto",
								px: "30px",
								py: "25px",
								backgroundColor: "#091B29",
								display: "flex",
								justifyContent: "space-between",
								textAlign: "center",
								borderRadius: "0 0  15px 15px",
							}}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									gap: "20px",
								}}
							>
								<Typography
									sx={{
										fontSize: {
											xs: "16px",
											sm: "18px",
											md: "20px",
										},
									}}
								>
									{volume.left_leg_volume}
								</Typography>
								<Typography
									sx={{
										fontSize: {
											xs: "16px",
											sm: "18px",
											md: "20px",
										},
									}}
								>
									{left_leg_cv}
								</Typography>
								<Typography
									sx={{
										fontSize: {
											xs: "16px",
											sm: "18px",
											md: "20px",
										},
									}}
								>
									 {total_downline.right}
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									gap: "20px",
								}}
							>
								<Typography
									sx={{
										fontSize: {
											xs: "16px",
											sm: "18px",
											md: "20px",
										},
										fontWeight: "medium",
									}}
								>
									Rank volume
								</Typography>
								<Typography
									sx={{
										fontSize: {
											xs: "16px",
											sm: "18px",
											md: "20px",
										},
										fontWeight: "medium",
									}}
								>
									Total Network volume
								</Typography>
								<Typography
									sx={{
										fontSize: {
											xs: "16px",
											sm: "18px",
											md: "20px",
										},
										fontWeight: "medium",
									}}
								>
									Total down line
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									gap: "20px",
								}}
							>
								<Typography
									sx={{
										fontSize: {
											xs: "16px",
											sm: "18px",
											md: "20px",
										},
									}}
								>
									{volume.right_leg_volume}
								</Typography>
								<Typography
									sx={{
										fontSize: {
											xs: "16px",
											sm: "18px",
											md: "20px",
										},
									}}
								>
									 {left_leg_cv}
								</Typography>
								<Typography
									sx={{
										fontSize: {
											xs: "16px",
											sm: "18px",
											md: "20px",
										},
									}}
								>
									{total_downline.right}
								</Typography>
							</Box>
						</Box>
					</Box>

					<Box
						sx={{
							width: "auto",
							height: "100%",
							borderRadius: "15px",
						}}
					>
						<Box
							sx={{
								background:
									"linear-gradient(340.13deg, #DC4B9A 40.3%, #51D5F5 59.7%)",
								height: "71px",
								borderRadius: "15px 15px 0 0",
								display: "flex",
								justifyContent: "space-between",
								px: "30px",
								alignItems: "center",
							}}
						>
							<Typography
								sx={{
									fontSize: {
										xs: "12px",
										sm: "18px",
										md: "20px",
									},
								}}
							>
								LEFT
							</Typography>
							<Typography
								sx={{
									fontSize: {
										xs: "13px",
										sm: "18px",
										md: "20px",
									},
									fontWeight: "bold",
								}}
							>
								DownLine Detaills
							</Typography>
							<Typography
								sx={{
									fontSize: {
										xs: "12px",
										sm: "18px",
										md: "20px",
									},
								}}
							>
								RIGHT{" "}
							</Typography>
						</Box>
						<Box
							sx={{
								height: "fit-content",
								borderRadius: "0 0 15px 15px",
								backgroundColor: "#091B29",
								textAlign: "center",
								// pb: "30px",
							}}
						>
							{/* 1 row */}

							{rows.map((row, index) => {
								const isLastRow = index === rows.length - 1;
								return (
									<Box
										key={index}
										sx={{ position: "relative" }}
									>
										<Box
											sx={{
												display: "flex",
												textAlign: "center",
												justifyContent: "space-between",
												width: "88%",
												mx: "auto",
												pt: "8px",
												pb: "8px",
												gap: "20px",
											}}
										>
											<Typography
												sx={{ fontSize: "19px" }}
											>
												{row.left}
											</Typography>
											<Typography
												sx={{ fontSize: "14px" }}
											>
												{row.rank}
											</Typography>
											<Typography
												sx={{ fontSize: "19px" }}
											>
												{row.right}
											</Typography>
										</Box>
										{!isLastRow && (
											<Box
												sx={{
													border: "0px solid white",
													backgroundColor: "white",
													height: ".1px",
												}}
											></Box>
										)}
									</Box>
								);
							})}
						</Box>
					</Box>
				</Box>

				{/* Right Side */}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						gap: {
							xs: "30px",
							md: "0px",
						},
						flex: { sm: 0.1 },
					}}
				>
					{/* referral link */}
					<Box
						sx={{
							// maxWidth: "355px",
							height: "103px",
							backgroundImage: `url(${membershipBG})`,
							backgroundSize: "cover",
							backgroundRepeat: "repeat", // Repeat the pattern
							borderRadius: "15px",
							p: "10px",
							display: "flex",
							justifyContent: "ceneter",
							alignItems: "center",
							flexDirection: "column",
							gap: "1px",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: "5px",
							}}
						>
							<Typography
								sx={{ fontSize: "19px", fontWeight: "bold" }}
							>
								Referral link
							</Typography>

							<Box
								sx={{
									display: "flex",
									gap: "20px",
									alignItems: "center",
								}}
							>
								<Box
									sx={{
										width: "200px",
										height: "38px",
										borderRadius: "5px",
										flex: 1,
										backgroundColor: "#FFFFFF",
										display: "flex",
										justifyContent: "start",
										alignItems: "center",
										px: "10px",
									}}
								>
									<Typography
										sx={{
											backgroundColor: "#FFFFFF",
											color: "black",
											mask: "linear-gradient(90deg, black 100%, transparent)",
											overflow: "hidden",
										}}
									>
										<span
											className="oneLine"
											style={{ flex: "2" }}
										>
											{referral}
										</span>
									</Typography>
								</Box>
								<Box
									sx={{
										width: "32px",
										height: "32px",
										backgroundColor: "#fff",
										borderRadius: "50%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<IconButton onClick={copyReferral}>
										<Box
											component="img"
											src={copy_icon}
											sx={{
												width: "18px",
												height: "18px",
											}}
										/>
									</IconButton>
								</Box>
							</Box>
						</Box>
					</Box>
					{/* membership and sponser ID */}
					<Box
						sx={{
							borderRadius: "15px",
							backgroundImage: `url(${membershipBG})`,
							backgroundSize: "cover",
							backgroundRepeat: "repeat", // Repeat the pattern
							display: "flex",
							flexDirection: "column",
							justifyContent: "start",
							alignItems: "left",
							height: "103px",
							p: "1em",
						}}
					>
						<Typography
							sx={{
								fontSize: "15px",
								lineHeight: "2",
							}}
							variant="h6"
						>
							{/* Sponsor ID: {sponserId} */}
						</Typography>

						<br />
						<Box sx={{ display: "flex", gap: "20px",flexDirection: "row",justifyContent: "space-between",alignItems: "center", }}>
							<Typography
								sx={{
									fontSize: "15px",
									lineHeight: "2",
									// letterSpacing: "8px",
								}}
							>
								{userSubscription
									? `My Membership: ${userSubscription}`
									: "Not Subscribed"}
									

							</Typography>
							<Typography sx={{fontSize:"15px",display: "flex", gap: "4px", alignItems: "center"}}>
								{usersubscriptionRemainingDays} <Typography sx={{fontSize:"10px"}}>Day</Typography> 
							</Typography>
						</Box>
					</Box>

					{/* Current Rank */}
					<Box
						component={motion.div}
						initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
						whileHover={
							{
								// y: -200,
								// x: -400,
								// rotate: 360,
								// scale: 2,
								// backgroundColor: "#2B6145",
							}
						}
						transition={{ duration: 0.2, type: "easeInOut" }}
						sx={{
							// width: "355px",
							height: "163px",
							backgroundColor: "#061622",
							// mt: "10px",
							mb: "0px",
							borderRadius: "15px",
							p: "15px",
							position: "relative",
							display: "flex",
							flexDirection: "column",
							gap: "30px",
							cursor: "pointer",
						}}
						onClick={() => {
							navigate("/MembershipTier");
						}}
					>
						<Box sx={{ display: "flex", gap: "20px" }}>
							<Typography
								sx={{
									fontSize: "15px",
									lineHeight: "17.9px",
									letterSpacing: "8px",
								}}
							>
								Current
								<br />
								Rank
							</Typography>
							<Box 
								sx={{ 
								display: "flex", 
								gap: "20px",
								component: "img",
								src: rankImg,
								backgroundColor: "red",
								width: "10%",
								height: "100%",
								objectFit: "cover",  // Optional: Makes the image fit within the box while maintaining aspect ratio
								}}
							/>
						</Box>
				

						
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography
								sx={{
									fontSize: "15px",
									fontWeight: "700",
									letterSpacing: "8px",
									alignSelf: "center",
								}}
							>
								{CurrentRank}
							</Typography>

							<Box>
								<Box
									component="img"
									src={arrow}
									sx={{ width: "20.81px" }}
								/>
							</Box>
						</Box>
						<Box
							sx={{
								backgroundImage: `url(${rank?.image})`,
								// width: "133px",
								height: "133px",
								backgroundSize: "cover",
								objectFit: "cover",
								backgroundPosition: "center",
								position: "absolute",
								top: "-60px",
								right: "30px",
							}}
						></Box>
					</Box>

					{/* creteria for next Rank */}
							<NextRank/>
				</Box>
			</Box>

			{/* 2nd section */}
			<Box
				sx={{
					// backgroundColor: "yellow",

					// Responsive styles for mobile view
					"@media (max-width: 600px)": {
						flexDirection: "column", // Stack items vertically
						// gap: "10px", // Adjust gap if needed
						display: "flex",
						width: "100%",
						justifyContent: "space-between",
						gap: "20px",
					},
				}}
			>
				<Typography
					sx={{
						fontSize: "2rem",
						fontWeight: "700",
						textAlign: {
							xs: "center",
							md: "left",
						},
						pl: "20px",
						pt: "-40px",
					}}
				>
					Your Statics
				</Typography>
				<Box
					sx={{
						display: "flex",
						gap: "20px",
						width: "100%",
						mb: "200px",
						"@media (max-width: 600px)": {
							flexDirection: "column", // Stack items vertically
							// gap: "10px", // Adjust gap if needed
							display: "flex",
							width: "100%",
							justifyContent: "space-between",
							gap: "20px",
							"@media (max-width: 600px)": {
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								gap: "20px",
							},
						},
					}}
				>
					{/* left side 2nd section */}
					<Box
						sx={{
							width: {
								xs: "100%",
								md: "65%",
							},
						}}
					>
						<SalesGraph />
					</Box>
					{/* right side 2nd section */}
					<Box
						sx={{
							width: {
								xs: "80%",
								md: "30%",
							},
							"@media (max-width: 600px)": {
								height: "400px",
							},
						}}
					>
						<MonthelyTarget />
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default Dashboard;
