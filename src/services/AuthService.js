import axios from "axios";

const API_URL = "https://orderfoods2.onrender.com/api/auth"; // Đổi dòng này


export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });
  return response.data.token; // Giả định rằng token được trả về trong response
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const logout = () => {
  localStorage.removeItem("token");
};
