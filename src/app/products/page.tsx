import ProductCard from "@/components/ProductCard"

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

const ProductsPage = async () => {
  const response = await fetch(
    "http://localhost:8082/api/products?likeProductName=&pageSize=10&pageNumber=1&sortCondition=PRICE_ASC",
  )

  if (!response.ok) {
    return <div>データの取得に失敗しました</div>
  }

  const products: ProductsResponse = await response.json()

  return (
    <div className="px-16 py-8">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>

      <div className="flex gap-8">
        <aside className="w-64">ToDo：フィルター</aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {products.page.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProductsPage
