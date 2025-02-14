import { getProduct } from "@/app/api/api";
import s from "./page.module.css";
import FormProduct from "@/components/FormProduct";
import FrontendLayout from "@/components/FrontendLayout";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Actualizar ${params.slug}`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  return (
    <FrontendLayout>
      <div className={s.page}>
        <FormProduct productToUpdate={product} />
      </div>
    </FrontendLayout>
  );
}
