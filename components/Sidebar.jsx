import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  return (
    <div className={`${styles.sidebar} ${showSidebar ? styles.show : ''}`}>
      <div className={styles.links}>
        <Link href="/">
          <div onClick={toggleSidebar}>HOME</div>
        </Link>
        <Link href="/book/[id]" as="/book/1">
          <div onClick={toggleSidebar}>BOOK</div>
        </Link>
        <Link href="/order/[id]" as="/order/1">
          <div onClick={toggleSidebar}>ORDER</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
