import { useState, useEffect } from "react";
import styles from "../../styles/Admin.module.css";
import { resetTables } from '../book/[id]';

const AdminPage = () => {
  const [menuList, setMenuList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const status = ["pending", "preparing", "delivered"];

  const getTokenFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const token = getTokenFromLocalStorage();

  const fetchAllMenus = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/menu', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const menu = await response.json();
        setMenuList(menu);
        console.log(menu);
      } else {
        // Handle fetch error
      }
    } catch (error) {
      console.error("Error fetching all menus:", error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/orders', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const orders = await response.json();
        console.log(orders); // Log data yang diterima dari API
        setOrderList(orders);
      } else {
        // Handle fetch error
      }
    } catch (error) {
      console.error("Error fetching all orders:", error);
    }
  };

  useEffect(() => {
    fetchAllMenus();
    fetchAllOrders();
  }, [token]);

  const handleDeleteMenu = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/menu/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setMenuList(menuList.filter((menu) => menu._id !== id));
        console.log(`Menu with ID ${id} deleted.`);
      } else {
        // Handle delete error
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  const handleStatus = async (id) => {
    try {
      const updatedOrders = orderList.map((order) => {
        if (order.orderId === id && order.status < 2) {
          return { ...order, status: order.status + 1 };
        }
        return order;
      });
      setOrderList(updatedOrders);

      const response = await fetch(`http://localhost:8080/api/v1/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updatedOrders.find(order => order._id === id).status }),
      });
      if (!response.ok) {
        // Handle status update error
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleResetTables = () => {
    const resetData = resetTables();
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
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {menuList && menuList.length > 0 ? (
                menuList.map((menu) => (
                  <tr key={menu.menuId}>
                    <td>{menu.menuId}</td>
                    <td>
                      <img src={menu.menuImage} alt={menu.menuName} />
                    </td>
                    <td>{menu.menuName}</td>
                    <td>{menu.menuPrice}</td>
                    <td>
                      <button onClick={() => handleDeleteMenu(menu.menuId)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No menus available</td>
                </tr>
              )}
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
              <th>Order Details</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList && orderList.length > 0 ? (
              orderList.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.customerName}</td>
                  <td>
                    {order.orderItems && order.orderItems.length > 0 ? (
                      <table>
                        <thead>
                          <tr>
                            <th>Menu ID</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItems.map((orderItem) => (
                            <tr key={orderItem.orderItemId}>
                              <td>{orderItem.orderItemId}</td>
                              <td>{orderItem.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <span>No order items available</span>
                    )}
                  </td>
                  <td>preparing  
                    {/* {status[order.status]} */}
                    </td>
                  <td>
                    <button onClick={() => handleStatus(order.orderId)}>Next Stage</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
  
};

export default AdminPage;
