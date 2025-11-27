import { Badge, IconButton, FlexboxGrid } from 'rsuite';
import MenuIcon from '@rsuite/icons/Menu';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectGridView, selectCartTotalQuantity } from '../store/selectors';
import { toggleSidebar, toggleGridView } from '../store/slices/uiSlice';
import { openCart } from '../store/slices/cartSlice';

export function AppHeader() {
  const dispatch = useAppDispatch();
  const gridView = useAppSelector(selectGridView);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);

  return (
    <FlexboxGrid
      justify="space-between"
      align="middle"
      className="h-20 px-8 bg-white shadow-md border-b border-gray-200"
      style={{ position: 'sticky', top: 0, zIndex: 100 }}
    >
      {/* Left side - Brand and Navigation */}
      <FlexboxGrid.Item className="flex items-center gap-4">
        <IconButton
          icon={<MenuIcon />}
          appearance="subtle"
          onClick={() => dispatch(toggleSidebar())}
          title="Toggle Filters"
          className="text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
          style={{ color: '#374151', border: '1px solid #e5e7eb' }}
        />

        <div className="flex items-center gap-3">
          <div className="text-4xl">🛒</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Product Catalog
            </h1>
            <span className="text-xs text-gray-600">
              Powered by Redux Toolkit
            </span>
          </div>
        </div>
      </FlexboxGrid.Item>

      {/* Right side - Controls */}
      <FlexboxGrid.Item className="flex items-center gap-4">
        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            className={`p-2.5 rounded-lg text-sm font-medium transition-all border ${
              gridView
                ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
            }`}
            onClick={() => dispatch(toggleGridView())}
            title="Grid View"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            className={`p-2.5 rounded-lg text-sm font-medium transition-all border ${
              !gridView
                ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
            }`}
            onClick={() => dispatch(toggleGridView())}
            title="List View"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Shopping Cart */}
        <Badge
          content={totalQuantity > 0 ? totalQuantity : undefined}
          className="animate-fade-in"
        >
          <button
            onClick={() => dispatch(openCart())}
            className="relative p-3 text-gray-700 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all border border-gray-200"
            title="Shopping Cart"
          >
            <span className="text-2xl">🛍️</span>
          </button>
        </Badge>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
