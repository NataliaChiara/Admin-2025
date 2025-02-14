'use client'
import s from "./page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import CardProduct from "@/components/CardProduct";
import { getProducts, getSections } from "../api/api";
import { ProductType } from "@/types/model";
import { deleteProduct } from "../api/api";
import { toast, Toaster } from "react-hot-toast";
import FrontendLayout from "@/components/FrontendLayout";
import { generatePageTitle } from "@/lib/generatePageTitle";

export default function Productos() {

  generatePageTitle('Productos')

  const [selectedSection, setSelectedSection] = useState('');
  const [sections, setSections] = useState<{ section: string }[]>([])
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    try {
      const p = await getProducts();
      const s = await getSections()
      setProducts(p.products);
      setSections(s.sections)
      setSelectedSection(s.sections[0].section)
    } catch (error) {
      console.error("Error fetching products:", error);
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
    <FrontendLayout>
      <div className={s.container}>
        <Toaster />
        <div className={s.container__sections}>
          <ul className={s.container__sections__list}>
            {selectedSection !== '' && sections.length >= 1 && sections.map((item) => {
              return (
                <li
                  key={item.section}
                  onClick={() => setSelectedSection(item.section)}
                  className={selectedSection === item.section ? s.container__sections__list__selected : undefined}
                >
                  {item.section}
                </li>
              );
            })}
          </ul>
          <Link className={s.container__sections__add} href="/productos/agregar-producto">Agregar producto</Link>
        </div>
        <div className={s.container__products}>
          {products.length > 0 ? (
            (() => {
              const filteredProducts = products.filter(
                (product) => product.section === selectedSection
              );

              if (filteredProducts.length > 0) {
                return (
                  <>
                    {filteredProducts.map((product) => (
                      <CardProduct key={product.slug} product={product} handleDelete={handleDelete} />
                    ))}
                  </>
                );
              } else {
                return <p>No hay productos de la categoría {selectedSection}.</p>;
              }
            })()
          ) : (
            <p>No hay ningún producto disponible.</p>
          )}

        </div>
      </div>
    </FrontendLayout>
  );
}
