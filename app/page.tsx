import FormProduct from "@/components/FormProduct";
import s from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={s.page}>
      <nav className={s.page__nav}>
        <Link href='/' className={s.page__nav__selected}>Homepage</Link>
        <Link href='/productos'>Productos</Link>
        <Link href='/agregar-productos'>Agregar productos</Link>
      </nav>
      <main className={s.main}>
        <FormProduct />
      </main>
    </div>
  );
}
