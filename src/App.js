import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage'; // Đảm bảo đường dẫn đúng
import AdminPage from './components/AdminPage'; // Đường dẫn đến trang quản trị
import FoodList from './components/FoodList'; // Đường dẫn đến danh sách món ăn

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/food-list" element={<FoodList />} />
        </Routes>
    </Router>
  );
};

export default App;
