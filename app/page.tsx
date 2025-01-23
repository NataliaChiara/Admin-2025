// import Image from "next/image";
import FormProduct from "@/components/FormProduct";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FormProduct />
      </main>
      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}
