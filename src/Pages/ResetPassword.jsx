import React, { useState, useContext } from "react";
import { Context } from "@/Context";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import logo from "@/assets/images/HFSLOGO.png";

import {
	Box,
	Button,
	TextField,
	Typography,
	IconButton,
	InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ResetPassword() {
	const { baseUrl, token } = useContext(Context); // Get token from context
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
        defaultValues: {
            email: "", 
			code: "", 
			password: "", 
			password_confirmation: "",
		},
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const onSubmit = async (data) => {
		try {
			// Prepare the request payload
            const payload = {
                email: data.email, 
				code: data.code, 
				password: data.password, // Include the new password
				password_confirmation: data.password_confirmation, // Include the password confirmation
			};
console.log("Request payload:", payload); // Debug log
			// Make the API call with the token in the headers
			const res = await axios.post(`${baseUrl}/reset-password`, payload, {
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the headers
					"Content-Type": "application/json",
				},
			});

			if (res.data.status) {
				toast.success("Password reset successfully!");
				setIsSubmitted(true);
				navigate("/login");
			}
		} catch (err) {
			toast.error(
				err?.response?.data?.message || "Error resetting password"
			);
		}
	};

	if (isSubmitted) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					backgroundColor: "#161117",
					padding: 2,
					color: "#fff",
					textAlign: "center",
				}}
			>
				<Typography variant="h4" gutterBottom>
					Password Reset Successful!
				</Typography>
				<Typography>
					Your password has been reset successfully. You can now login
					with your new password.
				</Typography>
				<Link
					to="/login"
					style={{ marginTop: "20px", color: "#51d5f5" }}
				>
					Go to Login
				</Link>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				backgroundColor: "#161117",
				padding: 2,
			}}
		>
			<img src={logo} alt="HFS" height={100} />
			<Box
				sx={{
					maxWidth: 500,
					width: "100%",
					mx: "auto",
					mt: 5,
					p: 3,
					borderRadius: "18px",
					backgroundColor: "#fff",
					boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.5)",
				}}
			>
				<Typography
					sx={{
						fontFamily: "Tanseek Modern Pro Arabic",
						fontSize: { xs: "40px", sm: "60px" },
						fontWeight: "bold",
						textAlign: "center",
						color: "#333",
						pb: 3,
					}}
				>
					Reset Password
				</Typography>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
						}}
					>
						{/* Reset Code Field */}

						{/* New Password Field */}
						<TextField
							fullWidth
							label="Email"
							type="text"
							{...register("email", {
								required: "email is required",
							})}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
						<TextField
							fullWidth
							label="New Password"
							type={showPassword ? "text" : "password"}
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message:
										"Password must be at least 6 characters",
								},
							})}
							error={!!errors.password}
							helperText={errors.password?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() =>
												setShowPassword(!showPassword)
											}
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
						/>

						{/* Confirm Password Field */}
						<TextField
							fullWidth
							label="Confirm Password"
							type={showConfirmPassword ? "text" : "password"}
							{...register("password_confirmation", {
								required: "Please confirm your password",
								validate: (val) => {
									if (watch("password") != val) {
										return "Passwords do not match";
									}
								},
							})}
							error={!!errors.password_confirmation}
							helperText={errors.password_confirmation?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() =>
												setShowConfirmPassword(
													!showConfirmPassword
												)
											}
										>
											{showConfirmPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<TextField
							fullWidth
							label="Reset Code"
							type="text"
							{...register("code", {
								required: "Reset code is required",
							})}
							error={!!errors.code}
							helperText={errors.code?.message}
						/>
						{/* Buttons */}
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								mt: 3,
							}}
						>
							<Link to="/login">
								<Button variant="text" color="primary">
									Back to Login
								</Button>
							</Link>
							<Button
								type="submit"
								variant="contained"
								color="primary"
							>
								Reset Password
							</Button>
						</Box>
					</Box>
				</form>
			</Box>
		</Box>
	);
}

export default ResetPassword;
