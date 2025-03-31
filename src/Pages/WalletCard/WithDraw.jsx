import { useForm } from "react-hook-form";
import useApi from "@/api";
import { useState } from "react";
import css from "./style.module.css";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

export default function WithDraw() {
  // config
  const api = useApi();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  // methods
    const onSubmit = async (data) => {
      console.log(data);
    try {
      setLoading(false);
      const res = await api.post("/wallet/transactions", {
			...data,
			transaction_type: "commission_transaction",
		});

      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message || err.message);
    } finally {
      setLoading("false");
    }
  };

  // render
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${css.form} ${css.item4}`}
    >
      <h4>Withdraw</h4>

      <div className={css.coolinput}>
        <label htmlFor="input1" className={css.text}>
          Address:
        </label>
        <input
          id="input1"
          className={css.input}
          {...register("transaction_type")}
          placeholder="Address..."
        />
      </div>
      <div className={css.coolinput}>
        <label htmlFor="input2" className={css.text}>
          Amount:
        </label>
        <input id="input2" {...register("amount")} placeholder="Amount..." />
      </div>
      <div className={css.coolinput}>
        <label htmlFor="input3" className={css.text}>
          Network:
        </label>
        <input id="input3" {...register("network")} placeholder="netWork..." />
      </div>

      <Button type="submit">Send</Button>
    </form>
  );
}
