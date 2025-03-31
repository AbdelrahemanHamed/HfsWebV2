import React, { useState, useRef, useEffect, useContext } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { Context } from "@/Context";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import CommissionBalance from './../WalletCard/Balance';

const Index = () => {
    const { token, baseUrl } = useContext(Context);
    const [earnings, setEarnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const calendarRef = useRef(null);

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/wallet/all/commissions`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.data.status) {
                    const earningData = response.data.result.map((item) => ({
                        id: item.id,
                        amount: parseFloat(item.amount).toFixed(2),
                        type: item.type,
                        date: item.paid_at,
                        referralName: item.referral_name || "N/A",
                        referralCode: item.referral_code || "N/A",
                    }));
                    setEarnings(earningData);
                    setFilteredData(earningData);
                }
            } catch (error) {
                console.error("Error fetching earnings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEarnings();
    }, [token, baseUrl]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setCalendarVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDateSelect = (date) => {
        const formattedDate = date.toLocaleDateString("en-GB");
        setSelectedDate(formattedDate);
        setFilteredData(earnings.filter((item) => item.date.startsWith(formattedDate)));
        setCalendarVisible(false);
    };

    const resetFilter = () => {
        setFilteredData(earnings);
        setSelectedDate(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress sx={{ color: "#d94f9c" }} />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4" sx={{ mb: 2, color: "white" }}>All Commissions</Typography>
            <Button variant="contained" color="primary" onClick={() => setCalendarVisible(!calendarVisible)} sx={{ mb: 2, mr: 2 }}>
                {calendarVisible ? "Hide Calendar" : "Filter by Date"}
            </Button>
            {calendarVisible && (
                <Box ref={calendarRef} sx={{ position: "absolute", top: "150px", left: "25%", zIndex: 1000, backgroundColor: "white", padding: "10px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
                    <Calendar onChange={handleDateSelect} />
                </Box>
            )}
            {selectedDate && (
                <Button variant="outlined" color="secondary" onClick={resetFilter} sx={{ mb: 2 }}>
                    Reset Filter
                </Button>
            )}
            <Box sx={{ backgroundColor: "transparent", backdropFilter: "blur(10px)", borderRadius: "10px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "10px" }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: "#d94f9c", color: "white", padding: "10px", textAlign: "left" }}>Amount</th>
                            <th style={{ backgroundColor: "#d94f9c", color: "white", padding: "10px", textAlign: "left" }}>Type</th>
                            <th style={{ backgroundColor: "#d94f9c", color: "white", padding: "10px", textAlign: "left" }}>Date</th>
                            <th style={{ backgroundColor: "#d94f9c", color: "white", padding: "10px", textAlign: "left" }}>Referral Name</th>
                            <th style={{ backgroundColor: "#d94f9c", color: "white", padding: "10px", textAlign: "left" }}>Referral Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? "rgba(126, 126, 126, 0.2)" : "#e0f7fa", color: index % 2 === 0 ? "white" : "black" }}>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>${item.amount}</td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{item.type}</td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{item.date}</td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{item.referralName}</td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{item.referralCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
        </Box>
    );
};

export default Index;
