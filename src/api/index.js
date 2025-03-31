import { useNavigate } from "react-router-dom";
import axios from "axios";

const useApi = () => {
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useApi;
