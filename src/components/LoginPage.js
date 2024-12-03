import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await login(username, password);
      if (token) {
        localStorage.setItem("token", token);
        navigate('/admin'); // Chuyển hướng đến trang admin
      } else {
        alert('Đăng nhập không thành công');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert('Đã xảy ra lỗi trong quá trình đăng nhập');
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên người dùng"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
