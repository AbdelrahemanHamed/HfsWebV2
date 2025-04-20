import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../Context";

export default function DownlineDetailsT() {
    const [rows, setRows] = useState([]);

const {token}=useContext(Context)
    const getMemberDownLine = async () => {
        try {
            const res = await axios.get("https://production.hfssociety.com/api/v1/downlines/rank/details", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = res.data?.result || {};

            const formattedData = Object.entries(data).map(([rank, value]) => ({
                rank: rank.replace(/_/g, " ").toUpperCase(),
                left: value.left,
                right: value.right
            }));

            const orderedRanks = [
                "EXECUTIVE",
                "JADE",
                "PEARL",
                "SAPPHIRE",
                "RUBY",
                "EMERALD",
                "DIAMOND",
                "BLUE DIAMOND",
                "BLACK DIAMOND",
                "CROWN",
                "PRESIDENTIAL CROWN"
            ];

            const sortedRows = orderedRanks.map(rank => formattedData.find(item => item.rank === rank) || { rank, left: 0, right: 0 });

            setRows(sortedRows);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        getMemberDownLine();
    }, []);

    return (
        <Box sx={{ width: "auto", height: "100%", borderRadius: "15px" }}>
            <Box
                sx={{
                    background: "linear-gradient(340.13deg, #DC4B9A 40.3%, #51D5F5 59.7%)",
                    height: "71px",
                    borderRadius: "15px 15px 0 0",
                    display: "flex",
                    justifyContent: "space-between",
                    px: "30px",
                    alignItems: "center",
                }}
            >
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px", md: "20px" } }}>
                    LEFT
                </Typography>
                <Typography sx={{ fontSize: { xs: "13px", sm: "18px", md: "20px" }, fontWeight: "bold" }}>
                    DownLine Details
                </Typography>
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px", md: "20px" } }}>
                    RIGHT
                </Typography>
            </Box>

            <Box sx={{ height: "fit-content", borderRadius: "0 0 15px 15px", backgroundColor: "#091B29", textAlign: "center" }}>
                {rows.map((row, index) => {
                    const isLastRow = index === rows.length - 1;
                    return (
                        <Box key={index} sx={{ position: "relative" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    textAlign: "center",
                                    justifyContent: "space-between",
                                    width: "88%",
                                    mx: "auto",
                                    pt: "8px",
                                    pb: "8px",
                                    gap: "20px",
                                }}
                            >
                                <Typography sx={{ fontSize: "19px" }}>{row.left}</Typography>
                                <Typography sx={{ fontSize: "14px" }}>{row.rank}</Typography>
                                <Typography sx={{ fontSize: "19px" }}>{row.right}</Typography>
                            </Box>
                            {!isLastRow && (
                                <Box
                                    sx={{
                                        border: "0px solid white",
                                        backgroundColor: "white",
                                        height: ".1px",
                                    }}
                                ></Box>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
