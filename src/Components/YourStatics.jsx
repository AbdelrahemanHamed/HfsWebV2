


import { Box, IconButton, Typography } from "@mui/material";
import SalesGraph from "./dashboaedstatics/salesGraph";
import MonthelyTarget from "../Components/dashboardComponents/MonthelyTarget/MonthelyTarget"

export default function YourStatics() {
    return (
        <Box
            sx={{
                // Responsive styles for mobile view
                "@media (max-width: 600px)": {
                    flexDirection: "column", // Stack items vertically
                    // gap: "10px", // Adjust gap if needed
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    gap: "20px",
                },
            }}
        >
            <Typography
                sx={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    textAlign: {
                        xs: "center",
                        md: "left",
                    },
                    pl: "20px",
                    pt: "-40px",
                }}
            >
                Your Statics
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: "20px",
                    width: "100%",
                    mb: "200px",
                    "@media (max-width: 600px)": {
                        flexDirection: "column", // Stack items vertically
                        // gap: "10px", // Adjust gap if needed
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        gap: "20px",
                        "@media (max-width: 600px)": {
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px",
                        },
                    },
                }}
            >
                {/* left side 2nd section */}
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            md: "65%",
                        },
                    }}
                >
                    <SalesGraph />
                </Box>
                {/* right side 2nd section */}
                <Box
                    sx={{
                        width: {
                            xs: "80%",
                            md: "30%",
                        },
                        "@media (max-width: 600px)": {
                            height: "400px",
                        },
                    }}
                >
                    <MonthelyTarget />
                </Box>
            </Box>
        </Box>
    )
}