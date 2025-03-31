import {
	CardActions,
	Button,
	Typography,
	CardContent,
	Card,
	Modal,
	Avatar,
	Box,
	TextField,
	Backdrop,
	CircularProgress,
} from "@mui/material";
import { keyframes } from "@mui/system"; // Import keyframes for MUI

// assets

import UserProfile from "@/assets/images/UserProfile.png";

// icon
import SettingsIcon from "@mui/icons-material/Settings"; // Import Material-UI settings icon

import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "@/Context";

import css from "./style.module.css";

import useApi from "@/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
	// config
	const { register, handleSubmit } = useForm();
	const api = useApi();
	const { user, setUser: setUserContext } = useContext(Context);

	// data
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [rank, setRank] = useState(null);

	// Create a gradient animation

	const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

	const [rotating, setRotating] = useState(false);

	const handleClick = () => {
		setRotating(!rotating);
		handleOpen(); // Call the passed handleOpen function
	};

	// methods
	const submit = async (payload) => {
		try {
			setLoading(true);
			const res = await api.post("/edit/profile", payload);
			const data = res.data.result.user;

			// Update local state and context
			setUserContext({
				...data,
				username: data.full_name,
				rank_name: data.placement || "No Rank",
				sponsor_name: data.sponsor?.full_name || "No Sponsor",
				sponsor_id_code: data.sponsor?.id_code || "No Sponsor ID",
				subscription: data.account_status || "Not Active",
			});

			// Update localStorage
			localStorage.setItem("user", JSON.stringify(data));
			handleClose();
			toast.success("Profile updated successfully");
		} catch (err) {
			console.error(err);
			toast.error(
				err.response?.data?.message || "Failed to update profile"
			);
		} finally {
			setLoading(false);
		}
	};

	// Add local state to track user data
	const [localUser, setLocalUser] = useState(user);

	// Update getUserData function
	const getUserData = async () => {
		try {
			const res = await api.get("/me");
			const userData = res.data.result.user;

			const updatedUser = {
				...userData,
				username: userData.full_name,
				rank_name: userData.placement || "No Rank",
				sponsor_name: userData.sponsor?.full_name || "No Sponsor",
				sponsor_id_code: userData.sponsor?.id_code || "No Sponsor ID",
				subscription: userData.account_status || "Not Active",
			};

			setLocalUser(updatedUser);
			setUserContext(updatedUser);
		} catch (err) {
			console.error(err);
			toast.error("Failed to load user data");
		}
	};

	// Update form submission to use local state
	const onSubmit = async (formData) => {
		try {
			setLoading(true);
			await submit(formData);

			// Update local state immediately
			setLocalUser((prev) => ({
				...prev,
				...formData,
			}));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [deleteModal, setDeleteModal] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	// on Component render
	useEffect(() => {
		getUserData();
	}, []);

	if (user)
		// render
		return (
			<Box sx={{ p: 7 }}>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Typography
						sx={{ mb: 2, fontSize: "30px", fontWeight: "700" }}
					>
						Your Profile
					</Typography>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Button
							onClick={handleClick}
							sx={{
								width: "10px", // Square button
								height: "40px", // Square button
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "rgba(92, 6, 63, 1)", // Purple color
								borderRadius: "8px",
								border: "none",
								boxShadow: "0 4px 6px rgba(0, 0, 0, 1)",
								"&:hover": {
									backgroundColor: "#3700b3", // Darker shade on hover
								},
								transition:
									"background-color 0.3s ease, transform 0.3s ease", // Smooth hover
							}}
						>
							<SettingsIcon
								sx={{
									color: "white",
									fontSize: "25px",
									transform: rotating
										? "rotate(360deg)"
										: "rotate(0deg)", // Apply rotation when clicked
									animation: rotating
										? `${rotateAnimation} 0.5s ease`
										: "none", // Apply rotation animation
								}}
							/>{" "}
							{/* Settings icon */}
						</Button>
						<Link  to="/reset-password">Reset Password</Link>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						gap: 2, // Adds spacing between boxes
						// backgroundColor: "green",
					}}
				>
					{/* First column with two boxes */}
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2, // Adds spacing between the two boxes in the first column
							flex: "1 1 50%", // Adjust width as needed
						}}
					>
						{/* user info data */}
						<Box
							sx={{
								mb: 2,
								backgroundColor: "rgba(255, 255, 255, 0.05)", // Semi-transparent background
								backgroundImage: `url(${UserProfile})`,
								backgroundSize: "cover", // Make image cover the entire box
								backgroundPosition: {
									xs: "center",
									sm: "right",
									md: "right",
								}, // Center the image within the box
								backdropFilter: "blur(10px)", // Blur effect
								borderRadius: "10px", // Rounded corners
								padding: "10px",
								height: "200px",
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								gap: "20px",
								pl: "20px",
								pr: "50px",
								alignItems: "center",
								boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Optional glass-like shadow
								border: "1px solid rgba(255, 255, 255, 0.1)", // Border for the glass effect
							}}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									gap: "20px",
									pl: "20px",
								}}
							>
								<Avatar
									src={user.photo}
									sx={{
										mb: 2,
										backgroundColor:
											"rgba(163, 4, 123, 0.86)", // Semi-transparent background
										backdropFilter: "blur(10px)", // Blur effect
										// borderRadius: "10px", // Rounded corners
										padding: "10px",
										height: 100,
										width: 100,
										display: "flex",
										flexDirection: "row",
										gap: "20px",
										alignItems: "center",
										boxShadow:
											"0px 0px 30px 1px rgb(231, 225, 225,.1)", // Corrected boxShadow syntax
										border: "1px solid rgba(255, 255, 255, 0.3)", // Border for glass effect
									}}
								>
									{user.photo
										? ""
										: user.first_name
												?.charAt(0)
												.toUpperCase() || "?"}
								</Avatar>
								<Box
									sx={{
										display: "flex",
										//   alignItems: "center",
										gap: "10px",
										//   display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "left",
									}}
								>
									<Typography
										variant="h5"
										component="div"
										sx={{
											color: "white",
											fontWeight: "800",
											fontSize: "20px",
										}}
									>
										{user.full_name}
									</Typography>
									<Typography
										sx={{
											color: "#ddd",
											fontSize: "15px",
										}}
									>
										{user.id_code}
									</Typography>
								</Box>
							</Box>
							<Box
								sx={{
									backgroundColor: "rgba(0, 0, 0, 0.86)", // Semi-transparent background
									backdropFilter: "blur(10px)", // Blur effect
									borderRadius: "30px", // Rounded corners
									padding: "10px",
									display: "flex",
									flexDirection: "column",
									gap: "10px",
									boxShadow:
										"0px 0px 30px 1px rgb(231, 225, 225,.1)", // Corrected boxShadow syntax
									border: "1px solid rgba(255, 255, 255, 0.3)", // Border for glass effect
								}}
							>
								<Typography
									sx={{
										color: "#ddd",
										fontSize: "15px",
									}}
								>
									{user.rank_name}
								</Typography>
							</Box>
						</Box>
					</Box>

					{/* Other two boxes */}
					<Box
						sx={{
							mb: 2,
							borderRadius: "10px",
							backgroundImage: `url(${UserProfile})`,
							backgroundSize: "cover", // Make image cover the entire box
							padding: "10px",
							sflex: "1 1 30%",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							gap: "10px",
							pl: "25px",
							position: "relative", // Required for the animated effect
						}}
					>
						{/* Wave animation */}

						{/* Content */}
						<Box
							sx={{
								position: "relative",
								zIndex: 1,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "left",
								gap: "10px",
							}}
						>
							<Box
								sx={{
									display: "flex",
									gap: "10px",
									flexDirection: "row",
								}}
							>
								<Typography
									sx={{ color: "white", fontWeight: "bold" }}
								>
									First Name:{" "}
								</Typography>
								<Typography> {localUser.first_name}</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									gap: "10px",
									flexDirection: "row",
								}}
							>
								<Typography
									sx={{ color: "white", fontWeight: "bold" }}
								>
									Last Name:{" "}
								</Typography>
								<Typography> {localUser.last_name}</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									gap: "10px",
									flexDirection: "row",
								}}
							>
								<Typography
									sx={{ color: "white", fontWeight: "bold" }}
								>
									Sponsor Name:
								</Typography>
								<Typography>
									{" "}
									{localUser.sponsor_name}
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									gap: "10px",
									flexDirection: "row",
								}}
							>
								<Typography
									sx={{ color: "white", fontWeight: "bold" }}
								>
									Sponsor ID:{" "}
								</Typography>
								<Typography> {localUser.sponsor_id}</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									gap: "10px",
									flexDirection: "row",
								}}
							>
								<Typography
									sx={{ color: "white", fontWeight: "bold" }}
								>
									Subscription:
								</Typography>
								<Typography>
									{" "}
									{/* {localUser.subscription} */}
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									gap: "10px",
									flexDirection: "row",
								}}
							>
								<Typography
									sx={{ color: "white", fontWeight: "bold" }}
								>
									ID Code:
								</Typography>
								<Typography>{localUser.id_code}</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									gap: "10px",
									flexDirection: "row",
								}}
							>
								<Typography
									sx={{ color: "white", fontWeight: "bold" }}
								>
									CV:
								</Typography>
								<Typography>{localUser.cv}</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									gap: "10px",
									flexDirection: "row",
								}}
							>
								<Typography
									sx={{ color: "white", fontWeight: "bold" }}
								>
									Left Leg CV:
								</Typography>
								<Typography>{localUser.left_leg_cv}</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									gap: "10px",
									flexDirection: "row",
								}}
							>
								<Typography
									sx={{ color: "white", fontWeight: "bold" }}
								>
									Right Leg CV:
								</Typography>
								<Typography>
									{localUser.right_leg_cv}
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									gap: "10px",
									flexDirection: "row",
								}}
							>
								<Typography
									sx={{ color: "white", fontWeight: "bold" }}
								>
									Status:
								</Typography>
								<Typography>
									{localUser.account_status}
								</Typography>
							</Box>
						</Box>

						{/* Keyframes for animation */}
						<style jsx="true">{`
							@keyframes wave-animation {
								0% {
									transform: translate(-50%, -50%) scale(1);
								}
								50% {
									transform: translate(-50%, -50%) scale(1.5);
								}
								100% {
									transform: translate(-50%, -50%) scale(1);
								}
							}
						`}</style>
					</Box>
					{/* Third box */}
					<Box
						sx={{
							mb: 2,
							// backgroundColor: "white",
							borderRadius: "10px",
							padding: "10px",
							flex: "1 1 30%", // Adjust width as needed
						}}
					></Box>

					{/* end of boxes */}
				</Box>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box
						sx={{
							display: "grid",
							placeContent: "center",
							height: "100%",
							pointerEvents: "none",
						}}
					>
						<Backdrop
							sx={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
								backdropFilter: "blur(5px)", // Apply blur effect
								zIndex: 1,
							}}
							open={open}
						/>

						<Card
							sx={{
								minWidth: "min(80vw, 500px)",
								maxHeight: "min(80vh, 600px)",
								pointerEvents: "auto",
								margin: "auto",
								boxShadow: 3,
								overflowY: "scroll", // Enables vertical scrolling
								position: "relative",
								backdropFilter: "blur(10px)",
								backgroundColor: "#17111854",
								// boxShadow: "0 4px 62px rgba(255, 255, 255, 0.1)",
								color: "#000",
								borderRadius: "20px",
								zIndex: 2, // Ensures the card is above the backdrop
								// Customizing scrollbar
								"&::-webkit-scrollbar": {
									width: "8px", // Adjust width of the scrollbar
								},
								"&::-webkit-scrollbar-thumb": {
									backgroundColor: "#888", // Color of the scrollbar handle
									"&:hover": {
										backgroundColor: "#555", // Darker handle color when hovered
									},
								},
								"&::-webkit-scrollbar-track": {
									backgroundColor: "#f1f1f1", // Background color of the scrollbar track
								},
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<CardContent>
								<Typography
									sx={{
										textAlign: "center",
										color: "#fff",
										fontSize: { xs: "16px", sm: "25px" },
										fontWeight: "bold",
									}}
								>
									Edit Profile
								</Typography>
								<hr />

								<form onSubmit={handleSubmit(onSubmit)}>
									{/* First Name */}
									<Box sx={{ marginBottom: 2, mt: 4 }}>
										<TextField
											label="First Name"
											variant="outlined"
											fullWidth
											defaultValue={localUser.first_name}
											{...register("first_name")}
											sx={{
												input: {
													fontSize: "16px",
													color: "#fff",
												},
												label: { color: "#bbb" },
												backgroundColor: "#333", // Dark background for input field
												marginBottom: 2,
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "#444", // Light border color
													},
													"&:hover fieldset": {
														borderColor: "#bbb", // Light border color on hover
													},
													"&.Mui-focused fieldset": {
														borderColor: "#fff", // White border color on focus
													},
												},
											}}
										/>
									</Box>

									{/* Last Name */}
									<Box sx={{ marginBottom: 2 }}>
										<TextField
											label="Last Name"
											variant="outlined"
											fullWidth
											defaultValue={localUser.last_name}
											{...register("last_name")}
											sx={{
												input: {
													fontSize: "16px",
													color: "#fff",
												},
												label: { color: "#bbb" },
												backgroundColor: "#333", // Dark background for input field
												marginBottom: 2,
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "#444", // Light border color
													},
													"&:hover fieldset": {
														borderColor: "#bbb", // Light border color on hover
													},
													"&.Mui-focused fieldset": {
														borderColor: "#fff", // White border color on focus
													},
												},
											}}
										/>
									</Box>
									<Box sx={{ marginBottom: 2 }}>
										{/* <TextField
											label="User Name"
											variant="outlined"
											fullWidth
											defaultValue={user.username}
											{...register("username")}
											sx={{
												input: {
													fontSize: "16px",
													color: "#fff",
												},
												label: { color: "#bbb" },
												backgroundColor: "#333", // Dark background for input field
												marginBottom: 2,
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "#444", // Light border color
													},
													"&:hover fieldset": {
														borderColor: "#bbb", // Light border color on hover
													},
													"&.Mui-focused fieldset": {
														borderColor: "#fff", // White border color on focus
													},
												},
											}}
										/> */}
									</Box>

									{/* Email */}
									{/* <Box sx={{ marginBottom: 2 }}>
										<TextField
											label="Email"
											variant="outlined"
											fullWidth
											defaultValue={localUser.email}
											{...register("email")}
											sx={{
												input: {
													fontSize: "16px",
													color: "#fff",
												},
												label: { color: "#bbb" },
												backgroundColor: "#333", // Dark background for input field
												marginBottom: 2,
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "#444", // Light border color
													},
													"&:hover fieldset": {
														borderColor: "#bbb", // Light border color on hover
													},
													"&.Mui-focused fieldset": {
														borderColor: "#fff", // White border color on focus
													},
												},
											}}
										/>
									</Box> */}

									{/* Mobile */}
									<Box sx={{ marginBottom: 2 }}>
										<TextField
											label="Phone"
											variant="outlined"
											fullWidth
											defaultValue={localUser.mobile}
											{...register("mobile")}
											sx={{
												input: {
													fontSize: "16px",
													color: "#fff",
												},
												label: { color: "#bbb" },
												backgroundColor: "#333", // Dark background for input field
												marginBottom: 2,
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "#444", // Light border color
													},
													"&:hover fieldset": {
														borderColor: "#bbb", // Light border color on hover
													},
													"&.Mui-focused fieldset": {
														borderColor: "#fff", // White border color on focus
													},
												},
											}}
										/>
									</Box>

									{/* Add fields for CV values */}
									<Box
										sx={{
											marginBottom: 2,
											display: "flex",
											gap: 2,
										}}
									>
										<TextField
											label="CV"
											variant="outlined"
											fullWidth
											value={localUser.cv}
											disabled
											sx={{
												input: {
													fontSize: "16px",
													color: "#fff",
												},
												label: { color: "#bbb" },
												backgroundColor: "#333", // Dark background for input field
												marginBottom: 2,
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "#444", // Light border color
													},
													"&:hover fieldset": {
														borderColor: "#bbb", // Light border color on hover
													},
													"&.Mui-focused fieldset": {
														borderColor: "#fff", // White border color on focus
													},
												},
											}}
										/>
										<TextField
											label="Left Leg CV"
											variant="outlined"
											fullWidth
											value={localUser.left_leg_cv}
											disabled
											sx={{
												input: {
													fontSize: "16px",
													color: "#fff",
												},
												label: { color: "#bbb" },
												backgroundColor: "#333", // Dark background for input field
												marginBottom: 2,
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "#444", // Light border color
													},
													"&:hover fieldset": {
														borderColor: "#bbb", // Light border color on hover
													},
													"&.Mui-focused fieldset": {
														borderColor: "#fff", // White border color on focus
													},
												},
											}}
										/>
										<TextField
											label="Right Leg CV"
											variant="outlined"
											fullWidth
											value={localUser.right_leg_cv}
											disabled
											sx={{
												input: {
													fontSize: "16px",
													color: "#fff",
												},
												label: { color: "#bbb" },
												backgroundColor: "#333", // Dark background for input field
												marginBottom: 2,
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "#444", // Light border color
													},
													"&:hover fieldset": {
														borderColor: "#bbb", // Light border color on hover
													},
													"&.Mui-focused fieldset": {
														borderColor: "#fff", // White border color on focus
													},
												},
											}}
										/>
									</Box>

									{/* User Status */}
									<Box sx={{ marginBottom: 2 }}>
										<TextField
											label="Account Status"
											variant="outlined"
											fullWidth
											value={localUser.account_status}
											disabled
											sx={{
												input: {
													fontSize: "16px",
													color: "#fff",
												},
												label: { color: "#bbb" },
												backgroundColor: "#333", // Dark background for input field
												marginBottom: 2,
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "#444", // Light border color
													},
													"&:hover fieldset": {
														borderColor: "#bbb", // Light border color on hover
													},
													"&.Mui-focused fieldset": {
														borderColor: "#fff", // White border color on focus
													},
												},
											}}
										/>
									</Box>

									{/* Submit Button */}
									<CardActions
										sx={{
											display: "flex",
											justifyContent: "right",
										}}
									>
										<Button
											variant="contained"
											color="primary"
											fullWidth
											type="submit"
											disabled={loading}
											sx={{
												padding: "10px",
												fontSize: "16px",
												width: "20%",
												height: "30px",
												background:
													"linear-gradient(45deg, #6fbfe4, #d459a1)", // Gradient with two colors
												color: "#fff", // White text color
												"&:hover": {
													background:
														"linear-gradient(45deg, #d459a1, #6fbfe4)", // Reverse the gradient on hover
												},
											}}
										>
											{loading ? (
												<CircularProgress size={24} />
											) : (
												"Update"
											)}
										</Button>
									</CardActions>
								</form>
							</CardContent>

							{/* <hr /> */}

							{/* <CardContent>
              <EditEmail user={user} />
            </CardContent> */}
						</Card>
					</Box>
				</Modal>

				<DeleteModal
					open={deleteModal}
					handleClose={() => setDeleteModal(false)}
				/>
			</Box>
		);
	else return <div>Loading...</div>;
}

