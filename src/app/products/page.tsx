import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import ProductSearch from "@/components/ProductSearch"
import { buttonVariants } from "@/components/ui/button"

export type Product = {
  id: string
  name: string
  imageUrl?: string
  price: number
  quantity: number
}
type Paging = {
  totalCount: number
  totalPage: number
  pageSize: number
  pageNumber: number
}
type ProductsResponse = {
  page: {
    items: Product[]
    paging: Paging
  }
}

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string
  }>
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082"

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams
  const search = params.search ?? ""
  const response = await fetch(
    `${API_BASE_URL}/api/products?likeProductName=${encodeURIComponent(search)}&pageSize=100&pageNumber=1&sortCondition=PRICE_ASC`,
  )

  if (!response.ok) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="text-xl font-bold">データの取得に失敗しました</h2>
        <p className="text-gray-600">しばらく時間をおいて再度お試しください。</p>
        <a href="/products" className={buttonVariants()}>
          もう一度試す
        </a>
      </div>
    )
  }

  const data: ProductsResponse = await response.json()

  return (
    <div className="px-16 py-8">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>

      <div className="mb-6">
        <Suspense fallback={<div>読み込み中...</div>}>
          <ProductSearch />
        </Suspense>
      </div>

      {data.page.items.length > 0 ? (
        <>
          <p className="text-sm text-gray-600 mb-4">
            {data.page.paging.totalCount}件の商品が見つかりました
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {data.page.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[30vh]">
          <p className="text-gray-600">該当する商品が見つかりませんでした</p>
        </div>
      )}
    </div>
  )
}

export default ProductsPage
