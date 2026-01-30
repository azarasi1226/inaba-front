"use client"

import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ProductSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSearch = searchParams.get("search") ?? ""

  const search = (query: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set("search", query)
    } else {
      params.delete("search")
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = (formData.get("search") as string)?.trim() ?? ""
    search(query)
  }

  const handleClear = () => {
    search("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md gap-2">
      <div className="relative flex-1">
        <Input
          key={currentSearch}
          name="search"
          type="text"
          defaultValue={currentSearch}
          placeholder="商品名で検索"
        />
        {currentSearch && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit" variant="outline" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}

export default ProductSearch
