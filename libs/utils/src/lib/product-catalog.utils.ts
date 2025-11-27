import type {
  Product,
  CartItem,
  ProductFilters,
} from '@react-learning-monorepo/types';

/**
 * Price calculation utilities with discount support
 */

export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
): number => {
  return price - (price * discountPercentage) / 100;
};

export const calculateItemTotal = (
  product: Product,
  quantity: number
): number => {
  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage
  );
  return discountedPrice * quantity;
};

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + calculateItemTotal(item.product, item.quantity);
  }, 0);
};

export const calculateCartSavings = (items: CartItem[]): number => {
  return items.reduce((savings, item) => {
    const originalPrice = item.product.price * item.quantity;
    const discountedPrice = calculateItemTotal(item.product, item.quantity);
    return savings + (originalPrice - discountedPrice);
  }, 0);
};

export const calculateTax = (
  subtotal: number,
  taxRate: number = 0.08
): number => {
  return subtotal * taxRate;
};

export const calculateCartTotal = (
  subtotal: number,
  tax: number,
  shipping: number = 0
): number => {
  return subtotal + tax + shipping;
};

/**
 * Cart operation utilities
 */

export const addToCart = (
  items: CartItem[],
  product: Product,
  quantity: number = 1
): CartItem[] => {
  const existingItem = items.find((item) => item.id === product.id);

  if (existingItem) {
    return items.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [
    ...items,
    {
      id: product.id,
      product,
      quantity,
    },
  ];
};

export const removeFromCart = (
  items: CartItem[],
  productId: number
): CartItem[] => {
  return items.filter((item) => item.id !== productId);
};

export const updateCartItemQuantity = (
  items: CartItem[],
  productId: number,
  quantity: number
): CartItem[] => {
  if (quantity <= 0) {
    return removeFromCart(items, productId);
  }

  return items.map((item) =>
    item.id === productId ? { ...item, quantity } : item
  );
};

export const clearCart = (): CartItem[] => {
  return [];
};

/**
 * Product filtering and search utilities
 */

export const filterProductsByCategory = (
  products: Product[],
  category: string | null
): Product[] => {
  if (!category || category === 'all') {
    return products;
  }

  // Case-insensitive comparison
  const categoryLower = category.toLowerCase();
  return products.filter(
    (product) => product.category?.toLowerCase() === categoryLower
  );
};

export const filterProductsByPrice = (
  products: Product[],
  minPrice: number | null,
  maxPrice: number | null
): Product[] => {
  return products.filter((product) => {
    const price = calculateDiscountedPrice(
      product.price,
      product.discountPercentage
    );
    const passesMin = minPrice === null || price >= minPrice;
    const passesMax = maxPrice === null || price <= maxPrice;
    return passesMin && passesMax;
  });
};

export const filterProductsByBrand = (
  products: Product[],
  brand: string | null
): Product[] => {
  if (!brand || brand === 'all') {
    return products;
  }
  return products.filter((product) => product.brand === brand);
};

export const searchProducts = (
  products: Product[],
  searchQuery: string
): Product[] => {
  if (!searchQuery?.trim()) {
    return products;
  }

  const query = searchQuery.toLowerCase();
  return products.filter((product) => {
    const title = product.title?.toLowerCase() || '';
    const description = product.description?.toLowerCase() || '';
    const category = product.category?.toLowerCase() || '';
    const brand = product.brand?.toLowerCase() || '';
    const tags = product.tags || [];

    return (
      title.includes(query) ||
      description.includes(query) ||
      category.includes(query) ||
      brand.includes(query) ||
      tags.some((tag) => tag?.toLowerCase().includes(query))
    );
  });
};

export const applyAllFilters = (
  products: Product[],
  filters: ProductFilters
): Product[] => {
  console.log(
    'applyAllFilters START - products:',
    products.length,
    'filters:',
    filters
  );

  // Log first product to see its structure
  if (products.length > 0) {
    console.log('First product:', products[0]);
  }

  let filteredProducts = products;

  // Apply category filter
  filteredProducts = filterProductsByCategory(
    filteredProducts,
    filters.category
  );

  // Apply price range filter
  filteredProducts = filterProductsByPrice(
    filteredProducts,
    filters.minPrice,
    filters.maxPrice
  );

  // Apply brand filter
  filteredProducts = filterProductsByBrand(filteredProducts, filters.brand);

  // Apply search filter
  filteredProducts = searchProducts(filteredProducts, filters.search);

  console.log('applyAllFilters END - result:', filteredProducts.length);

  return filteredProducts;
};

/**
 * Product sorting utilities
 */

export const sortProducts = (
  products: Product[],
  sortBy: string
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => {
        const priceA = calculateDiscountedPrice(a.price, a.discountPercentage);
        const priceB = calculateDiscountedPrice(b.price, b.discountPercentage);
        return priceA - priceB;
      });

    case 'price-desc':
      return sorted.sort((a, b) => {
        const priceA = calculateDiscountedPrice(a.price, a.discountPercentage);
        const priceB = calculateDiscountedPrice(b.price, b.discountPercentage);
        return priceB - priceA;
      });

    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);

    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case 'default':
    default:
      return sorted;
  }
};

/**
 * Format utilities
 */

export const formatPrice = (
  price: number,
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
};

export const formatDiscount = (discountPercentage: number): string => {
  return `${Math.round(discountPercentage)}% OFF`;
};

export const formatRating = (rating: number): string => {
  return `★ ${rating.toFixed(1)}`;
};

/**
 * Local storage utilities
 */

export const saveCartToStorage = (items: CartItem[]): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('product-catalog-cart', JSON.stringify(items));
    }
  } catch (error) {
    console.warn('Failed to save cart to localStorage:', error);
  }
};

export const loadCartFromStorage = (): CartItem[] => {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('product-catalog-cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  } catch (error) {
    console.warn('Failed to load cart from localStorage:', error);
    return [];
  }
};

export const clearCartFromStorage = (): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('product-catalog-cart');
    }
  } catch (error) {
    console.warn('Failed to clear cart from localStorage:', error);
  }
};

/**
 * Debounce utility for search input
 */

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
