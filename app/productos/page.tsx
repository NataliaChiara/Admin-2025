'use client'
import { sections } from "@/lib/data";
import s from "./page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import CardProduct from "@/components/CardProduct";
import { getProducts } from "../api/api";
import { ProductType } from "@/types/model";
import { deleteProduct } from "../api/api";
import { toast, Toaster } from "react-hot-toast";

export default function Productos() {
  const [selectedSection, setSelectedSection] = useState(sections[0].slug);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);


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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (name: string, slug: string) => {
    try {
      const success = await deleteProduct(slug);
      if (success) {
        toast.success(`Producto "${name}" eliminado con éxito.`);
        fetchProducts()
      } else {
        toast.error(`No se pudo eliminar el producto "${name}".`);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error(`Ocurrió un error al intentar eliminar el producto "${name}".`);
    }
  };

  return (
    <div className={s.page}>
      <Toaster />
      <nav className={s.page__nav}>
        <Link href="/">Homepage</Link>
        <Link href="/productos" className={s.page__nav__selected}>Productos</Link>
      </nav>
      <main className={s.page__main}>
        <div className={s.page__main__sections}>
          <ul className={s.page__main__sections__list}>
            {sections.map((item) => {
              const { slug, name } = item;
              return (
                <li
                  key={slug}
                  onClick={() => setSelectedSection(slug)}
                  className={selectedSection === slug ? s.page__main__sections__list__selected : undefined}
                >
                  {name}
                </li>
              );

            })}
          </ul>
          <a className={s.page__main__sections__add} href="/agregar-producto">Agregar producto</a>

        </div>

        <div className={s.page__main__body}>
          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            <div className={s.page__main__body__products}>
              {products.length > 0 ? (
                products
                  .filter((item) => item.sectionSlug === selectedSection)
                  .length > 0 ? (
                  products
                    .filter((item) => item.sectionSlug === selectedSection)
                    .map((item) => <CardProduct key={item.slug} product={item} handleDelete={handleDelete} />)
                ) : (
                  <p>No se encontraron productos de la categoría {selectedSection}.</p>
                )
              ) : (
                <p>No hay ningun producto disponibles.</p>
              )}
            </div>

          )}
        </div>
      </main>
    </div>
  );
}
