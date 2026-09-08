import axios from "axios";
import { getAuth } from "firebase/auth";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(true);
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export const getUserProfile = () => API.get("/users/profile");

export const updateUserProfile = (data) => API.put("/users/profile", data);
