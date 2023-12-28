// components/Order.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/Order.module.css';
import { useRouter } from 'next/router';


const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const addToCart = (item) => {
    const updatedCart = [...cartItems];
  
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }
  
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart); // Simpan item ke localStorage
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
      if (item.id === itemId && item.quantity > 0) {
        const updatedQuantity = item.quantity - 1;
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    }).filter((item) => item.quantity !== 0); // Menghapus item dengan kuantitas 0
  
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      console.log("Stored Cart Items:", JSON.parse(storedCartItems));
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  
  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    console.log("Cart Items saved to localStorage:", cart);
  };

  const handleAddToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const handleCartClick = () => {
    router.push('/cart/CartPage');
  };

  const menuItems = [
    { id: 1, name: 'Sentana Burger', price: 50000, image: 'sentana.png' },
    { id: 2, name: 'Ogaden Burger', price: 90000, image: 'ogaden.png' },
    { id: 3, name: 'Sena Breadless Burger', price: 30000, image: 'breadless.png' },
    // ...other menu items
  ];

  const filteredMenuItems = searchTerm
    ? menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : menuItems;

  return (
    <div className={styles.orderContainer}>
      <header className={styles.header}>
        <h1 className={styles.orderHeading}>ORDER</h1>
        <input
          type="text"
          placeholder="Search for a menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </header>
      <main>
        <section className={styles.items}>
        {filteredMenuItems.map((item) => (
          <div key={item.id} className={styles.menuItem}>
            <img src={`/img/${item.image}`} alt={item.name} />
            <div className={styles.itemInfo}>
              <h3>{item.name}</h3>
              <p>Price: Rp {item.price.toLocaleString()}</p>
              {cartItems.find((cartItem) => cartItem.id === item.id && (cartItem.quantity !== null && cartItem.quantity !== undefined)) ? (
                <div className={styles.quantityController}>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className={`${styles.quantityButton} ${styles.decreaseButton}`}
                  >
                    -
                  </button>
                  <div className={styles.quantity}>
                    {cartItems.find((cartItem) => cartItem.id === item.id).quantity}
                  </div>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button onClick={() => addToCart(item)} className={styles.addButton}>
                  Add to Cart
                </button>
                )}
            </div>
          </div>
        ))}
        </section>
      </main>
      <footer>
      <button className={styles.cartButton} onClick={handleCartClick}>
          <img src="/img/cart.png" alt="Cart" className={styles.cartIcon} />
      </button>
      </footer>
    </div>
  );
};
export default Order;
