import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "@/Pages/ProtectedRoute/ProtectedRoute";

// Components || Pages
import Register from "@/Pages/Register";
import NewLogin from "@/Pages/Newlogin"; // Import NewLogin component
import Login from "@/Pages/Login";
import Layout from "@/Pages/Layout";
import Home from "@/Pages/Home";
import Dashboard from "@/Pages/Dashboard";
import Membership from "@/Pages/Membership";
import MembershipTier from "@/Pages/MembershipTier";
import Network from "@/Pages/Network";
import AllTransactions from "@/Pages/AllTransaction";
import Test from "@/Pages/Test";
import Tank from "@/Pages/Tank";
import Referral from "@/Pages/Referral";
import Profile from "@/Pages/Profile";
import SupportPage from "@/Pages/Support/SupportPage";
import AddNewticket from "@/Pages/Support/AddNewticket";
import Bounces from "@/Pages/Bounces/index";
import RankReward from "@/Pages/RankReward/RankReward";
import VerifyEmail from "../Pages/VerifyEmail";
import ForgetPassword from "../Pages/ForgetPassword";
import ResetPassword from "../Pages/ResetPassword";
import WalletCard from "../Pages/WalletCard/WalletCard";
// routes
const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		children: [
			{ path: "/dashboard", element: <Dashboard /> },
			{ path: "/Membership", element: <Membership /> },
			// { path: "/Membership", element: <MembershipTier /> },
			{ path: "/network", element: <Network /> },
			{ path: "/Transactions", element: <AllTransactions /> },
			{ path: "/wallet", element: <WalletCard /> },
			{ path: "/tank", element: <Tank /> },
			{ path: "/profile", element: <Profile /> },
			{ path: "/SupportPage", element: <SupportPage /> },
			{ path: "/AddNewticket", element: <AddNewticket /> },
			{ path: "/Bounces", element: <Bounces /> },
			{ path: "/RankReward", element: <RankReward /> },
		],
	},
	// Public routes
	{ path: "/register", element: <Register /> },
	{ path: "/newlogin", element: <NewLogin /> },
	{ path: "/login", element: <Login /> },
	{ path: "/verify-email", element: <VerifyEmail /> },
	{ path: "/forget-password", element: <ForgetPassword /> },
	{ path: "/reset-password", element: <ResetPassword /> },
	{
		path: "/referral",
		element: (
			<ProtectedRoute>
				<Referral />
			</ProtectedRoute>
		),
	},
	{ path: "/test", element: <Test /> },
]);
const Router = () => <RouterProvider router={router} />;

export default Router;
