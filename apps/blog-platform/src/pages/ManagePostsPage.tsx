import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Panel,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  TagPicker,
  Message,
  toaster,
  Table,
  Badge,
  Loader,
} from 'rsuite';
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from '../lib/db-service';
import { useAuth } from '../contexts/AuthContext';
import { Post } from '../types';
import PlusIcon from '@rsuite/icons/Plus';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';

const { Column, HeaderCell, Cell } = Table;

interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  featured: boolean;
}

const defaultFormData: PostFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  tags: [],
  published: true,
  featured: false,
};

const availableTags = [
  'react',
  'javascript',
  'typescript',
  'web-development',
  'best-practices',
  'architecture',
  'scalability',
  'css',
  'design',
  'frontend',
  'routing',
  'state-management',
];

export function ManagePostsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<PostFormData>(defaultFormData);

  useEffect(() => {
    refreshPosts();
  }, []);

  const refreshPosts = async () => {
    setLoading(true);
    try {
      // Fetch ALL posts for admin management (both published and draft)
      const result = await getAllPosts({});
      setPosts(result.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormData(defaultFormData);
    setShowModal(true);
  };

  const handleOpenEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || '',
      tags: post.tags,
      published: post.published,
      featured: post.featured,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPost(null);
    setFormData(defaultFormData);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: formData.slug || generateSlug(value),
    });
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toaster.push(
        <Message showIcon type="warning" closable>
          Title is required
        </Message>,
        { placement: 'topCenter' }
      );
      return;
    }

    if (!formData.slug.trim()) {
      toaster.push(
        <Message showIcon type="warning" closable>
          Slug is required
        </Message>,
        { placement: 'topCenter' }
      );
      return;
    }

    if (!formData.excerpt.trim()) {
      toaster.push(
        <Message showIcon type="warning" closable>
          Excerpt is required
        </Message>,
        { placement: 'topCenter' }
      );
      return;
    }

    if (!formData.content.trim()) {
      toaster.push(
        <Message showIcon type="warning" closable>
          Content is required
        </Message>,
        { placement: 'topCenter' }
      );
      return;
    }

    try {
      if (editingPost) {
        const updates: any = { ...formData };
        if (!formData.coverImage) {
          delete updates.coverImage;
        }
        await updatePost(editingPost.id, updates);
        toaster.push(
          <Message showIcon type="success" closable>
            Post updated successfully!
          </Message>,
          { placement: 'topCenter' }
        );
      } else {
        const postData: any = {
          ...formData,
          authorId: user?.id || 1,
        };
        if (!formData.coverImage) {
          delete postData.coverImage;
        }
        await createPost(postData);
        toaster.push(
          <Message showIcon type="success" closable>
            Post created successfully!
          </Message>,
          { placement: 'topCenter' }
        );
      }
      refreshPosts();
      handleCloseModal();
    } catch (error) {
      toaster.push(
        <Message showIcon type="error" closable>
          {error instanceof Error ? error.message : 'Failed to save post'}
        </Message>,
        { placement: 'topCenter' }
      );
    }
  };

  const handleDelete = async (post: Post) => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      try {
        await deletePost(post.id);
        toaster.push(
          <Message showIcon type="success" closable>
            Post deleted successfully!
          </Message>,
          { placement: 'topCenter' }
        );
        refreshPosts();
      } catch (error) {
        toaster.push(
          <Message showIcon type="error" closable>
            Failed to delete post
          </Message>,
          { placement: 'topCenter' }
        );
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Manage Posts
          </h1>
          <p className="text-gray-600">Create, edit, and delete blog posts</p>
        </div>
        <Button
          appearance="primary"
          startIcon={<PlusIcon />}
          onClick={handleOpenCreate}
          disabled={loading}
        >
          New Post
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader size="lg" content="Loading posts..." />
        </div>
      ) : (
        <Panel bordered className="bg-white">
          <Table
            height={600}
            data={posts}
            onRowClick={(rowData) => {
              navigate(`/posts/${rowData.slug}?page=1`);
            }}
          >
            <Column width={300} flexGrow={1}>
              <HeaderCell>Title</HeaderCell>
              <Cell dataKey="title" />
            </Column>

            <Column width={150}>
              <HeaderCell>Author</HeaderCell>
              <Cell>
                {(rowData: Post) => rowData.author?.username || 'Unknown'}
              </Cell>
            </Column>

            <Column width={120}>
              <HeaderCell>Status</HeaderCell>
              <Cell>
                {(rowData: Post) => (
                  <Badge
                    content={rowData.published ? 'Published' : 'Draft'}
                    color={rowData.published ? 'green' : 'orange'}
                  />
                )}
              </Cell>
            </Column>

            <Column width={100}>
              <HeaderCell>Featured</HeaderCell>
              <Cell>{(rowData: Post) => (rowData.featured ? '⭐' : '')}</Cell>
            </Column>

            <Column width={100}>
              <HeaderCell>Views</HeaderCell>
              <Cell dataKey="views" />
            </Column>

            <Column width={150}>
              <HeaderCell>Created</HeaderCell>
              <Cell>{(rowData: Post) => formatDate(rowData.createdAt)}</Cell>
            </Column>

            <Column width={150} fixed="right">
              <HeaderCell>Actions</HeaderCell>
              <Cell>
                {(rowData: Post) => (
                  <div className="flex gap-2">
                    <Button
                      size="xs"
                      appearance="primary"
                      startIcon={<EditIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEdit(rowData);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      appearance="primary"
                      color="red"
                      startIcon={<TrashIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(rowData);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>
        </Panel>
      )}

      {/* Create/Edit Modal */}
      <Modal open={showModal} onClose={handleCloseModal} size="lg">
        <Modal.Header>
          <Modal.Title>
            {editingPost ? 'Edit Post' : 'Create New Post'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Title *</Form.ControlLabel>
              <Input
                placeholder="Enter post title"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Slug *</Form.ControlLabel>
              <Input
                placeholder="url-friendly-slug"
                value={formData.slug}
                onChange={(value) => setFormData({ ...formData, slug: value })}
              />
              <Form.HelpText>
                URL-friendly identifier for the post
              </Form.HelpText>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Excerpt *</Form.ControlLabel>
              <Input
                as="textarea"
                rows={3}
                placeholder="Brief summary of the post"
                value={formData.excerpt}
                onChange={(value) =>
                  setFormData({ ...formData, excerpt: value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>
                Content * (Markdown supported)
              </Form.ControlLabel>
              <Input
                as="textarea"
                rows={10}
                placeholder="Full post content in Markdown format"
                value={formData.content}
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Cover Image URL</Form.ControlLabel>
              <Input
                placeholder="https://picsum.photos/seed/mypost/800/450"
                value={formData.coverImage}
                onChange={(value) =>
                  setFormData({ ...formData, coverImage: value })
                }
              />
              <Form.HelpText>
                Use Picsum Photos: https://picsum.photos/seed/YOUR-SEED/800/450
              </Form.HelpText>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Tags</Form.ControlLabel>
              <TagPicker
                data={availableTags.map((tag) => ({ label: tag, value: tag }))}
                value={formData.tags}
                onChange={(value) =>
                  setFormData({ ...formData, tags: value || [] })
                }
                style={{ width: '100%' }}
                placeholder="Select tags"
                creatable
              />
            </Form.Group>

            <Form.Group>
              <Checkbox
                checked={formData.published}
                onChange={(_, checked) =>
                  setFormData({ ...formData, published: checked })
                }
              >
                Published
              </Checkbox>
            </Form.Group>

            <Form.Group>
              <Checkbox
                checked={formData.featured}
                onChange={(_, checked) =>
                  setFormData({ ...formData, featured: checked })
                }
              >
                Featured
              </Checkbox>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">
            {editingPost ? 'Update' : 'Create'}
          </Button>
          <Button onClick={handleCloseModal} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
