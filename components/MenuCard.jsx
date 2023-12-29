import React, { useState, useEffect } from 'react';
import styles from "../styles/MenuCard.module.css";

const MenuCard = () => {
  const API_REQ_LINK = "http://localhost:8080/api/v1/menu";
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(API_REQ_LINK, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className={styles.container}>
        {menuItems.map(item => (
        <div key={item.menuId} className={styles.menuItem}>
          <img src={item.menuImage} alt={item.menuName} />
          <div className={styles.itemInfo}>
            <h3 className={styles.title}>{item.menuName}</h3>
            <span className={styles.price}>Price: Rp {item.menuPrice}</span>
          </div>
        </div>
    ))}
    </div>
  );
};

export default MenuCard;
