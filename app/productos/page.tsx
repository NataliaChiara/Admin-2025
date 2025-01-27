'use client'
import { sections } from "@/lib/data";
import s from "./page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import CardProduct from "@/components/CardProduct";
import { getProducts } from "../api/api";
import { ProductType } from "@/types/model";

export default function Productos() {
  const [selectedSection, setSelectedSection] = useState(sections[0].slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={s.page}>
      <nav className={s.page__nav}>
        <Link href="/">Homepage</Link>
        <Link href="/productos" className={s.page__nav__selected}>Productos</Link>
      </nav>
      <main className={s.page__main}>
        <ul className={s.page__main__sections}>
          {sections.map((item) => {
            const { slug, name } = item;
            return (
              <li
                key={slug}
                onClick={() => setSelectedSection(slug)}
                className={selectedSection === slug ? s.page__main__sections__selected : undefined}
              >
                {name}
              </li>
            );
          })}
        </ul>
        <div className={s.page__main__body}>
          <a className={s.page__main__body__add} href="/agregar-producto">Agregar producto</a>
          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            <div className={s.page__main__body__products}>
              {products.length >= 1 && products.map((item: ProductType) => {
                if (selectedSection === item.sectionSlug) {
                  return (
                    <CardProduct key={item.slug} {...item} />
                  )
                }
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
