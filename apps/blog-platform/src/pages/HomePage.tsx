import { useEffect, useState } from 'react';
import { Panel, Button, Loader, Stack, VStack, HStack } from 'rsuite';
import { useNavigate } from 'react-router';
import { getAllPosts } from '../lib/db-service';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';

export function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAllPosts({ featured: true, published: true }, { page: 1, limit: 3 }),
      getAllPosts({ featured: false, published: true }, { page: 1, limit: 3 }),
    ])
      .then(([featured, recent]) => {
        setFeaturedPosts(featured.data);
        setRecentPosts(recent.data);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader size="lg" content="Loading blog posts..." />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to TechBlog
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Discover the latest insights in web development, React, TypeScript,
            and modern technologies. Learn from practical examples and expert
            tutorials.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate('/posts?page=1')}
              size="lg"
              appearance="primary"
              className="bg-white! text-gray-900! hover:bg-gray-50!"
            >
              Browse All Posts
            </Button>
            <Button
              onClick={() => navigate('/about')}
              size="lg"
              appearance="ghost"
              className="text-white! border-white! hover:bg-white/20!"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <VStack spacing={24}>
          <VStack spacing={8}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured Posts
            </h2>
            <p className="text-gray-600">
              Hand-picked articles you shouldn't miss
            </p>
          </VStack>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </VStack>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <VStack spacing={24}>
          <Stack justifyContent="space-between" alignItems="center" wrap>
            <VStack spacing={8}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Recent Posts
              </h2>
              <p className="text-gray-600">Latest articles from our blog</p>
            </VStack>
            <Button onClick={() => navigate('/posts?page=1')} appearance="link">
              View All Posts
              <svg
                className="w-4 h-4 inline-block ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Stack>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </VStack>
      )}

      {/* Stats Section */}
      <HStack spacing={24} wrap className="justify-center">
        <Panel
          bordered
          className="text-center p-6 bg-white flex-1 min-w-[200px]"
        >
          <VStack spacing={8} alignItems="center">
            <div className="text-4xl font-bold text-blue-600">
              {featuredPosts.length + recentPosts.length}
            </div>
            <div className="text-gray-600">Articles Published</div>
          </VStack>
        </Panel>
        <Panel
          bordered
          className="text-center p-6 bg-white flex-1 min-w-[200px]"
        >
          <VStack spacing={8} alignItems="center">
            <div className="text-4xl font-bold text-purple-600">
              {featuredPosts.reduce((acc, post) => acc + post.views, 0) +
                recentPosts.reduce((acc, post) => acc + post.views, 0)}
            </div>
            <div className="text-gray-600">Total Views</div>
          </VStack>
        </Panel>
        <Panel
          bordered
          className="text-center p-6 bg-white flex-1 min-w-[200px]"
        >
          <VStack spacing={8} alignItems="center">
            <div className="text-4xl font-bold text-green-600">
              {
                Array.from(
                  new Set([
                    ...featuredPosts.flatMap((p) => p.tags),
                    ...recentPosts.flatMap((p) => p.tags),
                  ])
                ).length
              }
            </div>
            <div className="text-gray-600">Topics Covered</div>
          </VStack>
        </Panel>
      </HStack>
    </div>
  );
}
