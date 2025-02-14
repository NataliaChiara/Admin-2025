'use client'

import FrontendLayout from "@/components/FrontendLayout";
import s from "./page.module.css";
import FormProduct from "@/components/FormProduct";
import { generatePageTitle } from "@/lib/generatePageTitle";

export default function AgregarProducto() {

  generatePageTitle('Agregar Producto')

  return (
    <FrontendLayout>
      <div className={s.page}>
        <FormProduct />
      </div>
    </FrontendLayout>
  );
}
