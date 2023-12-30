import React, { useState, useEffect } from 'react';
import styles from '../../styles/Receipt.module.css';

const Receipt = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);
  let totalPrice = 0; // Atur nilai default untuk totalPrice

  if (typeof window !== 'undefined') {
    totalPrice = localStorage.getItem('totalPrice'); // Ambil nilai totalPrice langsung dari localStorage jika berada di lingkungan klien
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const customerName = localStorage.getItem('customerName');
      const customerPhone = localStorage.getItem('customerPhone');

      setOrderDetails({ customerName, customerPhone });

      const storedOrderedItems = localStorage.getItem('cartItems');
      if (storedOrderedItems) {
        setOrderedItems(JSON.parse(storedOrderedItems));
      }
    }
  }, []);

  return (
    <div className={styles.receiptContainer}>
      <h2 className={styles.receiptHeading}>RECEIPT</h2>
      <div className={styles.customerInfo}>
        <p>Customer Name: {orderDetails.customerName}</p>
        <p>Phone: {orderDetails.customerPhone}</p>
      </div>
      <div className={styles.orderedItemsList}>
        <h3>Ordered Items:</h3>
        <ul>
          {orderedItems && orderedItems.length > 0 ? (
            orderedItems.map((item) => (
              <li key={item.menuId} className={styles.orderItem}>
                <img src={item.menuImage} alt={item.menuName} className={styles.menuImage} />
                <div className={styles.orderItemDetails}>
                  <h4 className={styles.orderItemName}>{item.menuName}</h4>
                  <p className={styles.orderItemQuantity}>Qty: {item.quantity}</p>
                  <p className={styles.orderItemPrice}>Total Price: Rp {totalPrice}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No items available</p>
          )}
        </ul>
      </div>
      <div className={styles.thanksMessage}>
        <p className={styles.thanksText}>THANKS</p>
        <p className={styles.enjoyText}>ENJOY YOUR MEAL</p>
      </div>
    </div>
  );
};

export default Receipt;
