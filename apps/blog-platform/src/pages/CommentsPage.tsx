import { useState, useEffect } from 'react';
import { Link, useParams, useLoaderData, useNavigate } from 'react-router';
import { getCommentsByPostId, createComment } from '../lib/db-service';
import { useAuth } from '../contexts/AuthContext';
import { Comment } from '../types';
import { Panel, Button, Input, Message, toaster } from 'rsuite';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';

export function CommentsPage() {
  const { id } = useParams();
  const { post } = useLoaderData() as { post: any };
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (post) {
      getCommentsByPostId(post.id)
        .then((commentsData) => {
          setComments(commentsData);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [post]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toaster.push(
        <Message showIcon type="warning" closable>
          Please enter a comment
        </Message>,
        { placement: 'topCenter' }
      );
      return;
    }

    if (!isAuthenticated || !user || !post) {
      toaster.push(
        <Message showIcon type="warning" closable>
          Please login to comment
        </Message>,
        { placement: 'topCenter' }
      );
      return;
    }

    setSubmitting(true);
    try {
      const comment = await createComment(post.id, user.id, newComment);
      setComments([comment, ...comments]);
      setNewComment('');
      toaster.push(
        <Message showIcon type="success" closable>
          Comment posted successfully!
        </Message>,
        { placement: 'topCenter' }
      );
    } catch (error) {
      toaster.push(
        <Message showIcon type="error" closable>
          Failed to post comment
        </Message>,
        { placement: 'topCenter' }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button
        appearance="ghost"
        startIcon={<ArrowLeftLineIcon />}
        onClick={() => navigate(`/posts/${id}?page=1`)}
      >
        Back to Post
      </Button>

      {/* Post Info */}
      <Panel bordered className="bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <p className="text-gray-600">{post.excerpt}</p>
      </Panel>

      {/* Comment Form */}
      <Panel bordered className="bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Leave a Comment
        </h2>

        {isAuthenticated && user ? (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.username}'s avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `${
                        user.username?.[0]?.toUpperCase() || 'U'
                      }`;
                    }}
                  />
                ) : (
                  user.username?.[0]?.toUpperCase() || 'U'
                )}
              </div>
              <div className="flex-1">
                <Input
                  as="textarea"
                  rows={4}
                  placeholder="Share your thoughts..."
                  value={newComment}
                  onChange={(value) => setNewComment(value)}
                  disabled={submitting}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                appearance="primary"
                onClick={handleSubmitComment}
                disabled={submitting}
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">
              Please login to leave a comment
            </p>
            <Link to="/admin">
              <Button appearance="primary">Login</Button>
            </Link>
          </div>
        )}
      </Panel>

      {/* Comments List */}
      <Panel bordered className="bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          All Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No comments yet</p>
            <p className="text-sm mt-2">Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="py-4 border-b border-gray-200 last:border-0"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
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
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-800">
                        {comment.user?.username}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
