// pages/index.js

import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import { resetTables } from '../book/[id]';

const mockProducts = [
  { _id: "1", title: "Pizza Margherita", prices: [10, 15, 20], img: "img1.jpg" },
  { _id: "2", title: "Pepperoni Pizza", prices: [12, 18, 24], img: "img2.jpg" },
  // Add more mock products as needed
];

const mockOrders = [
  { _id: "101", customer: "John Doe", total: 15, method: 0, status: 0 },
  { _id: "102", customer: "Jane Smith", total: 20, method: 1, status: 1 },
  // Add more mock orders as needed
];

const Index = () => {
  const [pizzaList, setPizzaList] = useState(mockProducts);
  const [orderList, setOrderList] = useState(mockOrders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = (id) => {
    setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
  };

  const handleStatus = (id) => {
    const updatedOrders = orderList.map((order) => {
      if (order._id === id && order.status < 2) {
        return { ...order, status: order.status + 1 };
      }
      return order;
    });
    setOrderList(updatedOrders);
  };

  const handleResetTables = () => {
    const resetData = resetTables(); // Panggil fungsi reset dari halaman book/[id]
    // Lakukan sesuatu dengan data reset (mungkin menyimpan ke state, database, dll.)
    console.log('Tables reset successfully.');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className={styles.container}>
        {/* Products section */}
        <div className={styles.item}>
          <h1 className={styles.title}>Products</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Prices</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pizzaList.map((product) => (
                <tr key={product._id}>
                  <td>{product.img}</td>
                  <td>{product.title}</td>
                  <td>{product.prices.join(", ")}</td>
                  <td>
                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Orders section */}
        <div className={styles.item}>
          <h1 className={styles.title}>Orders</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr key={order._id}>
                  <td>{order.customer}</td>
                  <td>${order.total}</td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button onClick={() => handleStatus(order._id)}>Next Stage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button onClick={handleResetTables}>Reset Tables</button>
      </div>
    </div>
  );
};

export default Index;
