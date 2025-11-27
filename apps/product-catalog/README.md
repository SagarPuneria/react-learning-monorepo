# Product Catalog - Modern E-commerce Application

A full-featured product catalog and shopping cart application built with **Redux Toolkit**, **RTK Query**, **RSuite UI**, and **Tailwind CSS**. This application demonstrates enterprise-level state management, API integration, and modern React development patterns.

## 🚀 Features

### Product Browsing

- ✅ **Grid & List Views** - Toggle between grid and list layouts
- ✅ **Product Cards** - Beautiful product cards with images, pricing, and ratings
- ✅ **Product Details** - Modal view with comprehensive product information
- ✅ **Lazy Loading** - Efficient loading of product images
- ✅ **Responsive Design** - Mobile-first responsive layout

### Search & Filtering

- ✅ **Real-time Search** - Search across product names and descriptions
- ✅ **Debounced Input** - Optimized search with 300ms debounce
- ✅ **Category Filter** - Filter by product categories (dropdown)
- ✅ **Brand Filter** - Filter by brand names (searchable dropdown)
- ✅ **Price Range** - Slider-based price filtering with min/max inputs
- ✅ **Active Filters** - Visual display of applied filters with clear options
- ✅ **Sort Options** - Multiple sorting options (price, rating, name)

### Shopping Cart

- ✅ **Add to Cart** - Quick add from product cards
- ✅ **Quantity Management** - Increment/decrement product quantities
- ✅ **Remove Items** - Easy item removal from cart
- ✅ **Discount Calculations** - Automatic discount price calculations
- ✅ **Cart Summary** - Subtotal, savings, tax, and total calculations
- ✅ **Cart Persistence** - Cart saved to localStorage
- ✅ **Cart Drawer** - Slide-out cart with smooth animations
- ✅ **Empty Cart** - Clear all items with confirmation

### User Experience

- ✅ **Toast Notifications** - Success/error messages for user actions
- ✅ **Loading States** - Skeleton loaders and spinners
- ✅ **Error Handling** - Graceful error states with retry options
- ✅ **Animations** - Smooth transitions and micro-interactions
- ✅ **Keyboard Navigation** - Full keyboard accessibility
- ✅ **Collapsible Filters** - Accordion-style filter sections

## 🏗️ Architecture

### State Management (Redux Toolkit)

#### Store Structure

```
store/
├── store.ts              # Store configuration
├── hooks.ts             # Typed hooks (useAppDispatch, useAppSelector)
├── selectors.ts         # Memoized selectors with Reselect
├── slices/
│   ├── cartSlice.ts     # Shopping cart state
│   ├── filtersSlice.ts  # Filters state
│   └── uiSlice.ts       # UI state (modals, sidebar)
└── services/
    └── productsApi.ts   # RTK Query API endpoints
```

#### Slices

**Cart Slice** (`cartSlice.ts`)

- Manages shopping cart items
- Calculates subtotal, tax, discounts, and totals
- Handles add/remove/update operations
- Persists cart to localStorage
- Tracks last added item for notifications

**Filters Slice** (`filtersSlice.ts`)

- Manages product filtering state
- Controls category, brand, price range, and search
- Handles sorting options
- Tracks available categories and brands from API

**UI Slice** (`uiSlice.ts`)

- Controls sidebar visibility (filters)
- Manages cart drawer open/close state
- Handles product detail modal
- Manages view toggle (grid/list)
- Controls notification queue

#### RTK Query API

**Products API** (`productsApi.ts`)

- RESTful API integration with DummyJSON
- Endpoints:
  - `getProducts` - Fetch all products with pagination and search
  - `getProductsByCategory` - Fetch products by category
  - `getProductById` - Fetch single product details
  - `getCategories` - Fetch all available categories
- Automatic caching and cache invalidation
- Built-in loading and error states
- Request deduplication

### Components Architecture

```
components/
├── AppHeader.tsx            # Top navigation bar
├── SearchBar.tsx           # Search input with debounce
├── FiltersSidebar.tsx      # Filter controls (category, price, brand, sort)
├── ProductGrid.tsx         # Product display (grid/list)
├── ProductCard.tsx         # Individual product card
├── ProductDetailModal.tsx  # Product detail view
├── ShoppingCart.tsx        # Cart drawer
└── NotificationContainer.tsx # Toast notifications
```

### Data Flow

```
User Interaction
      ↓
   Component
      ↓
Dispatch Action → RTK Query/Slice
      ↓
State Update
      ↓
   Selectors (Memoized)
      ↓
Component Re-render
```

### Key Patterns

