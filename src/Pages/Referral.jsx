import { useContext, useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useApi from "@/api";
import { Context } from "@/Context";

// components
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { NotInterested } from "@mui/icons-material";

// assets
import logo from "@/assets/images/HFSLOGO.png";

function Referral() {
  // config
  const [searchParams] = useSearchParams();
  const api = useApi();

  // data
  const sponsorId = searchParams.get("u");
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(false);

  // methods
  const getSponsor = async (sponsor_id) => {
    try {
      setLoading(true);
      const res = await api.get("/sponsor-data", {
        params: { sponsor_id },
      });

      const data = res.data["sponsor name"];

      setSponsor(data);
    } catch (err) {
      toast.error(
        err?.response?.data?.message?.sponsor_id ||
          "Error fetching sponsor data"
      );
    } finally {
      setLoading(false);
    }
  };

  // on component mounted
  useEffect(() => {
    if (sponsorId) getSponsor(sponsorId);
  }, [sponsorId]);

  // render
  if (!sponsorId)
    return (
      <NoData>No Sponsor is not defined, please select an Sponsor.</NoData>
    );

  if (loading) return <Loader />;
  if (!sponsor) return <NoData>Error fetching Sponsor data</NoData>;
  return (
    <div className="h-100 flex center-x center-y">
      <div
        style={{
          borderRadius: "1em",
          background: "white",
          color: "#333",
          width: "600px",
          maxWidth: "80%",
          overflow: "hidden",
        }}
      >
        <header style={{ background: "#e6e6e6", padding: "1em" }}>
          <h3>Register Page for</h3>
          <div className="flex center-y between">
            <p style={{ margin: 10, color: "#777" }}>
              Sponsor id: {sponsorId}
              <span
                style={{
                  borderRadius: 5,
                  margin: 10,
                  textTransform: "capitalize",
                  color: "#e14696",
                  padding: ".3em .7em",
                  background: "#e1469622",
                }}
              >
                {sponsor}
              </span>
            </p>
            <img src={logo} alt="hfs" />
          </div>
        </header>

        <main
          style={{
            padding: "1em",
          }}
        >
          <Form sponsor_id={sponsorId} api={api} />
        </main>
      </div>
    </div>
  );
}

export default Referral;

function NoData({ children }) {
  return (
    <div className="h-100 flex center-x center-y text-center">
      <div>
        <h3 style={{ margin: "1em", fontSize: 50 }}>Opps !!</h3>
        <p style={{ color: "#999", fontSize: 20 }}>{children}</p>
        <p style={{ color: "#999", marginBlock: "1em" }}>
          OR{" "}
          <Link
            style={{ color: "#3539a8", textDecoration: "underLine" }}
            to="/"
          >
            Go To Home Page.
          </Link>
        </p>
      </div>
    </div>
  );
}

function Form({ api, sponsor_id }) {
  const navigate = useNavigate();
  const { setUser } = useContext(Context);

  // data
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    sponsor_id,
    image: null,
  });

  // methods
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

  const getPayload = () => {
    const formDataWithImage = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataWithImage.append(key, value);
    });

    return formDataWithImage;
  };
  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const payload = getPayload();

      const res = await api.post("/register", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Registration successful!");

      const user = res?.data?.user;
      setUser(user);

      localStorage.setItem("token", user?.token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/Dashboard");
    } catch (err) {
      if (err?.response?.data?.message)
        Object.values(err?.response?.data?.message).forEach((errors) => {
          errors.forEach((error) => toast.error(error));
        });
    } finally {
      setLoading(false);
    }
  };

  // on render
  useEffect(() => {
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }));
    }
  }, [file]);

  // render
  return (
    <form onSubmit={submit}>
      <Box color="#333">
        {!preview ? (
          <div
            onDrop={(e) => {
              e.preventDefault();
              handleFileChange(e);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.target.style.border = "2px solid #ccc";
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
            <Typography>Drag the Image here</Typography>
            <label htmlFor="Input">Or Select an Image</label>
            <input
              id="Input"
              type="file"
              onChange={(e) => handleFileChange(e)}
              style={{ display: "none" }}
            />
          </div>
        ) : (
          <div className="avatar_container">
            <IconButton onClick={deleteFile} color="error">
              <NotInterested />
            </IconButton>
            <Avatar src={preview} sx={{ width: 56, height: 56 }} />
          </div>
        )}
      </Box>

      <TextField
        size="small"
        sx={{ mt: 1 }}
        required
        fullWidth
        label="First name"
        placeholder="First name"
        value={formData.name}
        onChange={(e) =>
          setFormData((o) => ({ ...o, first_name: e.target.value }))
        }
      />
      <TextField
        size="small"
        sx={{ mt: 1 }}
        required
        fullWidth
        label="Last name	"
        placeholder="Last name"
        value={formData.name}
        onChange={(e) =>
          setFormData((o) => ({ ...o, last_name: e.target.value }))
        }
      />

      <TextField
        size="small"
        sx={{ mt: 1 }}
        required
        fullWidth
        label="username"
        placeholder="Username"
        value={formData.name}
        onChange={(e) =>
          setFormData((o) => ({ ...o, username: e.target.value }))
        }
      />
      <TextField
        size="small"
        required
        sx={{ mt: 2 }}
        fullWidth
        label="Email"
        placeholder="Email..."
        value={formData.email}
        onChange={(e) => setFormData((o) => ({ ...o, email: e.target.value }))}
      />
      <TextField
        size="small"
        required
        sx={{ mt: 2 }}
        type="password"
        fullWidth
        label="Password"
        placeholder="Enter Your Password..."
        value={formData.password}
        onChange={(e) =>
          setFormData((o) => ({ ...o, password: e.target.value }))
        }
      />
      <TextField
        size="small"
        required
        sx={{ mt: 2 }}
        type="password"
        fullWidth
        label="Password Confirmation"
        placeholder="..."
        value={formData.password_confirmation}
        onChange={(e) =>
          setFormData((o) => ({
            ...o,
            password_confirmation: e.target.value,
          }))
        }
      />

      <Button
        fullWidth
        disabled={loading}
        color="primary"
        sx={{ mt: 2 }}
        variant="contained"
        type="submit"
      >
        Register
      </Button>
    </form>
  );
}
