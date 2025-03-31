/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { Context } from "@/Context";
import useApi from "@/api";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function TokenWalletTransactions() {
    const api = useApi();
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);

    async function getTokenWalletTransactions() {
        try {
            const res = await api.get("/token-wallet/transactions");
            
            // Extract transactions from nested response structure
            const transactionsData = res.data.result.flat(); // Flatten the nested array

            setTransactions(transactionsData);
        } catch (error) {
            console.error("Error fetching token wallet transactions:", error);
        }
    }

    useEffect(() => {
        getTokenWalletTransactions();
    }, [page]);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <Box sx={{ p: "50px" }}>
            {/* Table Header */}
            <TableContainer component={Paper} sx={{ mt: "20px", backgroundColor: "#130E14", color: "white" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>From User</TableCell>
                            <TableCell sx={{ color: "white" }}>From User ID</TableCell>
                            <TableCell sx={{ color: "white" }}>To User</TableCell>
                            <TableCell sx={{ color: "white" }}>To User ID</TableCell>
                            <TableCell sx={{ color: "white" }}>Amount</TableCell>
                            <TableCell sx={{ color: "white" }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.length > 0 ? (
                            transactions.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{ color: "white" }}>{row.from_user}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{row.from_user_id_code}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{row.to_user}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{row.to_user_id_code}</TableCell>
                                    <TableCell sx={{ color: "white" }}>${row.amount}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{row.date}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography>No transactions available.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Pagination
                    sx={{ margin: "30px auto", width: "max-content" }}
                    count={1} // Assuming no pagination from API response
                    page={page}
                    onChange={(e, n) => setPage(n)}
                />
            </ThemeProvider>
        </Box>
    );
}

export default TokenWalletTransactions;
