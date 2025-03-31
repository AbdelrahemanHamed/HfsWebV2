import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const NextRankCriteria = ({ }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const userArray = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    console.log("User token", token);
    useEffect(() => {
        const fetchCriteriaForNextRank = async () => {
            if (!token) {
                setError("No token available for sponsor data");
                return;
            }

            try {
                const response = await axios.get(
                    "https://production.hfssociety.com/api/v1/next/rank",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.data?.status && response.data?.result) {
                    setData(response.data.result);
                } else {
                    setError("Invalid response structure");
                }
            } catch (err) {
                console.error(
                    "Error fetching sponsor data:",
                    err.response ? err.response.data : err.message
                );
                setError("Error fetching sponsor data");
            }
        };

        fetchCriteriaForNextRank();
    }, [token]);

    return (
        <Box
            sx={{
                mb: "50px",
                height: "auto",
                border: ".5px solid rgb(16, 47, 71)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: "30px",
                borderRadius: "15px",
            }}
        >
            <Box
                sx={{
                    width: "90%",
                    height: "90%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        textAlign: "center",
                    }}
                >
                    Criteria for Next Rank
                </Typography>

                {error ? (
                    <Typography sx={{ fontSize: "15px", color: "red", mt: 2 }}>
                        {error}
                    </Typography>
                ) : data ? (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: "20px",
                            }}
                        >
                            <Typography sx={{ fontSize: "15px", fontWeight: "700" }}>
                                1. Next Rank: {data.next_rank}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: "20px",
                            }}
                        >
                            <Typography sx={{ fontSize: "15px", fontWeight: "700" }}>
                                2. Left Downline RV : <br/> {data.left_current} / {data.left_required} 
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: "20px",
                            }}
                        >
                            <Typography sx={{ fontSize: "14px", fontWeight: "700" }}>
                                3. Right Downline RV : <br/> {data.right_current} / {data.right_required}
                            </Typography>
                        </Box>

                        <Typography sx={{ mt: "20px", fontWeight: "700" }}>
                            4. Total Direct Referrals: <br/> {data.current_direct} / {data.direct_required}
                        </Typography>
                    </>
                ) : (
                    <Typography sx={{ fontSize: "15px", mt: 2 }}>Loading...</Typography>
                )}
            </Box>
        </Box>
    );
};

export default NextRankCriteria;
