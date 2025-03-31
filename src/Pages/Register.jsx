import {  useContext, useState } from "react";

import toast from "react-hot-toast";
import { Context } from "@/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// assets
import logo from "@/assets/images/HFSLOGO.png";

// components
import {
	Box,
	Button,
	Avatar,
	TextField,
	Typography,
	Stepper,
	Step,
	StepLabel,
	IconButton,
	InputAdornment,
	Checkbox,
	FormControlLabel,
	Icon,
} from "@mui/material";



import {
	Visibility,
	VisibilityOff,
	BookmarkRemoveSharp,
} from "@mui/icons-material";

const Register = () => {
	// config
	const navigate = useNavigate();

	// data
	const steps = [
		"Sponsor ID",
		"Confirm Sponsor ID",
		"Account Details",
		// "Personal Information",
		"Review",
	];
	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		// username: "",
		email: "",
		mobile: "",
		password: "",
		password_confirmation: "",
		sponsor_id: "",
		// photo: null,
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [isAgreementChecked, setIsAgreementChecked] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errors, setErrors] = useState({ sponsorId: "", password: "" });
	const [sponsorName, setSponsorName] = useState("");
	const { baseUrl } = useContext(Context);

	// methods
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));

		if (name === "sponsor_id") {
			setErrors((prev) => ({ ...prev, sponsorId: "" }));
		}
	};

	const getSponsor = async () => {
        try {
            console.log("Checking sponsor ID:", formData.sponsor_id.trim()); // Debug log
			const res = await axios.get(`${baseUrl}/sponsor/${formData.sponsor_id}/data`, {
				sponsor_id: formData.sponsor_id.trim(), // Trim any whitespace
			});

			console.log("Sponsor check response:", res.data); // Debug log
			console.log("Sponsor Data:", res.data.result.user); // Debug log

			if (res.data.status) {
				setSponsorName(res.data.result.user.full_name || "Unknown");
				return true;
			} else {
				toast.error("Invalid sponsor ID");
				return false;
			}
		} catch (err) {
			console.error("Sponsor check error:", err.response?.data);
			toast.error(
				err?.response?.data?.message?.sponsor_id?.[0] ||
					"Invalid sponsor ID"
			);
			return false;
		}
	};

	const handleNext = async (e) => {
		e.preventDefault();
		setErrors({ sponsorId: "", password: "" });

		switch (activeStep) {
			case 0:
				const isValid = await getSponsor();
				if (isValid) setActiveStep((prevStep) => prevStep + 1);
				else
					setErrors((prev) => ({
						...prev,
						sponsorId: "Invalid Sponsor ID",
					}));
				break;

			case 1:
				if (isConfirmed) setActiveStep((prevStep) => prevStep + 1);
				else
					setErrors((prev) => ({
						...prev,
						sponsorId:
							"You must confirm the Sponsor ID to proceed.",
					}));
				break;

			case 2:
				if (formData.password !== formData.password_confirmation)
					return setErrors((prev) => ({
						...prev,
						password: "Passwords do not match.",
					}));

				if (!(formData.name || formData.email))
					return setErrors((prev) => ({
						...prev,
						first_name: formData.first_name
							? ""
							: "Name is required.",
						email: formData.email ? "" : "Email is required.",
					}));
				setActiveStep((prevStep) => prevStep + 1);
				break;

			case steps.length - 1:
				handleSubmit();
				break;
			default:
				setActiveStep((prevStep) => prevStep + 1);
		}
	};

	const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

	const handleSubmit = async () => {
		try {
			const submitData = {
				first_name: formData.first_name,
				last_name: formData.last_name,
				email: formData.email,
				mobile: formData.mobile,
				password: formData.password,
				password_confirmation: formData.password_confirmation,
				sponsor_id: formData.sponsor_id.trim(),
				username: formData.username,
			};

			console.log("Submitting data:", submitData); // Debug log

			const formDataToSend = new FormData();
			Object.entries(submitData).forEach(([key, value]) => {
				if (value) formDataToSend.append(key, value);
			});

			if (formData.image) {
				formDataToSend.append("image", formData.image);
			}

			const res = await axios.post(
				`${baseUrl}/register`,
				formDataToSend,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log("Registration response:", res.data.result.errors); // Debug log

			if (res.data.status) {
				toast.success("Registration successful!");
				navigate("/login");
			}
		} catch (err) {
			console.error("Registration error:", err.response?.data);
			console.error("Registration error deep:", err.response?.data.result.errors);
			toast.error(
				err?.response?.data?.message ||
					"Registration failed. Please try again."
			);
		}
	};

	if (isSubmitted)
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					backgroundColor: "#161117",
					padding: 10,
				}}
			>
				<Typography variant="h4" align="center">
					Thank You for Registering!
				</Typography>
				<Typography align="center">
					Your registration has been successfully submitted. We will
					get back to you shortly.
				</Typography>
			</Box>
		);

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
					maxWidth: 900,
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
						fontSize: { xs: "40px", sm: "60px", md: "75px" },
						fontWeight: "bold",
						textAlign: "center",
						color: "#333",
						pb: 3,
					}}
				>
					REGISTER
				</Typography>
				<Stepper
					activeStep={activeStep}
					sx={{
						width: "100%",
						flexDirection: { xs: "column", sm: "row" },
						alignItems: "center",
						mb: "20px",
					}}
				>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel
								sx={{
									"& .MuiStepLabel-label": {
										fontFamily: "Tanseek Modern Pro Arabic",
										fontSize: { xs: "14px", sm: "20px" },
										fontWeight: "lighter",
										color: "#51d5f5",
										textAlign: { xs: "center", sm: "left" },
									},
								}}
							>
								{label}
							</StepLabel>
						</Step>
					))}
				</Stepper>

				<form onSubmit={handleNext}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
						}}
					>
						{activeStep === 0 && (
							<Step0
								errors={errors}
								handleChange={handleChange}
							/>
						)}

						{activeStep === 1 && (
							<Step1
								formData={formData}
								sponsorName={sponsorName}
								isConfirmed={isConfirmed}
								setIsConfirmed={setIsConfirmed}
								errors={errors}
							/>
						)}

						{activeStep === 2 && (
							<Step2
								handleChange={handleChange}
								showPassword={showPassword}
								errors={errors}
								setShowPassword={setShowPassword}
								showConfirmPassword={showConfirmPassword}
							/>
						)}

				

						{activeStep === steps.length - 1 && (
							<Review
								formData={formData}
								sponsorName={sponsorName}
								isAgreementChecked={isAgreementChecked}
								setIsAgreementChecked={setIsAgreementChecked}
							/>
						)}

						{/* form controller */}
						<FormController
							handleBack={handleBack}
							activeStep={activeStep}
							steps={steps}
							isAgreementChecked={isAgreementChecked}
						/>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

