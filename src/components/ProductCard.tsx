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
          src={product.imageUrl ?? "/no-image.png"}
          width={300}
          height={300}
          alt="Picture of the product"
        />
      </CardContent>
    </Card>
  )
}

export default ProductCard;
