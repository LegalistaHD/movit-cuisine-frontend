import Image from "next/image";
import { useState } from "react";
import Sidebar from "./Sidebar";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={styles.container}>
      {/* Left Navbar */}
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/movitlogo.png" alt="" width="30" height="30" />
        </div>
        <div className={styles.texts}>
          MOVIT CUISINE
        </div>
      </div>
      
      {/* Right Navbar */}
      <div className={styles.item}>
        <div className={styles.menubar} onClick={toggleSidebar}>
          <Image src="/img/Frame 7.png" alt="" width="30" height="30" />
        </div>
        {/* ... */}
      </div>

      {/* Menyertakan komponen Sidebar dan mengirim properti */}
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
