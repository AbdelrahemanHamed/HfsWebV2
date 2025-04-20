import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Modal,
  Box,
  IconButton,
  Avatar
} from "@mui/material";
import { useForm } from "react-hook-form";
import useApi from "@/api";
import toast from "react-hot-toast";
import css from "./style.module.css";
import EditEmail from "./EditEmail";
import { BookmarkRemoveSharp } from "@mui/icons-material";

const EditProfileModal = ({ open, onClose, user, onUpdate }) => {
    const { register, handleSubmit } = useForm();
      const [file, setFile] = useState(null);
      const [preview, setPreview] = useState(null);
    
      const handleFileChange = (e) => {
        const file = e.dataTransfer?.files[0] || e.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      };
      const deleteFile = () => {
        setFile(null);
        setPreview(null);
      };
    
  const api = useApi();
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    try {
      setLoading(true);
      const res = await api.post("/edit/profile", payload);
      const data = res.data;
      onUpdate(data.user);
      onClose();
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="edit-profile-modal"
		>
			<Box
				sx={{
					display: "grid",
					placeContent: "center",
					height: "100%",
					pointerEvents: "none",
				}}
			>
				<Card
					sx={{ minWidth: "min(80vw, 500px)", pointerEvents: "auto" }}
				>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Edit Profile
						</Typography>
						<hr />
						<form
							onSubmit={handleSubmit(submit)}
							className={css.form}
						>
							<div className={css.coolinput}>
								<label
									htmlFor="first_name"
									className={css.text}
								>
									First Name:
								</label>
								<input
									id="first_name"
									className={css.input}
									defaultValue={user.first_name}
									{...register("first_name")}
								/>
							</div>
							<div className={css.coolinput}>
								<label htmlFor="last_name" className={css.text}>
									Last Name:
								</label>
								<input
									id="last_name"
									className={css.input}
									defaultValue={user.last_name}
									{...register("last_name")}
								/>
							</div>
							<div className={css.coolinput}>
								<label htmlFor="phone" className={css.text}>
									Phone Number:
								</label>
								<input
									id="phone"
									className={css.input}
									defaultValue={user.mobile}
									{...register("mobile")}
								/>
							</div>
							<Box color="#333">
								{!preview ? (
									<div
										onDrop={(e) => {
											e.preventDefault();
											handleFileChange(e);
										}}
										onDragOver={(e) => {
											e.preventDefault();
											e.target.style.border =
												"2px solid #ccc";
										}}
										style={{
											border: "2px dashed #ccc",
											padding: "20px",
											borderRadius: "5px",
											textAlign: "center",
											color: "#333",
											height: "120px",
											cursor: "pointer",
										}}
									>
										<Typography>
											Drag the Image here
										</Typography>
										<label htmlFor="Input">
											Or Select an Image
										</label>
										<input
											id="Input"
											type="file"
											onChange={(e) =>
												handleFileChange(e)
											}
											style={{ display: "none" }}
										/>
									</div>
								) : (
									<div className="avatar_container">
										<IconButton onClick={deleteFile}>
											<BookmarkRemoveSharp />
										</IconButton>
										<Avatar
											src={preview}
											sx={{ width: 56, height: 56 }}
										/>
									</div>
								)}
							</Box>
							<CardActions>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									disabled={loading}
									type="submit"
								>
									{loading ? "Updating..." : "Update"}
								</Button>
							</CardActions>
						</form>
						<hr />
						<CardContent>
							<EditEmail user={user} />
						</CardContent>
					</CardContent>
				</Card>
			</Box>
		</Modal>
  );
};

export default EditProfileModal;