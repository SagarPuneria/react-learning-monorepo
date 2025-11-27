import { Panel, Button, Tag, Rate, Loader, Message } from 'rsuite';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectProcessedProducts,
  selectGridView,
  selectItemsPerRow,
  selectCurrentSearch,
  makeSelectIsProductInCart,
} from '../store/selectors';
import {
  useGetProductsQuery,
  useSearchProductsQuery,
} from '../store/services/productsApi';
import { addToCart } from '../store/slices/cartSlice';
import { openProductDetailModal } from '../store/slices/uiSlice';
import {
  formatPrice,
  calculateDiscountedPrice,
} from '@react-learning-monorepo/utils';
import type { Product } from '@react-learning-monorepo/types';

export function ProductGrid() {
  const gridView = useAppSelector(selectGridView);
  const itemsPerRow = useAppSelector(selectItemsPerRow);
  const currentSearch = useAppSelector(selectCurrentSearch);

  // Use search query if there's a search term, otherwise get all products
  const shouldUseSearch = currentSearch.trim().length > 0;

  const { isLoading: isLoadingProducts, error: productsError } =
    useGetProductsQuery(
      {
        limit: 30,
        skip: 0,
      },
      {
        skip: shouldUseSearch,
      }
    );

  const { isLoading: isLoadingSearch, error: searchError } =
    useSearchProductsQuery(
      {
        q: currentSearch,
        limit: 30,
        skip: 0,
      },
      {
        skip: !shouldUseSearch,
      }
    );

  const isLoading = isLoadingProducts || isLoadingSearch;
  const error = productsError || searchError;

  // Apply client-side filtering and sorting
  const processedProducts = useAppSelector(selectProcessedProducts);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader size="lg" content="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <Message type="error" title="Error loading products">
        {error.toString()}
      </Message>
    );
  }

  if (processedProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-500 mb-4">
          <p className="text-xl">No products found</p>
          {currentSearch && <p>Try adjusting your search terms or filters</p>}
        </div>
      </div>
    );
  }

  if (gridView) {
    return (
      <div
        className={`grid gap-4 ${
          itemsPerRow === 1
            ? 'grid-cols-1'
            : itemsPerRow === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : itemsPerRow === 3
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : itemsPerRow === 4
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6'
        }`}
      >
        {processedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="grid grid-cols-2 gap-4">
      {processedProducts.map((product: Product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const isInCartSelector = makeSelectIsProductInCart();
  const isInCart = useAppSelector((state) =>
    isInCartSelector(state, product.id)
  );

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage
  );
  const hasDiscount = product.discountPercentage > 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleViewDetails = () => {
    dispatch(openProductDetailModal(product));
  };

  return (
    <Panel
      className="h-full cursor-pointer card-hover overflow-hidden"
      bordered
      bodyFill
      style={{
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
      }}
    >
      <div onClick={handleViewDetails}>
        {/* Product Image */}
        <div
          className="relative overflow-hidden bg-gray-100"
          style={{ height: '240px' }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
          {hasDiscount && (
            <Tag
              color="red"
              className="absolute top-3 right-3 text-sm font-bold shadow-lg"
            >
              💸 -{Math.round(product.discountPercentage)}%
            </Tag>
          )}
          {product.stock <= 10 && product.stock > 0 && (
            <Tag
              color="orange"
              className="absolute top-3 left-3 text-xs font-semibold"
            >
              ⚠️ Low Stock
            </Tag>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">
            {product.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Rate
                readOnly
                value={product.rating}
                size="xs"
                allowHalf
                color="orange"
              />
              <span className="text-xs font-medium text-gray-600">
                ({product.rating})
              </span>
            </div>

            <Tag color="blue" className="text-xs font-medium px-3 py-1">
              {product.category}
            </Tag>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-indigo-600">
                {formatPrice(discountedPrice)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="px-5 pb-5">
        <Button
          appearance="primary"
          block
          disabled={product.stock === 0 || isInCart}
          onClick={handleAddToCart}
          className="font-semibold text-base transition-all"
          style={{
            borderRadius: '10px',
            padding: '12px',
            background: isInCart
              ? '#10b981'
              : product.stock === 0
              ? '#9ca3af'
              : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            border: 'none',
          }}
        >
          {product.stock === 0
            ? '❌ Out of Stock'
            : isInCart
            ? '✅ In Cart'
            : '🛍️ Add to Cart'}
        </Button>
      </div>
    </Panel>
  );
}

function ProductListItem({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const isInCartSelector = makeSelectIsProductInCart();
  const isInCart = useAppSelector((state) =>
    isInCartSelector(state, product.id)
  );

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage
  );
  const hasDiscount = product.discountPercentage > 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleViewDetails = () => {
    dispatch(openProductDetailModal(product));
  };

  return (
    <Panel
      className="cursor-pointer transition-all duration-200 hover:shadow-md"
      bordered
      onClick={handleViewDetails}
    >
      <div className="flex gap-4 p-4">
        {/* Product Image */}
        <div className="shrink-0 relative">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-24 h-24 object-cover rounded"
            loading="lazy"
          />
          {hasDiscount && (
            <Tag color="red" className="absolute -top-1 -right-1 text-xs">
              -{Math.round(product.discountPercentage)}%
            </Tag>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-800 text-lg">
              {product.title}
            </h3>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(discountedPrice)}
              </div>
              {hasDiscount && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Rate readOnly value={product.rating} size="xs" allowHalf />
              <Tag color="blue">{product.category}</Tag>
              <span className="text-sm text-gray-500">
                Brand: {product.brand}
              </span>
            </div>

            <Button
              appearance="primary"
              size="sm"
              disabled={product.stock === 0 || isInCart}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              {product.stock === 0
                ? 'Out of Stock'
                : isInCart
                ? 'In Cart'
                : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  );
}
