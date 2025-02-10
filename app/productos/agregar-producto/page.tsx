'use client'

import FrontendLayout from "@/components/FrontendLayout";
import s from "./page.module.css";
import FormProduct from "@/components/FormProduct";

export default function AgregarProducto() {


  return (
    <FrontendLayout>
      <div className={s.page}>
        <FormProduct />
      </div>
    </FrontendLayout>
  );
}
