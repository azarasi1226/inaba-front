import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import type { Product } from "@/app/products/page"

type ProductCardProps = {
  product: Product
}

const ProductCard = ( { product }: ProductCardProps ) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.id} - {product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={product.imageUrl ?? ""}
          width={500}
          height={500}
          alt="Picture of the product"
        />
      </CardContent>
    </Card>
  )
}

export default ProductCard;
