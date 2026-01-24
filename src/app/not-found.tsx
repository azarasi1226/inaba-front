import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-bold">404 - ページが見つかりません</h2>
      <p className="text-gray-600">お探しのページは存在しないか、移動した可能性があります。</p>
      <Link href="/products" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        商品一覧へ戻る
      </Link>
    </div>
  )
}
