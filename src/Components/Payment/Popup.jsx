import { useState, useContext } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Swal from "sweetalert2";
import { Context } from "@/Context";
import useApi from "@/api";

function PurchaseButton({ id }) {
    const api = useApi();
    const { token } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("token");

    async function subscribe() {
        setOpen(false);
        try {
            const res = await api.post(
                "/user/subscribe",
                { package_id: id, pay_by: paymentMethod },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (paymentMethod === "stripe" && res.data.redirect_link) {
                window.open(res.data.redirect_link, "_blank");
            } else {
                Swal.fire({
                    title: "Good job!",
                    text: res.data.success_msg,
                    icon: "success",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Insufficient funds",
                text: error.response?.data?.message || "Subscription failed",
                icon: "error",
            });
        }
    }

    return (
        <>
            <Box sx={{ textAlign: "center", mt: "30px", width: "100%" }}>
                <Button className="btn-gradient" sx={{ fontSize: ".9em", width: "80%", padding: ".3em", background: "#FFFFFF", borderRadius: 2 }} onClick={() => setOpen(true)}>
                    Purchase NOW
                </Button>
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Select Payment Method</DialogTitle>
                <DialogContent>
                    <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <FormControlLabel value="token" control={<Radio />} label="Pay with your Token Wallet" />
                        <FormControlLabel value="stripe" control={<Radio />} label="Pay with Stripe" />
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={subscribe}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PurchaseButton;