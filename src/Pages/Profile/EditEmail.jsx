// EditEmail.jsx
import { useState } from "react";
import { CardActions, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import useApi from "@/api";
import toast from "react-hot-toast";
import css from "./style.module.css";

export default function EditEmail({ user }) {
  const api = useApi();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  // Methods
  const submit = async (payload) => {
    try {
      setLoading(true);
      const res = await api.post("/user/password/email", payload);
      const data = res.data.status;
      toast.success(data);
    } catch (error) {
      console.error(error);
      const errors = error.response?.data?.message;
      if ("string" == typeof errors) return toast.error(errors);
      if (errors)
        Object.values(errors)
          .flat()
          .forEach((err) => toast.error(err));
      else toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(submit)} className={css.form}>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          loading={loading.toString()}
          disabled={loading}
          type="submit"
        >
          Send the request to edit it
        </Button>
      </CardActions>
    </form>
  );
}