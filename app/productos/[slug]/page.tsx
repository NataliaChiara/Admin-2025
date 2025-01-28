import { getProduct } from "@/app/api/api"
import s from './page.module.css'
import Link from "next/link"
import FormProduct from "@/components/FormProduct"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const product = await getProduct(slug)
  return (
    <div className={s.page}>
      <nav className={s.page__nav}>
        <Link href='/'>Homepage</Link>
        <Link href='/productos'>Productos</Link>
      </nav>
      <main className={s.page__main}>
        <FormProduct productToUpdate={product} />
      </main>
    </div>
  )
}