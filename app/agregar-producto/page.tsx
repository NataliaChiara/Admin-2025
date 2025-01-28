'use client'

import s from "./page.module.css";
import Link from "next/link";
import FormProduct from "@/components/FormProduct";
import { useState, useEffect } from "react";
import { getSections } from "../api/api";

export default function AgregarProducto() {
  const [sections, setSections] = useState<{ section: string }[]>([])

  const fetchProducts = async () => {
    try {
      const s = await getSections()
      setSections(s.sections)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={s.page}>
      <nav className={s.page__nav}>
        <Link href='/'>Homepage</Link>
        <Link href='/productos'>Productos</Link>
      </nav>
      <main className={s.page__main}>
        <FormProduct sections={sections} fetchProducts={fetchProducts} />
      </main>
    </div>
  );
}
