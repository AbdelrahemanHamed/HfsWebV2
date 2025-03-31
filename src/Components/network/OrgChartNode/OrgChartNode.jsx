import { useState, useEffect } from "react";
import { Typography, Box, IconButton, Avatar } from "@mui/material";
import { ExpandMore, Remove } from "@mui/icons-material";

// css
import css from "./style.module.css";

// api
import useApi from "@/api";

// assets
import UserPlaceholder from "@/assets/images/placeholder/user.png";

const OrgChartNode = ({
  user_id,
  id_code,
  // full_name,
//   id_code,
  full_name,
//   rank_name,
//   rank,
//   user_image,
subscription,
  r,
  l,

}) => {

  // config
  const api = useApi();

  // data
  const [right_leg, setRight] = useState(null);
  const [left_leg, setLeft] = useState(null);
  const [isChildrenVisible, setIsChildrenVisible] = useState(false);

  const handleToggleChildren = () => {
    setIsChildrenVisible(!isChildrenVisible);
  };

//   direct R & L
  const getLegs = async (user_id) => {
    try {
      const res = await api.get(`/user/network/node/${user_id}`);
      // console.log(res.data);
      setRight(res.data.rightLeg);
      setLeft(res.data.leftLeg);
	} catch (err) {
      console.error(err);
    }
  };

  // console.log("Right Leg wqe", right_leg);
  // on component render
  useEffect(() => {
    getLegs(user_id);
    setIsChildrenVisible(false);
  }, [user_id]);

  const [Left_User, setUser] = useState({
    // user_id: right_leg.id,
    // id_code: id_code,
    // full_name: full_name,
    // rank: auth_user.member?.rank,

  });

  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 3,
        position: "relative",
        
      }}
    >
      {r && <div className={css.r}>R</div>}
      {l && <div className={css.l}>L</div>}
      <Box
        sx={{
          width: "225px",
          // height: "152px",
          borderRadius: "15px",
          position: "relative",
          boxShadow: "0px 2px 20px 1px #000",
        }}
      >
        <style>
              {`
                @keyframes waveAnimation {
                  0% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                  100% {
                    background-position: 0% 50%;
                  }
                }
              `}
      </style>
        <Box
          sx={{
            background:
            "linear-gradient(124.86deg, #63CCEC 30.03%, #E44896 60.97%)",
          backgroundSize: "200% 300%", // Makes the gradient larger to allow smooth movement
          animation: "waveAnimation 5s ease infinite", // Applies animation
          borderRadius: "15px 15px 0 0",
          }}
        >
<Avatar
//   src={user_image || undefined} // Only use user_image if it's valid
//   alt={`${full_name}'s picture`}
  sx={{
    width: "80px",
    height: "80px",
    // backgroundColor: user_image ? "#fff" : "red", // Default background color if no image
    color: "#171118", // Text color for initials
    fontSize: "50px", // Size of initials
    fontWeight: "bold",
    position: "relative",
    margin: "auto",
    transform: "translate(0%,30%)",
    overflow: "hidden",
  }}
>
  {/* {!user_image && full_name
    ? full_name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase() // Extract initials and display
    : null} */}
</Avatar>

        </Box>

        <Box
          sx={{
            backgroundColor: "#02070B",
            // height: "60%",
            padding: "20% 0",
            borderRadius: "0 0 15px 15px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "13px", color: "#fff" }}>
            {full_name} 
          </Typography>
		  <Typography>
			
		  </Typography>
          <Typography sx={{ fontSize: "10px", color: "#fff" }}>
            id:  {id_code} 
          </Typography>
          <Typography sx={{ fontSize: "10px", color: "#fff" }}>
           {subscription?.name}
          </Typography>
        </Box>


      </Box>
      {(left_leg || right_leg) && (
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center" ,
            justifyContent: "center",
            borderRadius:"50%",
            mt:"30px",
            width:"30px",
            height:"30px",
            boxShadow:"0px 2px 30px .1px #fff",
            background:"linear-gradient(124.86deg, #fff 7.03%, #fff 92.97%)"
            }}>
            <IconButton
              onClick={handleToggleChildren}
              sx={{ marginTop: .5, color: "#000"  }}
            >
              {isChildrenVisible ? <Remove /> : <ExpandMore />}
          </IconButton>
        </Box>

      )}
	  
      {isChildrenVisible && (
        <>
          {(left_leg || right_leg) && (
            <div className={css.divider}>
              <span></span>
              <div className={css.line}></div>
              <span></span>
            </div>
          )}
          <Box sx={{ display: "flex", gap: 2 }}>
            {left_leg ? (
              <OrgChartNode {...left_leg} l="1" />
            ) : (
              <Box sx={{ width: "225px" }} />
            )}
            {right_leg ? (
              <OrgChartNode {...right_leg} r="1" />
            ) : (
              <Box sx={{ width: "225px" }} />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default OrgChartNode;
