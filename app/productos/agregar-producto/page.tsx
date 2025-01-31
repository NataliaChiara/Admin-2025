'use client'

import s from "./page.module.css";
import Link from "next/link";
import FormProduct from "@/components/FormProduct";

export default function AgregarProducto() {


  return (
    <div className={s.page}>
      <nav className={s.page__nav}>
        <Link href='/'>Homepage</Link>
        <Link href='/productos'>Productos</Link>
      </nav>
      <main className={s.page__main}>
        <FormProduct />
      </main>
    </div>
  );
}