1. **Memoized Selectors** - Using Reselect to prevent unnecessary re-renders
2. **Normalized State** - Flat state structure for easy updates
3. **Optimistic Updates** - Immediate UI feedback before API confirmation
4. **Error Boundaries** - Graceful error handling at component level
5. **Code Splitting** - Lazy loading of components and routes
6. **TypeScript** - Full type safety across the application

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - Latest React features and performance improvements
- **TypeScript 5.9** - Full type safety and IntelliSense
- **Vite 7** - Lightning-fast build tool and dev server
- **Nx Monorepo** - Enterprise-grade monorepo management

### State Management

- **Redux Toolkit 2.11** - Modern Redux with minimal boilerplate
- **RTK Query** - Powerful data fetching and caching
- **Reselect** - Memoized selectors for performance
- **React Redux 9.1** - Official React bindings

### UI & Styling

- **RSuite** - Enterprise-grade React UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom Animations** - CSS animations and transitions
- **Responsive Grid** - Mobile-first responsive design

### External API

- **DummyJSON API** - Mock REST API for product data
- **API Endpoints**:
  - `GET /products` - All products
  - `GET /products/search?q=query` - Search products
  - `GET /products/category/:category` - Products by category
  - `GET /products/:id` - Single product
  - `GET /products/categories` - All categories

### Utilities & Tools

- **LocalStorage API** - Cart persistence
- **Debounce** - Search optimization
- **Date-fns** - Date formatting (if needed)
- **Shared Libraries** - Monorepo shared utilities and types

## 📦 Installation

```bash
# Install dependencies (from monorepo root)
npm install

# Start development server
npx nx serve product-catalog
```

The application will be available at `http://localhost:4200`

## 🎯 Key Features Breakdown

### 1. Advanced Filtering System

**Category Filter**

- Dropdown select with all available categories
- Searchable dropdown for quick access
- "All Categories" option to clear filter

**Price Range Filter**

- Dual-handle range slider
- Min/Max input fields for precise values
- Real-time price range display
- Formatted currency display

**Brand Filter**

- Searchable dropdown with all brands
- Auto-populated from product data
- "All Brands" option to clear filter

**Sort Options**

- Default (unsorted)
- Price: Low to High
- Price: High to Low
- Highest Rated
- Name: A to Z
- Name: Z to A

### 2. Shopping Cart Features

**Cart Operations**

- Add item with animated notification
- Update quantity with +/- buttons
- Remove individual items
- Clear entire cart with confirmation
- View cart details in drawer

**Cart Calculations**

- Subtotal: Sum of all items (original prices × quantity)
- Discount: Total savings from discounted items
- Tax: 8% tax on subtotal
- Total: Final amount (subtotal + tax)

**Cart Persistence**

- Automatically saved to localStorage
- Restored on page reload
- Synced across browser tabs

### 3. Product Display

**Grid View**

- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop
- 4 columns on large screens
- Card-based layout with hover effects

**List View**

- Single column layout
- Horizontal product cards
- More detailed information
- Larger product images

**Product Card**

- Product image with fallback
- Title and description
- Original and discounted prices
- Discount percentage badge
- Star rating display
- Stock availability
- Quick add to cart button
- View details button

### 4. Search Functionality

**Search Features**

- Real-time search as you type
- 300ms debounce for performance
- Searches across: product names, descriptions, brands
- Clear search button
- Search term highlighting (optional)
- No results state with suggestions

**Search Bar UI**

- Large, prominent search input
- Search icon indicator
- Clear button when text present
- Keyboard shortcuts (Cmd/Ctrl + K)
- Focus states and accessibility

## 🎨 UI Components (RSuite)

### Layout Components

- `Container` - Main layout container
- `Header` - Top app bar
- `Sidebar` - Collapsible filter sidebar
- `Content` - Main content area

### Form Components

- `SelectPicker` - Dropdown selects for filters
- `Input` - Text inputs for search
- `InputNumber` - Number inputs for price
- `RangeSlider` - Dual-handle price slider

### Display Components

- `Panel` - Card containers for products
- `Badge` - Notification badges
- `Tag` - Filter tags and categories
- `Divider` - Visual separators
- `IconButton` - Icon-only buttons

### Feedback Components

- `Drawer` - Slide-out cart panel
- `Modal` - Product detail overlay
- `Message` / `toaster` - Toast notifications
- `Loader` - Loading spinners
- `Placeholder` - Skeleton loaders

## 💾 State Structure

### Cart State

```typescript
{
  items: CartItem[],
  totalQuantity: number,
  subtotal: number,
  discount: number,
  tax: number,
  total: number,
  isOpen: boolean,
  lastAddedItem: CartItem | null,
  taxRate: number
}
```

