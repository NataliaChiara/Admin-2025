import { getProduct } from "@/app/api/api"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const product = await getProduct(slug)
  return <div>My Post: {product.name}</div>
}