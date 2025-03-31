import axios from "axios";
import { useContext, useEffect } from "react";
import { Context } from "@/Context";

function SponsorIdCheck() {
  let { baseUrl } = useContext(Context);

  async function getSponsorId() {
    let res = await axios.get(`${baseUrl}/spnsor-data`);
  }

  useEffect(() => {
    getSponsorId();
  });
  return <></>;
}

export default SponsorIdCheck;
