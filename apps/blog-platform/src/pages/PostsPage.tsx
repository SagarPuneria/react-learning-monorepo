import { useEffect, useState } from 'react';
import {
  Panel,
  InputGroup,
  Input,
  Pagination,
  Placeholder,
  Button,
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useNavigate, useSearchParams, useLoaderData } from 'react-router';
import { getAllPosts, getAllTags } from '../lib/db-service';
import { Post, PostsSearchParams } from '../types';
import { PostCard } from '../components/PostCard';

const { Paragraph } = Placeholder;

export function PostsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loaderData = useLoaderData() as {
    page: number;
    search: string;
    tag: string;
  };

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [allTags, setAllTags] = useState<string[]>([]);

  const currentPage = parseInt(searchParams.get('page') || '1');
  const selectedTag = searchParams.get('tag') || '';
  const searchText = searchParams.get('search') || '';
  const limit = 6;

  useEffect(() => {
    getAllTags().then(setAllTags).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    getAllPosts(
      {
        search: searchText,
        tag: selectedTag,
        published: true,
      },
      { page: currentPage, limit }
    )
      .then((result) => {
        setPosts(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, searchText, selectedTag]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (searchText) params.set('search', searchText);
    if (selectedTag) params.set('tag', selectedTag);
    navigate(`/posts?${params.toString()}`);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams();
    params.set('page', '1');
    if (value) params.set('search', value);
    if (selectedTag) params.set('tag', selectedTag);
    navigate(`/posts?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (searchText) params.set('search', searchText);
    const newTag = tag === selectedTag ? undefined : tag;
    if (newTag) params.set('tag', newTag);
    navigate(`/posts?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    navigate('/posts?page=1');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          All Blog Posts
        </h1>
        <p className="text-gray-600 text-lg">
          Explore {total} articles on web development and technology
        </p>
      </div>

      {/* Search and Filters */}
      <Panel bordered className="bg-white">
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Posts
            </label>
            <InputGroup inside>
              <Input
                placeholder="Search by title, content, or excerpt..."
                value={searchQuery}
                onChange={setSearchQuery}
                onPressEnter={() => handleSearch(searchQuery)}
              />
              <InputGroup.Button onClick={() => handleSearch(searchQuery)}>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </div>

          {/* Tags Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Tag
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  appearance={selectedTag === tag ? 'primary' : 'default'}
                  size="sm"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(searchText || selectedTag) && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchText && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-100 text-cyan-700 rounded-md text-sm">
                  Search: {searchText}
                  <Button
                    onClick={() => handleSearch('')}
                    size="xs"
                    appearance="link"
                    className="ml-1 hover:text-cyan-900"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </span>
              )}
              {selectedTag && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
                  Tag: {selectedTag}
                  <Button
                    onClick={() => handleTagClick(selectedTag)}
                    size="xs"
                    appearance="link"
                    className="ml-1 hover:text-blue-900"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </span>
              )}
              <Button
                onClick={clearFilters}
                appearance="link"
                size="sm"
                className="ml-auto"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </Panel>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <Panel key={i} bordered>
              <Paragraph rows={8} />
            </Panel>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {!loading && posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="lg"
                total={total}
                limit={limit}
                activePage={currentPage}
                onChangePage={handlePageChange}
              />
            </div>
          )}

          {/* Results Info */}
          <div className="text-center text-sm text-gray-600">
            Showing {(currentPage - 1) * limit + 1} to{' '}
            {Math.min(currentPage * limit, total)} of {total} posts
          </div>
        </>
      )}

      {/* No Results */}
      {!loading && posts.length === 0 && (
        <Panel bordered className="text-center py-12">
          <div className="text-gray-500 space-y-2">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold">No posts found</h3>
            <p>Try adjusting your search or filter criteria</p>
            {(searchText || selectedTag) && (
              <Button onClick={clearFilters} appearance="link" className="mt-4">
                Clear all filters
              </Button>
            )}
          </div>
        </Panel>
      )}
    </div>
  );
}
