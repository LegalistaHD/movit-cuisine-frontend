import React, { useState, useEffect } from 'react';
import styles from '../../styles/Cart.module.css';
import { useRouter } from 'next/router';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const URL_ENDPOINT_API = "http://localhost:8080/api/v1/orders/insert";
  const router = useRouter();

  const processOrder = async () => {
    try {
      const orderItemsData = cartItems.map((item) => ({
        menu: { menuId: item.menuId }, // Assuming you have a way to fetch the Menu entity based on menuId
        quantity: item.quantity,
      }));
  
      const response = await fetch(URL_ENDPOINT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          orderItems: orderItemsData,
        }),
      });
  
      if (response.ok) {
        console.log('berhasil disimpan');
        localStorage.setItem('customerName', name);
        localStorage.setItem('customerPhone', phone);
        localStorage.setItem('totalPrice', totalPrice);
        router.push('/receipt');
      } else {
        throw new Error('Failed to process order');
      }
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };
  

  useEffect(() => {
    // Load cart items from localStorage when the component mounts
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const saveCartToLocalStorage = (item) => {
    localStorage.setItem('cartItems', JSON.stringify(item));
    console.log("Cart Items saved to localStorage:", item);
  };

  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.menuId === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };
  
  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.menuId === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter((item) => item.quantity > 0);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.menuId !== itemId);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.menuPrice * item.quantity,
    0
  );

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeading}>CART</h2>
      <div className={styles.cartItemsList}>
        <input className={styles.inputField} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className={styles.inputField} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        {cartItems.map((item) => (
          <div key={item.menuId} className={styles.cartItem}>
            <img src={item.menuImage} alt={item.menuName} className={styles.cartItemImage} />
            <div className={styles.cartItemDetails}>
              <h3 className={styles.cartItemName}>{item.menuName}</h3>
              <p className={styles.cartItemPrice}>Rp {item.menuPrice ? item.menuPrice.toLocaleString() : 'Not available'}</p>
              <div className={styles.cartItemQuantity}>
                <button onClick={() => decreaseQuantity(item.menuId)}>-</button>
                <span>Qty: {item.quantity}</span>
                <button onClick={() => increaseQuantity(item.menuId)}>+</button>
                <button onClick={() => removeFromCart(item.menuId)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cartTotal}>
        <strong>Total:</strong> Rp {totalPrice.toLocaleString()}
      </div>
      
      <button className={styles.processOrderButton} onClick={processOrder}>
        PROCESS ORDER
      </button>
    </div>
  );
};

export default Cart;
