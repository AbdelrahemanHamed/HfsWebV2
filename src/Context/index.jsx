import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const Context = createContext(null);

export function useAppContext() {
	const context = useContext(Context);
	if (!context) {
		throw new Error("useAppContext must be used within a ContextProvider");
	}
	return context;
}

export function ContextProvider({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [sponsorName, setSponsorName] = useState(null);
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);
	const [user, setUser] = useState(() => {
		try {
			const savedUser = localStorage.getItem("user");
			return savedUser ? JSON.parse(savedUser) : null;
		} catch (error) {
			console.error("Error parsing user from localStorage:", error);
			return null;
		}
	});

	const [token, setToken] = useState(() => {
		return localStorage.getItem("token") || null;
	});

	const baseUrl = import.meta.env.VITE_API_URL;

	const logout = async () => {
		try {
			await axios.post(
				`${import.meta.env.VITE_API_URL}/logout`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

			// Clear user-related data
			setUser(null);
			setToken(null);
			setIsEmailVerified(false);
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			localStorage.removeItem("isEmailVerified");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const getSubscription = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/user/subscription`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

			// Handle the response data here
			console.log("Subscription data:", response.data);
		} catch (error) {
			console.error("Error fetching subscription:", error);
		}
	};
	const getCommission = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/user/commission`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

			// Handle the response data here
			console.log("commission data:", response.data);
		} catch (error) {
			console.error("Error fetching commission:", error);
		}
	};

	// Check verification status on mount
	useEffect(() => {
		const verificationStatus = localStorage.getItem("isEmailVerified");
		setIsEmailVerified(verificationStatus === "true");
	}, []);

	// Handle window resize for sidebar
	useEffect(() => {
		function handleResize() {
			setSidebarOpen(window.innerWidth > 600);
		}

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Sync user to localStorage
	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	// Sync token to localStorage
	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
		}
	}, [token]);

	const contextValue = {
		sidebarOpen,
		setSidebarOpen,
		sponsorName,
		setSponsorName,
		baseUrl,
		user,
		setUser,
		token,
        setToken,
        getCommission,
		logout,
		isEmailVerified,
		setIsEmailVerified,
		isVerifying,
		setIsVerifying,
		getSubscription,
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

ContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
