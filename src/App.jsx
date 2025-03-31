import { useState, useEffect } from "react";
import { ContextProvider } from "@/Context";

// Components
import { Toaster } from "react-hot-toast";

// router
import Router from "./router";

function App() {
	// State for loading screen
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate a loading delay
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000); // Adjust time as needed

		return () => clearTimeout(timer);
	}, []);

	// if (isLoading) return <Loader />;
	return (
		<ContextProvider>
			<Router />
			<Toaster />
		</ContextProvider>
	);
}

export default App;
