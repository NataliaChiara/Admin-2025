import { getProduct } from "@/app/api/api"
import s from './page.module.css'
import FormProduct from "@/components/FormProduct"
import FrontendLayout from "@/components/FrontendLayout"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const product = await getProduct(slug)
  return (
    <FrontendLayout>
      <div className={s.page}>
        <FormProduct productToUpdate={product} />
      </div>
    </FrontendLayout>

  )
}