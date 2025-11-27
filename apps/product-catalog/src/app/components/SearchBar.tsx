import { useState, useEffect } from 'react';
import { Input, Button } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import CloseIcon from '@rsuite/icons/Close';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectCurrentSearch,
  selectActiveFiltersCount,
} from '../store/selectors';
import { setSearch, clearAllFilters } from '../store/slices/filtersSlice';
import { debounce } from '@react-learning-monorepo/utils';

export function SearchBar() {
  const dispatch = useAppDispatch();
  const currentSearch = useAppSelector(selectCurrentSearch);
  const activeFiltersCount = useAppSelector(selectActiveFiltersCount);
  const [localSearch, setLocalSearch] = useState(currentSearch);

  // Debounced search dispatch
  const debouncedSearch = debounce((query: string) => {
    dispatch(setSearch(query));
  }, 300);

  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setLocalSearch('');
    dispatch(setSearch(''));
  };

  const clearAllFiltersHandler = () => {
    setLocalSearch('');
    dispatch(clearAllFilters());
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 w-full">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
              <SearchIcon
                className="text-indigo-500"
                style={{ fontSize: '22px' }}
              />
            </div>
            <Input
              placeholder="Search products, categories, brands..."
              value={localSearch}
              onChange={handleSearchChange}
              size="lg"
              style={{
                fontSize: '16px',
                paddingLeft: '52px',
                paddingRight: localSearch ? '52px' : '20px',
                paddingTop: '14px',
                paddingBottom: '14px',
                borderRadius: '14px',
                border: '2px solid #e0e7ff',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.08)',
                transition: 'all 0.2s',
              }}
              onFocus={(e: any) => {
                e.target.style.border = '2px solid #818cf8';
                e.target.style.boxShadow = '0 0 0 3px rgba(129, 140, 248, 0.1)';
              }}
              onBlur={(e: any) => {
                e.target.style.border = '2px solid #e0e7ff';
                e.target.style.boxShadow =
                  '0 4px 6px -1px rgba(79, 70, 229, 0.08)';
              }}
            />
            {localSearch && (
              <button
                onClick={clearSearch}
                title="Clear search"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <CloseIcon style={{ fontSize: '18px' }} />
              </button>
            )}
          </div>
        </div>

        {/* Clear All Button */}
        {activeFiltersCount > 0 && (
          <Button
            appearance="primary"
            color="red"
            onClick={clearAllFiltersHandler}
            size="lg"
            style={{
              borderRadius: '12px',
              padding: '14px 24px',
              fontWeight: 600,
              fontSize: '15px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)',
            }}
          >
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>
    </div>
  );
}
