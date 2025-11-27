// Product Types for E-commerce functionality
export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  tags: string[]
  sku: string
  weight: number
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
  minimumOrderQuantity: number
  reviews: Review[]
  meta: ProductMeta
  dimensions: ProductDimensions
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface ProductMeta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface ProductDimensions {
  width: number
  height: number
  depth: number
}

// API Response Types
export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface ProductCategory {
  slug: string
  name: string
  url: string
}

// Search and Filter Types
export interface ProductFilters {
  category: string | null
  minPrice: number | null
  maxPrice: number | null
  brand: string | null
  sortBy: ProductSortOption
  search: string
}

export type ProductSortOption = 
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc'
  | 'name-desc'

// Cart Types
export interface CartItem {
  id: number
  product: Product
  quantity: number
  selectedOptions?: Record<string, string>
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  discountedTotal: number
  savings: number
}

// UI State Types
export interface ProductListState {
  products: Product[]
  filteredProducts: Product[]
  categories: ProductCategory[]
  filters: ProductFilters
  loading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string | null
  priceRange: [number, number]
  hasMore: boolean
  currentPage: number
}

export interface ProductDetailModalState {
  isOpen: boolean
  selectedProduct: Product | null
  selectedImageIndex: number
  loading: boolean
  error: string | null
}

// API Error Types
export interface ApiError {
  message: string
  status?: number
  code?: string
}