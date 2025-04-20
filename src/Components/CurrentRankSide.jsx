
import { useContext, useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import NextRank from "../Components/dashboardComponents/NextRansk/NextRanks"
import membershipBG from "@/assets/images/membershipBG.svg";
import { Context } from "@/Context";
import copy_icon from "@/assets/images/pages_assets/copy_icon.png";
import arrow from "@/assets/images/pages_assets/arrow.png";
import { motion } from "framer-motion";
export default function CurrentRankSide() {

    const { user, setUser } = useContext(Context);
    const [rank, setRank] = useState(null);


    const referral = `${window.location.origin}/referral?u=${user.id_code}`;

    const userArray = JSON.parse(localStorage.getItem("user"));
    const userSubscription = userArray.subscription.name;
    const usersubscriptionDate = userArray.subscription.expired_at;
    const usersubscriptionRemainingDays = userArray.subscription.remaining_days;
    const rankImg = userArray.rank.image?.url || 'https://via.placeholder.com/150';
    const CurrentRank = userArray.rank.name; // Indexes correspond to the positions in the array



    const copyReferral = async () => {
        try {
            await navigator.clipboard.writeText(referral);
            toast.success("Referral Link has been copied to clipboard");
        } catch (error) {
            toast.error("Can't copy the `Referral Link`");
        }
    };



    const getRank = async () => {
        try {
            const res = await api.get("/rank");
            setRank(res.data.rank);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getRank();
    }, [])
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: {
                    xs: "30px",
                    md: "0px",
                },
                flex: { sm: 0.1 },
            }}
        >
            {/* referral link */}
            <Box
                sx={{
                    // maxWidth: "355px",
                    height: "103px",
                    backgroundImage: `url(${membershipBG})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat", // Repeat the pattern
                    borderRadius: "15px",
                    p: "10px",
                    display: "flex",
                    justifyContent: "ceneter",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                    }}
                >
                    <Typography
                        sx={{ fontSize: "19px", fontWeight: "bold" }}
                    >
                        Referral link
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: "200px",
                                height: "38px",
                                borderRadius: "5px",
                                flex: 1,
                                backgroundColor: "#FFFFFF",
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                px: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    backgroundColor: "#FFFFFF",
                                    color: "black",
                                    mask: "linear-gradient(90deg, black 100%, transparent)",
                                    overflow: "hidden",
                                }}
                            >
                                <span
                                    className="oneLine"
                                    style={{ flex: "2" }}
                                >
                                    {referral}
                                </span>
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: "32px",
                                height: "32px",
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <IconButton onClick={copyReferral}>
                                <Box
                                    component="img"
                                    src={copy_icon}
                                    sx={{
                                        width: "18px",
                                        height: "18px",
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* membership and sponser ID */}
            <Box
                sx={{
                    borderRadius: "15px",
                    backgroundImage: `url(${membershipBG})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat", // Repeat the pattern
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "left",
                    height: "103px",
                    p: "1em",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "15px",
                        lineHeight: "2",
                    }}
                    variant="h6"
                >
                    {/* Sponsor ID: {sponserId} */}
                </Typography>

                <br />
                <Box sx={{ display: "flex", gap: "20px", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                    <Typography
                        sx={{
                            fontSize: "15px",
                            lineHeight: "2",
                            // letterSpacing: "8px",
                        }}
                    >
                        {userSubscription
                            ? `My Membership: ${userSubscription}`
                            : "Not Subscribed"}


                    </Typography>
                    <Typography sx={{ fontSize: "15px", display: "flex", gap: "4px", alignItems: "center" }}>
                        {usersubscriptionRemainingDays} <Typography sx={{ fontSize: "10px" }}>Day</Typography>
                    </Typography>
                </Box>
            </Box>

            {/* Current Rank */}
            <Box
                component={motion.div}
                initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                whileHover={
                    {
                        // y: -200,
                        // x: -400,
                        // rotate: 360,
                        // scale: 2,
                        // backgroundColor: "#2B6145",
                    }
                }
                transition={{ duration: 0.2, type: "easeInOut" }}
                sx={{
                    // width: "355px",
                    height: "163px",
                    backgroundColor: "#061622",
                    // mt: "10px",
                    mb: "0px",
                    borderRadius: "15px",
                    p: "15px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    cursor: "pointer",
                }}
                onClick={() => {
                    navigate("/MembershipTier");
                }}
            >
                <Box sx={{ display: "flex", gap: "20px" }}>
                    <Typography
                        sx={{
                            fontSize: "15px",
                            lineHeight: "17.9px",
                            letterSpacing: "8px",
                        }}
                    >
                        Current
                        <br />
                        Rank
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            component: "img",
                            src: rankImg,
                            backgroundColor: "red",
                            width: "10%",
                            height: "100%",
                            objectFit: "cover",  // Optional: Makes the image fit within the box while maintaining aspect ratio
                        }}
                    />
                </Box>



                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "15px",
                            fontWeight: "700",
                            letterSpacing: "8px",
                            alignSelf: "center",
                            backgroundColor: 'red',


                        }}
                    >
                        {CurrentRank}
                    </Typography>

                    <Box>
                        <Box
                            component="img"
                            src={arrow}
                            sx={{ width: "20.81px" }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        backgroundImage: `url(${rank?.image})`,
                        // width: "133px",
                        height: "133px",
                        backgroundSize: "cover",
                        objectFit: "cover",
                        backgroundPosition: "center",
                        position: "absolute",
                        top: "-60px",
                        right: "30px",

                    }}
                ></Box>
            </Box>

            {/* creteria for next Rank */}
            <NextRank />
        </Box>
    )
}