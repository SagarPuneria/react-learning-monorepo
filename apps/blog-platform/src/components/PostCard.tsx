import { Link } from 'react-router';
import { Button } from 'rsuite';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="h-full animate-scale-in">
      <div
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        style={{
          boxShadow: 'var(--rs-shadow)',
        }}
      >
        {post.coverImage && (
          <div className="relative w-full h-48 bg-blue-600 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                    ${post.title.charAt(0).toUpperCase()}
                  </div>
                `;
              }}
            />
          </div>
        )}

        <div className="p-6 space-y-4 flex flex-col grow">
          {post.coverImage ? null : (
            <div className="w-full h-32 flex items-center justify-center bg-blue-600 text-white text-5xl font-bold rounded-t-xl -mt-6 -mx-6 mb-2">
              {post.title.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold border border-blue-200 dark:border-blue-700 hover:scale-105 transition-transform cursor-pointer"
              >
                {tag}
              </span>
            ))}
            {post.featured && (
              <span className="px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-semibold border border-yellow-200 dark:border-yellow-700 hover:scale-105 transition-transform">
                ⭐ Featured
              </span>
            )}
          </div>

          <Link to={`/posts/${post.slug}?page=1`}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer leading-tight">
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed grow line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-auto space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {post.author?.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author?.username || 'User avatar'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `${
                          post.author?.username?.[0]?.toUpperCase() || 'U'
                        }`;
                      }}
                    />
                  ) : (
                    post.author?.username?.[0]?.toUpperCase() || 'U'
                  )}
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {post.author?.username}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(post.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {post.views}
                </span>
              </div>
            </div>

            <Link
              to="/posts/$id"
              params={{ id: post.slug }}
              search={{ page: 1 }}
            >
              <Button
                appearance="primary"
                className="group relative w-full shadow-md hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  Read Full Article
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
