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

  const response = await fetch('http://localhost:8082/api/products?likeProductName=&pageSize=10&pageNumber=1&sortCondition=PRICE_ASC');

  if(!response.ok) {
    return <div>データの取得に失敗しました</div>
  }

  const products: ProductsResponse = await response.json();

  return (
    <>
      <h1 className="text-2xl font-bold">商品一覧</h1>
      {products.page.items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
)
}

export default ProductsPage;
