import { useState } from "react";
import { Button, Box } from "@mui/material";
import Swal from "sweetalert2";
import css from "./style.module.css";
import useApi from "@/api";

export default function Charging({ getWallet, token }) {
    const api = useApi();
    const [money, setMoney] = useState("");

    async function getWithdrawal(amount) {
        try {
            const res = await api.post(
                `/token-wallet/transfer`,
                { amount: parseFloat(amount) }, // Ensure amount is a number
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            Swal.fire({
                title: "Success",
                text: res.data.message,
                icon: "success",
            });

            getWallet();
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: err.response?.data?.message || err.message,
                icon: "error",
            });
        }
    }

    return (
        <Box
            className={css.form}
            component="form"
            onSubmit={(e) => {
                e.preventDefault(); // Prevent page reload
                getWithdrawal(money);
            }}
        >
            <Box component="h4">HFSس Token</Box>

            <div className={css.coolinput}>
                <label htmlFor="input" className={css.text}>
                    Token:
                </label>
                <input
                    type="number" // Use number input to prevent invalid data
                    id="input"
                    placeholder="Token..."
                    name="input"
                    className={css.input}
                    value={money}
                    onChange={(e) => setMoney(e.target.value)}
                />
            </div>
            <Button type="submit">Submit</Button>
        </Box>
    );
}
