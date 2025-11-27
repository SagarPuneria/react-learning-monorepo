import { useEffect } from 'react';
import { Container, Content, Header, Sidebar } from 'rsuite';
import { ProductGrid } from './components/ProductGrid';
import { SearchBar } from './components/SearchBar';
import { FiltersSidebar } from './components/FiltersSidebar';
import { ShoppingCart } from './components/ShoppingCart';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AppHeader } from './components/AppHeader';
import { NotificationContainer } from './components/NotificationContainer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectSidebarOpen } from './store/selectors';
import { useGetCategoriesQuery } from './store/services/productsApi';
import { setAvailableCategories } from './store/slices/filtersSlice';

export function ProductCatalogApp() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const { data: categories } = useGetCategoriesQuery();

  // Load categories into filters state
  useEffect(() => {
    if (categories && Array.isArray(categories)) {
      const validCategories = categories.filter(
        (cat) => cat && typeof cat === 'string' && cat.trim().length > 0
      );
      dispatch(setAvailableCategories(validCategories));
    }
  }, [categories, dispatch]);

  return (
    <div className="product-catalog-app min-h-screen">
      <Container>
        {/* App Header */}
        <Header>
          <AppHeader />
        </Header>

        {/* Main Content */}
        <Container className="animate-fade-in">
          {/* Sidebar for filters */}
          <Sidebar
            style={{
              display: sidebarOpen ? 'block' : 'none',
              width: 300,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: 'white',
              borderRight: '1px solid #e5e7eb',
              boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
            }}
            className="animate-slide-in"
          >
            <FiltersSidebar />
          </Sidebar>

          {/* Main content area */}
          <Content className="p-8 bg-gray-50">
            <div className="mb-8 max-w-7xl mx-auto">
              <SearchBar />
            </div>
            <div className="max-w-7xl mx-auto">
              <ProductGrid />
            </div>
          </Content>
        </Container>
      </Container>

      {/* Shopping Cart */}
      <ShoppingCart />

      {/* Product Detail Modal */}
      <ProductDetailModal />

      {/* Notifications */}
      <NotificationContainer />
    </div>
  );
}
