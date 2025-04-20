/* eslint-disable no-irregular-whitespace */
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// components
import { Box } from "@mui/material";

// context || Api
import { Context } from "@/Context";
import useApi from "@/api";

// assets

import DownlineDetailsT from "../Components/DownlineDetailsT.jsx";
import NetworkStatusT from "../Components/NetworkStatusT.jsx";
import YourStatics from "../Components/YourStatics.jsx";
import CurrentRankSide from "../Components/CurrentRankSide.jsx";



function Dashboard() {
	// config
	const api = useApi();
	const { user, setUser } = useContext(Context);
	const navigate = useNavigate();
	// sponsor id

	const token = localStorage.getItem("token");

	// Get user data from localStorage


	const [count, setCount] = useState({
		left_downlines_count: "-",
		right_downlines_count: "-",
	});
	const [evaluate, setEvaluate] = useState(null);
	const [err, setError] = useState(null);

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
		const CriteriaForNextRank = async () => {
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


	// on render
	useEffect(() => {
		getVolumes();
		getCounts();
		getRankEvaluate();
		getUser();
	}, []);

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
					<NetworkStatusT />

					<DownlineDetailsT />
				</Box>

				{/* Right Side */}
				<CurrentRankSide />
			</Box>

			{/* 2nd section */}
			<YourStatics />
		</Box>
	);
}

export default Dashboard;