function Step0({ errors, handleChange }) {
	return (
		<TextField
			fullWidth
			label="Sponsor ID"
			name="sponsor_id"
			onChange={handleChange}
			error={!!errors.sponsorId}
			helperText={errors.sponsorId}
			required
		/>
	);
}

function Step1({ formData, sponsorName, isConfirmed, setIsConfirmed, errors }) {
	return (
		<>
			<Typography
				variant="h6"
				textAlign={"center"}
				sx={{ color: "#000", fontSize: { xs: "16px", sm: "18px" } }}
			>
				Confirm Sponsor ID
			</Typography>
			<Typography
				variant="body1"
				textAlign={"center"}
				sx={{ color: "#000", fontSize: { xs: "14px", sm: "16px" } }}
			>
				Are you sure you want to join under the Sponsor ID:{" "}
				{formData.sponsor_id}?
			</Typography>
			<Typography sx={{ color: "#000" }}>
				<strong>Sponsor: {sponsorName}</strong>
			</Typography>
			<FormControlLabel
				sx={{
					color: "#000",
					fontSize: { xs: "14px", sm: "16px" },
				}}
				control={
					<Checkbox
						checked={isConfirmed}
						onChange={(e) => setIsConfirmed(e.target.checked)}
					/>
				}
				label="Yes, I confirm this sponsor ID."
			/>
			{errors.sponsorId && (
				<Typography
					color="error"
					sx={{ fontSize: { xs: "12px", sm: "14px" } }}
				>
					{errors.sponsorId}
				</Typography>
			)}
		</>
	);
}

