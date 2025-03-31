import { useState, useContext, useRef } from "react";
import useApi from "@/api";
import { Box, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Context } from "@/Context";
import { useForm } from "react-hook-form";
import OrgChartNode from "../Components/network/OrgChartNode/OrgChartNode";

// Import Material-UI icons
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const Network = () => {
  const api = useApi();
  const { user: auth_user } = useContext(Context);
  const { register, handleSubmit } = useForm();

  const containerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);


  const userArray = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const user_idt = userArray.id;
  const full_name = userArray.full_name;
  const id_code = userArray.id_code;
  const leftLeg = userArray.leftLeg;

  const [user, setUser] = useState({
    user_id: user_idt,
    id_code: id_code,
    full_name: full_name,
    // rank: auth_user.member?.rank,
    user_image: auth_user.image,
  });



  const submit = async (payload) => {
    try {
      const res = await api.get(`/user/data/${payload.id}`);
      const data = res.data["user data"];
      const u = {
        id: data.id,
        user_name: data.username,
        rank: data.rank,
        user_image: data.image,
      };

      setUser(u);
    } catch (err) {
      console.error(err);
      toast.error("No User with this id");
    }
  };
  console.log("User Data",user)

  const handleFullScreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullScreen(false);
      } else {
        containerRef.current.requestFullscreen();
        setIsFullScreen(true);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        // backgroundColor: isFullScreen ? "#0d0d0d" : "white", // Dynamic background color
      }}
      ref={containerRef}
    >
      <h1 style={{ fontSize: "50px", paddingTop: "20px", paddingLeft: "20px" }}>Genealogy</h1>
      <br />
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.1}
        maxScale={3}
        smooth={true}
        limitToBounds={false}
        centerOnInit={true}
        panning={{
          disabled: false,
          velocityDisabled: false,
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <Box>
            {/* Controls */}
            <Box
              sx={{
                position: "sticky",
                top: 10,
                left: 10,
                zIndex: 2,
                width: "fit-content",
                display: "flex",
                flexDirection: "row",
                pl: "15px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => zoomIn()}
                sx={{ margin: 1 }}
                startIcon={<ZoomInIcon />}
              >
                Zoom In
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => zoomOut()}
                sx={{ margin: 1 }}
                startIcon={<ZoomOutIcon />}
              >
                Zoom Out
              </Button>
              <Button
                variant="contained"
                color={isFullScreen ? "error" : "success"}
                onClick={handleFullScreen}
                sx={{ margin: 1 }}
                startIcon={isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              >
                {isFullScreen ? "Exit Full Screen" : "Go Full Screen"}
              </Button>
              <form onSubmit={handleSubmit(submit)}>
                <TextField
                  variant="filled"
                  label="id"
                  size="small"
                  sx={{
                    "&.MuiTextField-root": {
                      background: "#d4d3d3 !important",
                      borderRadius: 3,
                      mx: 1,
                    },
                  }}
                  {...register("id")}
                />
                <Button variant="outlined" sx={{ margin: 1 }} type="submit">
                  Get
                </Button>
              </form>
            </Box>

            {/* Transformable Area */}
            <Box
              sx={{
                height: isFullScreen ? "80vh" : "500px",
                border: ".1px solid #5f4863",
                borderRadius: "8px",
                padding: 2,
                backgroundColor: "#171118",
                boxShadow: "0 0 40px 6px rgba(255, 255, 255, 0.1)",
                maxWidth: "100%",
                maxHeight: "4800px",
                margin: "20px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TransformComponent>
                <OrgChartNode {...user} />
              </TransformComponent>
            </Box>
          </Box>
        )}
      </TransformWrapper>
    </Box>
  );
};

export default Network;
