import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";

const PizzaCard = () => {
  return (
    <div className={styles.container}>
      <Image src="/img/pngwing 1.png" alt="" width="300" height="300" />
      <h1 className={styles.title}>SENTANA BURGER</h1>
      <span className={styles.price}>Rp 50.000,00</span>
    </div>
  );
};

export default PizzaCard;