function DeleteModal({ open, handleClose }) {
	// config
	const navigate = useNavigate();
	const api = useApi();
	let { logout } = useContext(Context);

	// data
	const [loading, setLoading] = useState(false);

	// methods
	const handleDelete = async () => {
		try {
			setLoading(true);
			const req = await api.post("/edit/profile");
			handleClose();

			toast.success(req.data.message);
			handleLogout();
		} catch (err) {
			console.error(err);
			toast.error(err.response?.data?.message || err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		logout();
		navigate("/login");
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box
				sx={{
					display: "grid",
					placeContent: "center",
					height: "100%",
					pointerEvents: "none",
				}}
			>
				<Card
					sx={{ minWidth: "500px", pointerEvents: "auto" }}
					onClick={(e) => e.stopPropagation()}
				>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Are you sure you want delete this profile?
						</Typography>
					</CardContent>

					<CardActions>
						<Box sx={{ m: "0 20px 0 auto" }}>
							<Button
								variant="contained"
								color="error"
								onClick={handleDelete}
								disabled={loading}
								loading={loading.toString()}
								sx={{ mx: 3 }}
							>
								Yes
							</Button>
							<Button onClick={handleClose}>No</Button>
						</Box>
					</CardActions>
				</Card>
			</Box>
		</Modal>
	);
}

function EditEmail({ user }) {
	const api = useApi();
	const { register, handleSubmit } = useForm();

	const [loading, setLoading] = useState(false);

	// methods
	const submit = async (payload) => {
		try {
			setLoading(true);
			const res = await api.post("/user/password/email", payload);

			const data = res.data.status;

			toast.success(data);
		} catch (error) {
			console.error(error);

			const errors = error.response?.data?.message;

			if ("string" == typeof errors) return toast.error(errors);
			if (errors)
				Object.values(errors)
					.flat()
					.forEach((err) => toast.error(err));
			else toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit(submit)} className={css.form}>
			{/* <h3> Edit your email</h3> */}
			{/* <div className={css.coolinput}>
        <label htmlFor="input1">
          old Email :
        </label>
        <input
          id="input1"
          readOnly
          defaultValue={user.email}
          className={css.input}
          {...register("email")}
        />
      </div> */}

			<CardActions>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					loading={loading.toString()}
					disabled={loading}
					type="submit"
				>
					Send the request to edit it
				</Button>
			</CardActions>
		</form>
	);
}
