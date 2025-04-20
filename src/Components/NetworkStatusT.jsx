import { useContext, useState, useEffect } from "react"
import { Context } from "@/Context";
import { Box, IconButton, Typography } from "@mui/material";



export default function NetworkStatusT() {

    const [volume, setVolume] = useState({
        left_leg_volume: "-",
        right_leg_volume: "-",
    });
    const {  user } = useContext(Context);

    const userArray = JSON.parse(localStorage.getItem("user"));




    const total_downline = userArray.total_downline;


    const left_leg_cv = user.left_leg_cv;
    return (
        <Box
            sx={{
                // width: sidebarOpen
                // ? { xs: "100%", md: "600px", xl: "900px" }
                // : { xs: "100%", md: "700px", xl: "900px" },
                height: { xs: "288px", xl: "288px" },
                borderRadius: "15px",

            }}
        >
            <Box
                sx={{
                    background:
                        "linear-gradient(340.13deg, #DC4B9A 40.3%, #51D5F5 59.7%)",
                    height: "71px",
                    borderRadius: "15px 15px 0 0",
                    display: "flex",
                    justifyContent: "space-between",
                    px: "30px",
                    alignItems: "center",

                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: "12px",
                            sm: "18px",
                            md: "20px",
                        },
                    }}
                >
                    LEFT
                </Typography>
                <Typography
                    sx={{
                        fontSize: {
                            xs: "13px",
                            sm: "18px",
                            md: "20px",
                        },
                        fontWeight: "bold",
                    }}
                >
                    Network status
                </Typography>
                <Typography
                    sx={{
                        fontSize: {
                            xs: "12px",
                            sm: "18px",
                            md: "20px",
                        },
                    }}
                >
                    RIGHT
                </Typography>
            </Box>

            <Box
                sx={{
                    height: "auto",
                    px: "30px",
                    py: "25px",
                    backgroundColor: "#091B29",
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
                    borderRadius: "0 0  15px 15px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                            },
                        }}
                    >
                        {volume.left_leg_volume}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                            },
                        }}
                    >
                        {left_leg_cv}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                            },
                        }}
                    >
                        {total_downline.right}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                            },
                            fontWeight: "medium",
                        }}
                    >
                        Rank volume
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                            },
                            fontWeight: "medium",
                        }}
                    >
                        Total Network volume
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                            },
                            fontWeight: "medium",
                        }}
                    >
                        Total down line
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                            },
                        }}
                    >
                        {volume.right_leg_volume}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                            },
                        }}
                    >
                        {left_leg_cv}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                            },
                        }}
                    >
                        {total_downline.right}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
