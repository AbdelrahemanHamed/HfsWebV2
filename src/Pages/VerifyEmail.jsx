import { useState, useContext } from "react";
import { Context } from "@/Context";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

// assets
import logo from "@/assets/images/HFSLOGO.png";

// components
import {
	Box,
	Button,
	TextField,
	Typography,
	CircularProgress,
} from "@mui/material";

function VerifyEmail() {
	const { baseUrl } = useContext(Context);
	const { setIsEmailVerified } = useVerifyContext();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			verification_code: "",
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("verification_code", data.verification_code);
			formData.append(
				"email",
				sessionStorage.getItem("pendingVerification")
			);

			const res = await axios.post(
				`${baseUrl}/verify-email`,
				formData,
				{}
			);

			if (res.data.status) {
				// Save token after successful verification
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("isEmailVerified", "true");
				setIsEmailVerified(true);
				// Clear the pending verification
				sessionStorage.removeItem("pendingVerification");
				toast.success("Email verified successfully!");
				navigate("/dashboard");
			}
		} catch (err) {
			toast.error(
				err?.response?.data?.message || "Error verifying email"
			);
		} finally {
			setIsLoading(false);
		}
	};

	// const resendVerificationCode = async () => {
	// 	setIsLoading(true);
	// 	try {
	// 		const res = await axios.post(`${baseUrl}/verify-email`);

	// 		if (res.data.status) {
	// 			toast.success("Verification code resent to your email!");
	// 		}
	// 	} catch (err) {
	// 		toast.error(
	// 			err?.response?.data?.message ||
	// 				"Error resending verification code"
	// 		);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

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
					Verify Email
				</Typography>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
						}}
					>
						<TextField
							fullWidth
							label="Verification Code"
							{...register("verification_code", {
								required: "Verification code is required",
								pattern: {
									value: /^\d{6}$/,
									message:
										"Verification code must be 6 digits",
								},
							})}
							error={!!errors.verification_code}
							helperText={errors.verification_code?.message}
							placeholder="Enter 6-digit code"
						/>

						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								mt: 3,
							}}
						>
							<Button
								variant="text"
								color="primary"
								// onClick={resendVerificationCode}
								disabled={isLoading}
							>
								Resend Code
							</Button>

							<Box sx={{ display: "flex", gap: 2 }}>
								<Link to="/login">
									<Button variant="outlined" color="primary">
										Back to Login
									</Button>
								</Link>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									disabled={isLoading}
								>
									{isLoading ? (
										<CircularProgress
											size={24}
											color="inherit"
										/>
									) : (
										"Verify Email"
									)}
								</Button>
							</Box>
						</Box>
					</Box>
				</form>

				<Box sx={{ mt: 3, textAlign: "center" }}>
					<Typography variant="body2" color="textSecondary">
						Didn`&quot;`t receive the verification code?
					</Typography>
					<Typography variant="body2" color="textSecondary">
						Check your spam folder or click `&quot;`Resend
						Code`&quot;`
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}

export default VerifyEmail;
