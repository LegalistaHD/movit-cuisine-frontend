import Link from 'next/link';
import styles from '../styles/MenuList.module.css';
import PizzaCard from './MenuCard';

const MenuList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MOVIT CUISINE</h1>
      <h2 className={styles.desc}>
        Menu Online Via Internet
        <br />
        No.1 Best Online Menu Website
      </h2>
      
      <div className={styles.buttonWrapper}>
        <Link href="/book/[id]" as="/book/1" passHref>
          <div className={styles.button}>Go to Book</div>
        </Link>
        <Link href="/order/[id]" as="/order/1" passHref>
          <div className={styles.button}>Go to Order</div>
        </Link>
      </div>
  
      <div className={styles.wrapper}>
          <PizzaCard />
          <PizzaCard />
          <PizzaCard />
          <PizzaCard />
          <PizzaCard />
          <PizzaCard />
          <PizzaCard />
          <PizzaCard />
      </div>
      
    </div>
  );
};

export default MenuList;