### Filters State

```typescript
{
  filters: {
    category: string | null,
    minPrice: number | null,
    maxPrice: number | null,
    brand: string | null,
    sortBy: ProductSortOption,
    search: string
  },
  priceRange: {
    min: number,
    max: number,
    current: [number, number]
  },
  availableCategories: string[],
  availableBrands: string[]
}
```

### UI State

```typescript
{
  sidebarOpen: boolean,
  cartOpen: boolean,
  selectedProductId: number | null,
  viewMode: 'grid' | 'list',
  notifications: Notification[]
}
```

## 🔧 Project Structure

```
apps/product-catalog/
├── src/
│   ├── app/
│   │   ├── app.tsx                    # App wrapper with Redux Provider
│   │   ├── ProductCatalogApp.tsx      # Main app component
│   │   ├── components/
│   │   │   ├── AppHeader.tsx          # Navigation header
│   │   │   ├── FiltersSidebar.tsx     # Filter controls
│   │   │   ├── SearchBar.tsx          # Search input
│   │   │   ├── ProductGrid.tsx        # Products display
│   │   │   ├── ShoppingCart.tsx       # Cart drawer
│   │   │   ├── ProductDetailModal.tsx # Product details
│   │   │   └── NotificationContainer.tsx # Toasts
│   │   └── store/
│   │       ├── store.ts               # Redux store config
│   │       ├── hooks.ts               # Typed hooks
│   │       ├── selectors.ts           # Memoized selectors
│   │       ├── slices/
│   │       │   ├── cartSlice.ts       # Cart state
│   │       │   ├── filtersSlice.ts    # Filters state
│   │       │   └── uiSlice.ts         # UI state
│   │       └── services/
│   │           └── productsApi.ts     # RTK Query API
│   ├── main.tsx                       # App entry point
│   └── styles.css                     # Global styles + Tailwind
├── index.html                         # HTML template
├── vite.config.ts                     # Vite configuration
├── tsconfig.json                      # TypeScript config
└── README.md                          # This file
```

## 🚦 Running the Application

### Development Mode

```bash
# From monorepo root
npx nx serve product-catalog
```

### Production Build

```bash
npx nx build product-catalog
```

### Preview Production Build

```bash
npx nx preview product-catalog
```

## 🎓 Learning Outcomes

This project demonstrates:

1. **Redux Toolkit Best Practices**
   - Slice-based state management
   - RTK Query for API calls
   - Memoized selectors for performance
   - Proper TypeScript integration

2. **Performance Optimization**
   - Debounced search inputs
   - Memoized selectors with Reselect
   - Component lazy loading
   - Image lazy loading
   - Request caching with RTK Query

3. **State Management Patterns**
   - Normalized state structure
   - Derived state calculations
   - Optimistic UI updates
   - Persistent state (localStorage)

4. **Modern React Patterns**
   - Hooks-based components
   - Custom hooks for reusability
   - Compound components
   - Render props pattern

5. **API Integration**
   - RESTful API consumption
   - Error handling strategies
   - Loading states management
   - Cache invalidation

6. **UI/UX Best Practices**
   - Responsive design
   - Accessibility (ARIA labels)
   - Loading states
   - Error boundaries
   - Toast notifications
   - Smooth animations

## 🌟 Highlights

- **Zero Backend Setup** - Uses public DummyJSON API
- **Type-Safe Throughout** - Full TypeScript coverage
- **Production-Ready** - Enterprise patterns and best practices
- **Highly Performant** - Optimized re-renders and API calls
- **Fully Responsive** - Mobile, tablet, and desktop support
- **Modern UI** - Clean, professional design with RSuite + Tailwind
- **Maintainable** - Well-structured, documented code

## 📚 Additional Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [RSuite Documentation](https://rsuitejs.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [DummyJSON API Docs](https://dummyjson.com/docs)
- [React 19 Documentation](https://react.dev/)

## 🐛 Troubleshooting

### Common Issues

**Cart not persisting:**

- Check localStorage is enabled in browser
- Clear localStorage and reload: `localStorage.clear()`

**Products not loading:**

- Check internet connection
- Verify DummyJSON API is accessible
- Check browser console for errors

**Filters not working:**

- Ensure categories are loaded from API
- Check Redux DevTools for state updates

**Styles not loading:**

- Run `npm install` to ensure all dependencies
- Check Tailwind CSS is properly configured

---

**Built with ❤️ as a demonstration of modern e-commerce architecture**

**Port**: 4204
**Status**: ✅ Complete and production-ready
