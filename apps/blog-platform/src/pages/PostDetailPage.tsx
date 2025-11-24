import { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import { incrementPostViews, getCommentsByPostId } from '../lib/db-service';
import { Comment } from '../types';
import { Panel, Breadcrumb, Button } from 'rsuite';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';

export function PostDetailPage() {
  const { post } = useLoaderData() as { post: any };
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);

  if (!post) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    // Increment view count
    incrementPostViews(post.id).catch(console.error);

    // Load comments
    getCommentsByPostId(post.id).then(setComments).catch(console.error);
  }, [post.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 md:px-0">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/posts">Posts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="truncate max-w-xs md:max-w-none">
          {post.title}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Back Button */}
      <Button
        appearance="ghost"
        startIcon={<ArrowLeftLineIcon />}
        onClick={() => navigate('/posts?page=1')}
      >
        Back to Posts
      </Button>

      {/* Post Content */}
      <Panel bordered className="bg-white">
        {/* Cover Image */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-md mb-6"
          />
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium"
            >
              {tag}
            </span>
          ))}
          {post.featured && (
            <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm font-medium">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {post.author?.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={
                    post.author?.username
                      ? `${post.author.username}'s avatar`
                      : 'User avatar'
                  }
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
            <div>
              <div className="font-semibold text-gray-800">
                {post.author?.username}
              </div>
              {post.author?.bio && (
                <div className="text-xs text-gray-500 line-clamp-1">
                  {post.author.bio}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="hidden sm:inline">
              {formatDate(post.createdAt)}
            </span>
            <span className="sm:hidden">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{post.views} views</span>
          </div>
          <div className="flex items-center gap-1">
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
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>{comments.length} comments</span>
          </div>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mt-6"
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\n/g, '<br />'),
          }}
        />

        <div className="border-t border-gray-200 my-8"></div>

        {/* Author Box */}
        {post.author && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={`${post.author.username}'s profile picture`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement && post.author) {
                        target.parentElement.innerHTML = `${
                          post.author.username?.[0]?.toUpperCase() || 'U'
                        }`;
                      }
                    }}
                  />
                ) : (
                  post.author.username?.[0]?.toUpperCase() || 'U'
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  About {post.author.username}
                </h3>
                {post.author.bio && (
                  <p className="text-gray-600 mt-1">{post.author.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Panel>

      {/* Comments Section */}
      <Panel bordered className="bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Comments ({comments.length})
          </h2>
          <Link to={`/post-comments/${post.slug}?page=1`}>
            <Button appearance="primary">View All Comments</Button>
          </Link>
        </div>

        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.slice(0, 3).map((comment: Comment) => (
              <div
                key={comment.id}
                className="flex gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {comment.user?.avatar ? (
                    <img
                      src={comment.user.avatar}
                      alt={
                        comment.user?.username
                          ? `${comment.user.username}'s avatar`
                          : 'User avatar'
                      }
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `${
                          comment.user?.username?.[0]?.toUpperCase() || 'U'
                        }`;
                      }}
                    />
                  ) : (
                    comment.user?.username?.[0]?.toUpperCase() || 'U'
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">
                      {comment.user?.username}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
            {comments.length > 3 && (
              <div className="text-center">
                <Link to={`/post-comments/${post.slug}?page=1`}>
                  <Button appearance="link">
                    View {comments.length - 3} more comments
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </Panel>
    </div>
  );
}
