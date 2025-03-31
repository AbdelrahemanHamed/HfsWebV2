import { useState, useContext } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	IconButton,
	InputAdornment,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "@/Context";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
	// State for form inputs
	const [account, setAccount] = useState("");
	const [password, setPassword] = useState("");
	const [remember_me, setRemember] = useState(false); // Initialize as boolean
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const navigate = useNavigate();
	const { baseUrl, setUser, setToken } = useContext(Context);

	// Toggle password visibility
	const handleClickShowPassword = () => setShowPassword(!showPassword);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
	
		const requestBody = {
			account,
			password,
			remember_me: remember_me.toString(),
		};
	
		try {
			const response = await axios.post(`${baseUrl}/login`, requestBody, {
				headers: { "Content-Type": "application/json" },
			});
	
			console.log("Login response:", response.data);
	
			if (!response.data?.result?.user) {
				throw new Error("User data is missing from API response.");
			}
	
			const user = response.data.result.user;
			const token = response.data.result.token;
	
			// Ensure all properties exist before storing them
			const userData = {
				id: user?.id || null,
				full_name: user?.full_name || "",
				email: user?.email || "",
				id_code: user?.id_code || "",
				sponsor: user?.sponsor?.id_code || "null",
				rank: user?.rank?.name || "",
				rankImg: user?.rank?.image || "",
				subscription: user?.subscription?.name || "",
				subscriptionDate: user?.subscription?.expired_at || "",
				remainingDays: user?.subscription?.remaining_days || 0,
				total_downline: user?.total_downline || 0,
			};
	
			// Store in localStorage safely
			localStorage.setItem("user", JSON.stringify(userData));
			localStorage.setItem("token", token); // Store token separately
			
			console.log("User data stored in localStorage:", userData);
	
			// Update React Context
			setToken(token);
			setUser(userData);
	
			toast.success(response.data.message || "Login successful!");
	
			// ✅ Ensure storage completes before navigation
			setTimeout(() => navigate("/Dashboard"), 200);
		} catch (error) {
			console.error("Login error:", error.response?.data);
			toast.error(error.response?.data?.message || "Login failed");
		} finally {
			setIsSubmitting(false);
		}
	};
	
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				backgroundColor: "#161117",
				backgroundImage: `url("https://media.giphy.com/media/sWFYgYFjHGugleQdO7/giphy.gif")`,
				backgroundSize: "contain",
				backgroundPosition: "center",
				backgroundRepeat: "repeat",
			}}
		>
			<Typography
				variant="h4"
				sx={{
					fontSize: "3rem",
					color: "#fff",
					mb: 3,
					fontWeight: "bold",
					textShadow: "0px 5px 40px rgba(255, 255, 255, 1)",
				}}
			>
				Login
			</Typography>
			<Box
				sx={{
					maxWidth: 600,
					width: "100%",
					height: 400,
					borderRadius: "8px",
					backgroundImage:
						"linear-gradient(135deg,rgb(94, 44, 82,.3),rgb(220, 75, 154,.3) )",
					backdropFilter: "blur(2px)",
					boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.5)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<form
					onSubmit={handleSubmit}
					style={{
						width: "90%",
						display: "flex",
						flexDirection: "column",
						gap: 20,
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							width: "100%",
						}}
					>
						{/* Email Input */}
						<TextField
							fullWidth
							label="Email"
							value={account}
							onChange={(e) => setAccount(e.target.value)}
							required
							InputProps={{
								style: { color: "white" },
							}}
							InputLabelProps={{
								style: { color: "white" },
							}}
							placeholder="Enter your email"
							sx={{
								"& .MuiInputBase-input::placeholder": {
									color: "white",
								},
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderColor: "gray",
										borderWidth: "1px",
									},
									"&:hover fieldset": {
										borderColor: "white",
									},
									"&.Mui-focused fieldset": {
										borderColor: "white",
									},
								},
							}}
						/>

						{/* Password Input */}
						<TextField
							fullWidth
							label="Password"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							InputProps={{
								style: { color: "white" },
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											sx={{ color: "white" }}
											onClick={handleClickShowPassword}
											edge="end"
										>
											{showPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
							InputLabelProps={{
								style: { color: "white" },
							}}
							placeholder="Enter your password"
							sx={{
								"& .MuiInputBase-input::placeholder": {
									color: "white",
								},
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderColor: "gray",
										borderWidth: "1px",
									},
									"&:hover fieldset": {
										borderColor: "white",
									},
									"&.Mui-focused fieldset": {
										borderColor: "white",
									},
								},
							}}
						/>

						{/* Remember Me Checkbox */}
						<FormControlLabel
							control={
								<Checkbox
									checked={remember_me}
									onChange={(e) =>
										setRemember(e.target.checked)
									}
									sx={{ color: "white" }}
								/>
							}
							label="Remember me"
							sx={{ color: "white" }}
						/>

						{/* Links for Register and Reset Password */}
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Typography
								variant="body2"
								sx={{ color: "#fff", fontSize: "12px" }}
							>
								Don't have an account?{" "}
								<Link
									to="/register"
									style={{ color: "#fff", cursor: "pointer" }}
								>
									Register Here
								</Link>
							</Typography>
							<Typography
								variant="body2"
								sx={{ color: "#fff", fontSize: "12px" }}
							>
								<Link
									to="/reset-password"
									style={{ color: "#fff", cursor: "pointer" }}
								>
									Reset Password
								</Link>
							</Typography>
						</Box>
					</Box>

					{/* Submit Button */}
					<Button
						type="submit"
						variant="contained"
						fullWidth
						sx={{
							mt: 3,
							backgroundColor: "#fff",
							color: "#000",
							fontSize: "15px",
							fontWeight: "bold",
							transition: "all 0.3s ease-in-out",
							"&:hover": {
								backgroundColor: "#000",
								color: "#fff",
								transform: "scale(1.05)",
								boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
							},
						}}
						disabled={isSubmitting}
					>
						{isSubmitting ? "Logging in..." : "Login"}
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default Login;
