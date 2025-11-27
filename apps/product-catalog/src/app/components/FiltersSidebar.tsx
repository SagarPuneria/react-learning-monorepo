import { formatPrice } from '@react-learning-monorepo/utils';
import { useEffect, useState } from 'react';
import {
  Button,
  InputNumber,
  RangeSlider,
  SelectPicker,
  Tag,
  TagGroup,
} from 'rsuite';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectAvailableBrands,
  selectAvailableCategories,
  selectFilters,
  selectPriceRange,
} from '../store/selectors';
import { useGetCategoriesQuery } from '../store/services/productsApi';
import {
  clearAllFilters,
  setBrand,
  setCategory,
  setPriceRange,
  setSortBy,
} from '../store/slices/filtersSlice';

export function FiltersSidebar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const availableCategories = useAppSelector(selectAvailableCategories);
  const availableBrands = useAppSelector(selectAvailableBrands);
  const priceRangeState = useAppSelector(selectPriceRange);

  // Fetch categories directly to ensure we have the latest data
  const { data: categoriesFromApi, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  // Use categories from API if available, fallback to store
  const categories = categoriesFromApi || availableCategories || [];

  const [priceRange, setPriceRangeLocal] = useState<[number, number]>(
    priceRangeState.current
  );

  // Update local price range when filters change
  useEffect(() => {
    setPriceRangeLocal(priceRangeState.current);
  }, [priceRangeState.current]);

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRangeLocal(value);
  };

  const handlePriceRangeCommit = () => {
    dispatch(setPriceRange(priceRange));
  };

  const handleSortChange = (sortBy: string) => {
    dispatch(setSortBy(sortBy as any));
  };

  const hasActiveFilters =
    filters.category !== null ||
    filters.brand !== null ||
    filters.minPrice !== null ||
    filters.maxPrice !== null;

  return (
    <div className="filters-sidebar p-5 bg-gray-50 h-full">
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-300">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            size="sm"
            appearance="ghost"
            color="red"
            onClick={() => dispatch(clearAllFilters())}
            style={{
              borderRadius: '6px',
              fontSize: '13px',
            }}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Sort Options */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sort By
          </label>
          <SelectPicker
            data={[
              { value: 'default', label: 'Default' },
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' },
              { value: 'rating-desc', label: 'Highest Rated' },
              { value: 'name-asc', label: 'Name: A to Z' },
              { value: 'name-desc', label: 'Name: Z to A' },
            ]}
            value={filters.sortBy}
            onChange={(value) => handleSortChange(value as string)}
            searchable={false}
            cleanable={false}
            block
            placeholder="Select sort order"
          />
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          {categoriesLoading ? (
            <div className="text-sm text-gray-500 p-2">
              Loading categories...
            </div>
          ) : (
            <SelectPicker
              data={[
                { value: 'all', label: 'All Categories' },
                ...(categories
                  ?.filter(Boolean)
                  ?.map((category: any, index: number) => {
                    const categoryStr =
                      typeof category === 'string'
                        ? category
                        : String(category || '');
                    const displayName =
                      categoryStr.charAt(0).toUpperCase() +
                      categoryStr.slice(1);
                    return {
                      value: categoryStr,
                      label: displayName,
                    };
                  }) || []),
              ]}
              value={filters.category || 'all'}
              onChange={(value) => {
                dispatch(
                  setCategory(value === 'all' ? null : (value as string))
                );
              }}
              searchable
              cleanable={false}
              block
              placeholder="Select category"
            />
          )}
        </div>

        {/* Price Range */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Price Range
          </label>
          <div className="space-y-3">
            <div>
              <RangeSlider
                value={priceRange}
                onChange={handlePriceRangeChange}
                onChangeCommitted={handlePriceRangeCommit}
                min={priceRangeState.min}
                max={priceRangeState.max}
                step={10}
                tooltip={false}
                progress
              />
            </div>

            <div className="flex gap-3 items-center">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Min
                </label>
                <InputNumber
                  value={priceRange[0]}
                  onChange={(value) => {
                    const numValue =
                      typeof value === 'string'
                        ? parseFloat(value) || priceRangeState.min
                        : value;
                    const newValue = Math.max(
                      priceRangeState.min,
                      Math.min(numValue || priceRangeState.min, priceRange[1])
                    );
                    setPriceRangeLocal([newValue, priceRange[1]]);
                  }}
                  onBlur={handlePriceRangeCommit}
                  min={priceRangeState.min}
                  max={priceRange[1]}
                  size="sm"
                />
              </div>

              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Max
                </label>
                <InputNumber
                  value={priceRange[1]}
                  onChange={(value) => {
                    const numValue =
                      typeof value === 'string'
                        ? parseFloat(value) || priceRangeState.max
                        : value;
                    const newValue = Math.min(
                      priceRangeState.max,
                      Math.max(numValue || priceRangeState.max, priceRange[0])
                    );
                    setPriceRangeLocal([priceRange[0], newValue]);
                  }}
                  onBlur={handlePriceRangeCommit}
                  min={priceRange[0]}
                  max={priceRangeState.max}
                  size="sm"
                />
              </div>
            </div>

            <div className="text-center text-xs font-medium text-gray-700 pt-1">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </div>
          </div>
        </div>

        {/* Brands */}
        {availableBrands && availableBrands.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Brand
            </label>
            <SelectPicker
              data={[
                { value: 'all', label: 'All Brands' },
                ...availableBrands
                  .filter(Boolean)
                  .slice(0, 50)
                  .map((brand: any, index: number) => {
                    const brandStr =
                      typeof brand === 'string' ? brand : String(brand || '');
                    return {
                      value: brandStr,
                      label: brandStr,
                    };
                  }),
              ]}
              value={filters.brand || 'all'}
              onChange={(value) => {
                dispatch(setBrand(value === 'all' ? null : (value as string)));
              }}
              searchable
              cleanable={false}
              block
              placeholder="Select brand"
            />
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700 mb-2.5">
            Active Filters
          </h4>
          <TagGroup className="gap-1">
            {filters.category && (
              <Tag
                closable
                onClose={() => dispatch(setCategory(null))}
                color="blue"
              >
                {filters.category}
              </Tag>
            )}
            {filters.brand && (
              <Tag
                closable
                onClose={() => dispatch(setBrand(null))}
                color="green"
              >
                {filters.brand}
              </Tag>
            )}
            {(filters.minPrice !== null || filters.maxPrice !== null) && (
              <Tag
                closable
                onClose={() =>
                  dispatch(
                    setPriceRange([priceRangeState.min, priceRangeState.max])
                  )
                }
                color="orange"
              >
                {formatPrice(filters.minPrice || 0)} -{' '}
                {formatPrice(filters.maxPrice || 5000)}
              </Tag>
            )}
          </TagGroup>
        </div>
      )}
    </div>
  );
}
