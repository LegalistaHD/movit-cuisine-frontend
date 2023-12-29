// components/Order.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/Order.module.css';
import { useRouter } from 'next/router';


const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const API_REQ_LINK = "http://localhost:8080/api/v1/menu";
  const [menuItems, setMenuItems] = useState([]); // State untuk menyimpan data menuItems

  useEffect(() => {
    // Fungsi untuk mengambil data menuItems dari API
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(API_REQ_LINK, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }); // Ganti URL sesuai dengan endpoint API Anda
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const item = await response.json();
        setMenuItems(item); // Menyimpan data menuItems ke state
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    // Panggil fungsi fetchMenuItems saat komponen mount
    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    const updatedCart = [...cartItems];
  
    const existingItem = updatedCart.find((cartItem) => cartItem.menuId === item.menuId);
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
      if (item.menuId === itemId && item.quantity > 0) {
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


  const filteredMenuItems = searchTerm
    ? menuItems.filter((item) =>
        item.menuName.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div key={item.menuId} className={styles.menuItem}>
            <img src={item.menuImage} alt={item.menuName} />
            <div className={styles.itemInfo}>
              <h3>{item.menuName}</h3>
              <p>Price: Rp {item.menuPrice.toLocaleString()}</p>
              {cartItems.find((cartItem) => cartItem.menuId === item.menuId && (cartItem.quantity !== null && cartItem.quantity !== undefined)) ? (
                <div className={styles.quantityController}>
                  <button
                    onClick={() => decreaseQuantity(item.menuId)}
                    className={`${styles.quantityButton} ${styles.decreaseButton}`}
                  >
                    -
                  </button>
                  <div className={styles.quantity}>
                    {cartItems.find((cartItem) => cartItem.menuId === item.menuId).quantity}
                  </div>
                  <button
                    onClick={() => increaseQuantity(item.menuId)}
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
