import Head from "next/head";
import Link from "next/link";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Movit Cuisine</title>
        <meta name="description" content="Best burger shop in town" />
        <link rel="icon" href="/img/movitlogo.png" />
      </Head>

      <Featured />
      <PizzaList />
    </div>
  );
}
