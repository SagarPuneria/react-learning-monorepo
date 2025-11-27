import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, ProductsResponse } from '@react-learning-monorepo/types';

// DummyJSON API base URL
const DUMMY_JSON_BASE_URL = 'https://dummyjson.com';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: DUMMY_JSON_BASE_URL,
  }),
  tagTypes: ['Product', 'Categories'],
  endpoints: (builder) => ({
    // Fetch all products with optional search and pagination
    getProducts: builder.query<
      ProductsResponse,
      {
        limit?: number;
        skip?: number;
        search?: string;
      }
    >({
      query: ({ limit = 30, skip = 0, search }) => {
        const params = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
        });

        if (search && search.trim()) {
          return `products/search?q=${encodeURIComponent(
            search
          )}&${params.toString()}`;
        }

        return `products?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(
                ({ id }) => ({ type: 'Product', id } as const)
              ),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    // Fetch products by category
    getProductsByCategory: builder.query<
      ProductsResponse,
      {
        category: string;
        limit?: number;
        skip?: number;
      }
    >({
      query: ({ category, limit = 30, skip = 0 }) => {
        const params = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
        });
        return `products/category/${encodeURIComponent(
          category
        )}?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(
                ({ id }) => ({ type: 'Product', id } as const)
              ),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    // Fetch single product by ID
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    // Fetch all product categories
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
      transformResponse: (response: any) => {
        // DummyJSON returns an array of objects or strings
        if (Array.isArray(response)) {
          return response.map((item) =>
            typeof item === 'string'
              ? item
              : typeof item === 'object' && item.slug
              ? item.slug
              : typeof item === 'object' && item.name
              ? item.name
              : String(item)
          );
        }
        return [];
      },
      providesTags: [{ type: 'Categories', id: 'LIST' }],
    }),

    // Search products
    searchProducts: builder.query<
      ProductsResponse,
      {
        q: string;
        limit?: number;
        skip?: number;
      }
    >({
      query: ({ q, limit = 30, skip = 0 }) => {
        const params = new URLSearchParams({
          q: encodeURIComponent(q),
          limit: limit.toString(),
          skip: skip.toString(),
        });
        return `products/search?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(
                ({ id }) => ({ type: 'Product', id } as const)
              ),
              { type: 'Product', id: 'SEARCH' },
            ]
          : [{ type: 'Product', id: 'SEARCH' }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useSearchProductsQuery,
  useLazyGetProductsQuery,
  useLazySearchProductsQuery,
} = productsApi;
