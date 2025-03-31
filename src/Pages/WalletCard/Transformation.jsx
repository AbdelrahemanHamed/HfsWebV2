/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import {
  Card,
  Modal,
  Button,
  Box,
  CardContent,
  Typography,
  CardActions,
  TextField,
} from "@mui/material";
import css from "./style.module.css";
import useApi from "@/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Transformation({ getWallet }) {
  const api = useApi();
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    try {
      setLoading(true);
      const res = await api.post("/token-wallet/transactions/create", payload);
      toast.success(res.data.message);
      getWallet();
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Box className={css.form}>
      <Box component="h4">Transactions</Box>
      <div className={css.coolinput}>
        <label htmlFor="id_code" className={css.text}>Receiver Member ID:</label>
        <input
          type="text"
          id="id_code"
          placeholder="Receiver Member ID"
          className={css.input}
          {...register("id_code")}
        />
      </div>
      <div className={css.coolinput}>
        <label htmlFor="amount" className={css.text}>Amount:</label>
        <input
          type="text"
          id="amount"
          placeholder="Amount here..."
          className={css.input}
          {...register("amount")}
        />
      </div>
      <Button type="button" onClick={() => setOpen(true)}>Send</Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{ display: "grid", placeContent: "center", height: "100%" }}
          component="form"
          onSubmit={handleSubmit(submit)}
        >
          <Card sx={{ minWidth: "500px" }} className={css.form}>
            <CardContent>
              <Typography gutterBottom variant="h5">Please enter your password</Typography>
              <TextField
                type="password"
                id="password"
                placeholder="Password Please..."
                className={css.input}
                {...register("password")}
                fullWidth
              />
            </CardContent>
            <CardActions>
              <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
                <Button variant="contained" disabled={loading} type="submit" fullWidth>
                  Send
                </Button>
                <Button onClick={handleClose} fullWidth>Cancel</Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
}