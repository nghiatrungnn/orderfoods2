import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

const API_URL = "https://orderfoods2.onrender.com/api/orders"; // Đảm bảo URL này là chính xác

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    foodItem: "",
    price: "",
    quantity: 0,
    customerName: "",
    address: "",
    imageUrl: "",
  });
  const [editingOrder, setEditingOrder] = useState(null);

  // Lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_URL, {
          headers: { Authorization: token },
        });
        console.log("Dữ liệu đơn hàng:", response.data); // Kiểm tra dữ liệu
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Hàm thêm đơn hàng
  const handleAddOrder = async () => {
    try {
      if (
        !newOrder.foodItem ||
        !newOrder.price ||
        !newOrder.quantity ||
        !newOrder.customerName ||
        !newOrder.address ||
        !newOrder.imageUrl
      ) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        API_URL,
        {
          ...newOrder,
          quantity: Number(newOrder.quantity),
          price: Number(newOrder.price),
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      );

      setOrders((prevOrders) => [...prevOrders, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  // Hàm cập nhật đơn hàng
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/${editingOrder._id}`,
        {
          ...newOrder,
          quantity: Number(newOrder.quantity),
          price: Number(newOrder.price),
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === editingOrder._id ? response.data : order
        )
      );

      resetForm();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Hàm xóa đơn hàng
  const handleDeleteOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: token },
      });

      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Hàm để xử lý chỉnh sửa đơn hàng
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder({
      foodItem: order.foodItem,
      price: order.price,
      quantity: order.quantity,
      customerName: order.customerName,
      address: order.address,
      imageUrl: order.imageUrl,
    });
  };

  // Hàm reset form
  const resetForm = () => {
    setEditingOrder(null);
    setNewOrder({
      foodItem: "",
      price: "",
      quantity: 0,
      customerName: "",
      address: "",
      imageUrl: "",
    });
  };

  return (
    <div className="admin-page">
      <h1>Quản lý đơn hàng</h1>
      <div className="order-form">
        <h2>{editingOrder ? "Chỉnh sửa đơn hàng" : "Thêm đơn hàng"}</h2>
        <input
          type="text"
          placeholder="Tên món ăn"
          value={newOrder.foodItem}
          onChange={(e) => setNewOrder({ ...newOrder, foodItem: e.target.value })}
        />
        <input
          type="number"
          placeholder="Giá"
          value={newOrder.price}
          onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Số lượng"
          value={newOrder.quantity}
          onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tên khách hàng"
          value={newOrder.customerName}
          onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Địa chỉ"
          value={newOrder.address}
          onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL hình ảnh"
          value={newOrder.imageUrl}
          onChange={(e) => setNewOrder({ ...newOrder, imageUrl: e.target.value })}
        />
        {editingOrder ? (
          <button onClick={handleSaveEdit}>Lưu thay đổi</button>
        ) : (
          <button onClick={handleAddOrder}>Thêm đơn hàng</button>
        )}
      </div>
      <div className="order-list">
        <h2>Danh sách đơn hàng</h2>
        {orders.length === 0 ? (
          <p>Không có đơn hàng nào để hiển thị.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <h3>{order.foodItem}</h3>
                <p>Giá: {order.price} VND</p>
                <p>Số lượng: {order.quantity}</p>
                <p>Tên khách hàng: {order.customerName}</p>
                <p>Địa chỉ: {order.address}</p>
                <p>Ngày đặt: {new Date(order.orderDate).toLocaleString()}</p>
                <img src={order.imageUrl} alt={order.foodItem} />
                <button onClick={() => handleEditOrder(order)}>Chỉnh sửa</button>
                <button onClick={() => handleDeleteOrder(order._id)}>Xóa</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