function Step2({
	handleChange,
	showPassword,
	errors,
	setShowPassword,
	showConfirmPassword,
}) {
	return (
		<>
			<TextField
				fullWidth
				label="First Name"
				name="first_name"
				onChange={handleChange}
				required
			/>
			<TextField
				fullWidth
				label="Last Name"
				name="last_name"
				onChange={handleChange}
				required
			/>
			{/* <TextField
				fullWidth
				label="User Name"
				name="username"
				onChange={handleChange}
				required
			/> */}
			<TextField
				fullWidth
				label="Phone Number"
				name="mobile"
				onChange={handleChange}
				required
			/>
			<TextField
				fullWidth
				label="Email"
				name="email"
				onChange={handleChange}
				required
			/>
			<TextField
				fullWidth
				label="Password"
				name="password"
				type={showPassword ? "text" : "password"}
				onChange={handleChange}
				required
				error={!!errors.password}
				helperText={
					errors.password === "Passwords do not match."
						? ""
						: errors.password
				}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={() => setShowPassword(!showPassword)}
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
			<TextField
				fullWidth
				label="Confirm Password"
				name="password_confirmation"
				type={showConfirmPassword ? "text" : "password"}
				onChange={handleChange}
				required
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={() =>
									setShowConfirmPassword(!showConfirmPassword)
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
			{errors.password && (
				<Typography
					color="error"
					sx={{ fontSize: { xs: "12px", sm: "14px" } }}
				>
					{errors.password}
				</Typography>
			)}
		</>
	);
}

function Review({
	formData,
	sponsorName,
	isAgreementChecked,
	setIsAgreementChecked,
}) {
	return (
		<Box color="#333">
			<Typography variant="h4" textAlign="center">
				Review and Confirm
			</Typography>
			<Typography>
				<strong>Fist Name:</strong> {formData.first_name}
			</Typography>
			<Typography>
				<strong>Last Name:</strong> {formData.last_name}
			</Typography>
			<Typography>
				<strong>User Name:</strong> {formData.username}
			</Typography>
			<Typography>
				<strong>Phone Number:</strong> {formData.mobile}
			</Typography>
			<Typography>
				<strong>Email:</strong> {formData.email}
			</Typography>
			<Typography>
				<strong>Sponsor ID:</strong> {formData.sponsor_id} (
				{sponsorName})
			</Typography>
			<FormControlLabel
				control={
					<Checkbox
						checked={isAgreementChecked}
						onChange={(e) =>
							setIsAgreementChecked(e.target.checked)
						}
					/>
				}
				label="I agree to the terms and conditions"
			/>
			{!isAgreementChecked && (
				<Typography color="error">
					You must agree to the terms to proceed.
				</Typography>
			)}
		</Box>
	);
}

function FormController({ handleBack, activeStep, steps, isAgreementChecked }) {
	return (
		<Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
			<Button
				onClick={handleBack}
				disabled={activeStep === 0}
				variant="outlined"
				color="primary"
			>
				Back
			</Button>
			<Link to="/login" variant="outlined" color="primary">
				Back to Login
			</Link>
			<Button
				type="submit"
				disabled={
					activeStep === steps.length - 1 && !isAgreementChecked
				}
				variant="contained"
				color="primary"
			>
				{activeStep === steps.length - 1 ? "Submit" : "Next"}
			</Button>
		</Box>
	);
}
export default Register;
