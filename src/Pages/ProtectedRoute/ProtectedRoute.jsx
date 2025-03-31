import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "@/Context";
import PropTypes from "prop-types";

export function ProtectedRoute({ children }) {
	const { token } = useContext(Context);

	if (!token) {
		return <Navigate to="/login" />;
	}

	return children;
}

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
