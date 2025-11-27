// Import product types
import type {
  CartItem,
  Product,
  ProductCategory,
  ProductDetailModalState,
  ProductFilters
} from './product.types'

// Redux Store Configuration Types
export interface AppState {
  products: ProductState
  cart: CartState
  ui: UIState
}

export interface ProductState {
  entities: Record<number, Product>
  ids: number[]
  categories: ProductCategory[]
  currentFilters: ProductFilters
  searchResults: number[]
  loading: boolean
  error: string | null
  pagination: {
    currentPage: number
    totalPages: number
    pageSize: number
    total: number
  }
}

export interface CartState {
  items: CartItem[]
  totalQuantity: number
  subtotal: number
  discount: number
  tax: number
  total: number
  isOpen: boolean
  lastAddedItem: CartItem | null
}

export interface UIState {
  modals: {
    productDetail: ProductDetailModalState
    cart: boolean
    filters: boolean
  }
  layout: {
    sidebarOpen: boolean
    gridView: boolean
  }
  notifications: UINotification[]
}

export interface UINotification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
  timestamp: number
}

// Action Types
export interface ProductAction {
  type: string
  payload?: any
}

export interface CartAction {
  type: string
  payload?: any
}

// Selector Types
export interface ProductSelectors {
  selectAllProducts: (state: AppState) => Product[]
  selectProductById: (state: AppState, id: number) => Product | undefined
  selectFilteredProducts: (state: AppState) => Product[]
  selectProductCategories: (state: AppState) => ProductCategory[]
  selectCartItems: (state: AppState) => CartItem[]
  selectCartTotal: (state: AppState) => number
}

// Re-export product types for convenience
export type {
  ApiError, Cart, CartItem, Product,
  ProductCategory, ProductDetailModalState, ProductDimensions, ProductFilters, ProductListState, ProductMeta, ProductSortOption, ProductsResponse, Review
} from './product.types'
