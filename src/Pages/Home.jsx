import { Box } from "@mui/material";
import Navbar from "@/Components/layout/Navbar";
import About from "@/Components/Home/About";
import OurFocus from "@/Components/Home/OurFocus";
import OurStory from "@/Components/Home/OurStory";
import PeaceOfArts from "../Components/PeaceOfArts";
import SocietyProducts from "@/Components/Home/SocietyProducts";
import HfsSociety from "../Components/HfsSociety";
import FloatingCallButton from "../Components/FloatingCallButton";
import Subscriptions from "../Components/Subscriptions";
import Footer from "@/Components/Home/Footer/Footer";

function Home() {
  return (
    <Box sx={{
      backgroundImage: `url("https://media.giphy.com/media/sWFYgYFjHGugleQdO7/giphy.gif")`,
      backgroundPosition: "center",
      backgroundRepeat: "repeat",
    }}>
      <Navbar />
      <About />
      <OurFocus />
      <OurStory />
      <PeaceOfArts />
      <SocietyProducts />
      <HfsSociety />
      <Subscriptions />
      <FloatingCallButton />
      <Footer />
    </Box>
  );
}

export default Home;
