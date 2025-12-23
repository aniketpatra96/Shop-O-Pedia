interface Product {
  id?: string
  name: string
  description: string
  price: number
  salePrice: number | null
  tags: string[]
  isBestSeller: boolean
  category: string
  image: string
}

interface ProductFormData {
  name: string
  description: string
  price: number
  salePrice: number | null
  tags: string
  isBestSeller: boolean
  category: string
  image: string
}

export type { Product, ProductFormData }
