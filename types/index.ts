export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  category: string
  subcategory: string
  images: string[]
  description: string
  sizes?: string[]
  colors: string[]
  inStock: boolean
  isNew: boolean
  isSale: boolean
}

export interface Category {
  id: string
  name: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}
