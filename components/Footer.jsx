import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR PLACES</h1>
          <p className={styles.text}>
            21 Canggu Avenue.
            <br /> Bali, 80225
            <br /> (0361) 888-888
          </p>
          <p className={styles.text}>
            700x Renon Square.
            <br /> Bali, 80225
            <br /> (602) 867-1011
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY - FRIDAY
            <br /> 09:00 – 00:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 10:00 – 03:00
          </p>
        </div>
  
      </div>
  );
};

export default Footer;
