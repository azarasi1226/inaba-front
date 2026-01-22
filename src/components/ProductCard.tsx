import Image from "next/image"
import type { Product } from "@/app/products/page"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card>
      <CardContent>
        <Image
          src={product.imageUrl ?? "/no-image.png"}
          width={300}
          height={300}
          alt={product.name}
        />
        <CardTitle>{product.name}</CardTitle>
        <p>{product.price}円</p>
      </CardContent>
    </Card>
  )
}

export default ProductCard
