import React, { useState, useEffect } from 'react';
import styles from '../../styles/Cart.module.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage when the component mounts
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const saveCartToLocalStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };
  
  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter((item) => item.quantity > 0);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeading}>CART</h2>
      <div className={styles.cartItemsList}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={`/img/${item.image}`} alt={item.name} className={styles.cartItemImage} />
            <div className={styles.cartItemDetails}>
              <h3 className={styles.cartItemName}>{item.name}</h3>
              <p className={styles.cartItemPrice}>Rp {item.price.toLocaleString()}</p>
              <div className={styles.cartItemQuantity}>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>Qty: {item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cartTotal}>
        <strong>Total:</strong> Rp {totalPrice.toLocaleString()}
      </div>
      {/* Tambahkan tombol-tombol metode pembayaran */}
      <button className={styles.processOrderButton}>
        PROCESS ORDER
      </button>
    </div>
  );
};

export default Cart;
