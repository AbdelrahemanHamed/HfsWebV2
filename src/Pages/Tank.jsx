import { useContext, useEffect, useState } from "react";
import {
	Box,
	Button,
	Typography,
	Pagination,
	CircularProgress,
} from "@mui/material";
import { Context } from "@/Context";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import toast from "react-hot-toast";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const background = "linear-gradient(280.13deg, #DC4B9A 40.3%, #51D5F5 59.7%)";

function Tank() {
	const { token, user, baseUrl } = useContext(Context);
	const [tanks, setTanks] = useState([]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [loading, setLoading] = useState(true);

	const getTanks = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				`${baseUrl}/user/tank?per_page=5&page=${page}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.data.status) {
				const { data, meta } = response.data.result;
				setTanks(data);
				setPages(meta.last_page);
			}
		} catch (error) {
			console.error("Error fetching tanks:", error);
			toast.error(
				error.response?.data?.message || "Failed to fetch tank data"
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (token) {
			getTanks();
		}
	}, [page, token]);

	return (
		<div className="container">
			<Box
				sx={{
					maxWidth: "1200px",
					margin: "auto",
					borderRadius: "15px",
					mt: "1em",
				}}
			>
				<Box
					sx={{
						width: "100%",
						height: "131px",
						display: "flex",
						alignItems: "center",
						fontSize: {
							xs: "1.5rem",
							md: "2rem",
							lg: "3rem",
						},
						fontWeight: "900",
						color: "white",
					}}
				>
					Your Tank
				</Box>

				<Box
					sx={{
						background,
						height: "71px",
						borderRadius: "15px 15px 0 0",
						display: "flex",
						justifyContent: "space-between",
						px: "30px",
						alignItems: "center",
					}}
				>
					<Typography sx={{ fontSize: "19px" }}>
						Tank Members
					</Typography>
					<Typography sx={{ fontSize: "19px" }}>
						Your ID: {user?.id_code}
					</Typography>
				</Box>

				{loading ? (
					<Box
						sx={{
							p: 4,
							textAlign: "center",
							backgroundColor: "#091B29",
						}}
					>
						<CircularProgress sx={{ color: "#51d5f5" }} />
					</Box>
				) : tanks.length > 0 ? (
					<>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: "1em",
								justifyContent: "center",
								backgroundColor: "#091B29",
								p: 2,
							}}
						>
							{tanks.map((member, index) => (
								<RenderMember
									key={member.id || index}
									full_name={member.full_name}
									id_code={member.id_code}
									id={member.id}
									sponsor={member.sponsor}
									mobile={member.mobile}
									rank={member.rank}
									getTanks={getTanks}
								/>
							))}
						</Box>

						<ThemeProvider theme={darkTheme}>
							<CssBaseline />
							<Box
								sx={{
									p: 2,
									backgroundColor: "#091B29",
									borderRadius: "0 0 15px 15px",
								}}
							>
								<Pagination
									sx={{ margin: "10px auto", width: "max-content" }}
									color="primary"
									count={pages}
									page={page}
									onChange={(e, newPage) => setPage(newPage)}
								/>
							</Box>
						</ThemeProvider>
					</>
				) : (
					<Box
						sx={{
							textAlign: "center",
							p: 4,
							backgroundColor: "#091B29",
							color: "white",
							borderRadius: "0 0 15px 15px",
						}}
					>
						<Typography variant="h6">
							No members in your tank.
						</Typography>
						<Typography variant="body1" sx={{ mt: 1 }}>
							Your tank is currently empty. Start adding members to see them here.
						</Typography>
					</Box>
				)}
			</Box>
		</div>
	);
}

export default Tank;

function RenderMember({ id, full_name, id_code, sponsor, mobile, rank, getTanks }) {
	const { token, baseUrl } = useContext(Context);
	const [loading, setLoading] = useState(false);

	const append = async (leg) => {
		try {
			setLoading(true);
			await axios.post(
				`${baseUrl}/user/commission`,
				{ referral_id: id, leg },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			toast.success("User successfully placed!");
			getTanks();
		} catch (err) {
			toast.error(err.response?.data?.message || "Failed to place user");
			console.error("Error placing user:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				width: 250,
				p: 2,
				backgroundColor: "#16222A",
				borderRadius: "12px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				textAlign: "left",
				"&:hover": { bgcolor: "#794Bd922" },
			}}
		>
			<Typography variant="h6">{full_name}</Typography>
			<Typography variant="body2">ID: {id_code}</Typography>
			<Typography variant="body2">Mobile: {mobile}</Typography>

			<Box
				sx={{
					display: "flex",
					gap: "1em",
					justifyContent: "center",
					mt: 2,
				}}
			>
				<Button
					variant="outlined"
					color="secondary"
					disabled={loading}
					onClick={() => append("left")}
				>
					To Left
				</Button>
				<Button
					variant="outlined"
					color="primary"
					disabled={loading}
					onClick={() => append("right")}
				>
					To Right
				</Button>
			</Box>
		</Box>
	);
}
