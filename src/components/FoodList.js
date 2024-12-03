// import React, { useState, useEffect } from 'react';
// import './FoodList.css'; // Import tệp CSS

// function FoodList() {
//     const [orders, setOrders] = useState([]);
//     const [newOrder, setNewOrder] = useState({ foodItem: '', quantity: '', customerName: '', address: '', imageUrl: '' });
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setLoading(true);
//         fetch('https://orderfoods1.onrender.com/api/orders')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Lỗi mạng: ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setOrders(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 setError('Có lỗi xảy ra khi tải danh sách đơn hàng.');
//                 setLoading(false);
//             });
//     }, []);

//     const handleDelete = (id) => {
//         setOrders(orders.filter(order => order._id !== id));
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewOrder({ ...newOrder, [name]: value });
//     };

//     const handleAddOrder = (e) => {
//         e.preventDefault();
//         if (newOrder.foodItem && newOrder.quantity && newOrder.customerName && newOrder.address && newOrder.imageUrl) {
//             setLoading(true);
//             fetch('https://orderfoods1.onrender.com/api/orders', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newOrder),
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Lỗi mạng: ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setOrders([...orders, data]);
//                 setNewOrder({ foodItem: '', quantity: '', customerName: '', address: '', imageUrl: '' });
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error adding order:', error);
//                 setError('Có lỗi xảy ra khi thêm đơn hàng.');
//                 setLoading(false);
//             });
//         } else {
//             setError('Tất cả các trường đều là bắt buộc.');
//         }
//     };

//     return (
//         <div>
//             <h2>Danh Sách Đơn Hàng</h2>
//             {loading && <p>Đang tải dữ liệu...</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <table className="food-table">
//                 <thead>
//                     <tr>
//                         <th>Món Ăn</th>
//                         <th>Số Lượng</th>
//                         <th>Tên Khách Hàng</th>
//                         <th>Địa Chỉ</th>
//                         <th>Hình Ảnh</th>
//                         <th>Hành Động</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map(order => (
//                         <tr key={order._id}>
//                             <td>{order.foodItem}</td>
//                             <td>{order.quantity}</td>
//                             <td>{order.customerName}</td>
//                             <td>{order.address}</td>
//                             <td>
//                                 <img src={order.imageUrl} alt={order.foodItem} className="food-image" />
//                             </td>
//                             <td>
//                                 <button onClick={() => handleDelete(order._id)}>Xóa</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <form onSubmit={handleAddOrder} className="food-form">
//                 <input
//                     type="text"
//                     name="foodItem"
//                     placeholder="Tên Món"
//                     value={newOrder.foodItem}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <input
//                     type="number"
//                     name="quantity"
//                     placeholder="Số Lượng"
//                     value={newOrder.quantity}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="customerName"
//                     placeholder="Tên Khách Hàng"
//                     value={newOrder.customerName}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="address"
//                     placeholder="Địa Chỉ"
//                     value={newOrder.address}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="imageUrl"
//                     placeholder="URL Hình Ảnh"
//                     value={newOrder.imageUrl}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <button type="submit">Thêm Đơn Hàng</button>
//             </form>
//         </div>
//     );
// }

// export default FoodList;
