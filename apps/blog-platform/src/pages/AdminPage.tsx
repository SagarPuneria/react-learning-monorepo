import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { getAllPosts } from '../lib/db-service';
import { Post } from '../types';
import { Panel, Form, Input, Button, Message, toaster, Divider } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';

export function AdminPage() {
  const { isAuthenticated, user, logout, login } = useAuth();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<{ data: Post[]; total: number }>({
    data: [],
    total: 0,
  });

  useEffect(() => {
    if (isAuthenticated) {
      getAllPosts({ published: true })
        .then((result) => {
          setAllPosts(result);
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim()) {
      toaster.push(
        <Message showIcon type="warning" closable>
          Please enter username
        </Message>,
        { placement: 'topCenter' }
      );
      return;
    }

    setLoading(true);
    try {
      const success = await login(username, password);

      if (success) {
        toaster.push(
          <Message showIcon type="success" closable>
            Welcome back, {username}!
          </Message>,
          { placement: 'topCenter' }
        );
      } else {
        toaster.push(
          <Message showIcon type="error" closable>
            User not found. Try: admin, john_doe, or jane_smith
          </Message>,
          { placement: 'topCenter' }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toaster.push(
      <Message showIcon type="info" closable>
        Logged out successfully
      </Message>,
      { placement: 'topCenter' }
    );
    navigate({ to: '/' });
  };

  if (isAuthenticated && user) {
    const totalViews = allPosts.data.reduce(
      (sum: number, post: Post) => sum + post.views,
      0
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user.username}!</p>
        </div>

        {/* User Info */}
        <Panel bordered className="bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Profile Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-32">
                Username:
              </span>
              <span className="text-gray-900">{user.username}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-32">Email:</span>
              <span className="text-gray-900">{user.email}</span>
            </div>
            {user.bio && (
              <div className="flex items-start gap-3">
                <span className="font-semibold text-gray-700 w-32">Bio:</span>
                <span className="text-gray-900">{user.bio}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-32">User ID:</span>
              <span className="text-gray-900">{user.id}</span>
            </div>
          </div>

          <Divider />

          <Button onClick={handleLogout} appearance="primary" color="red">
            Logout
          </Button>
        </Panel>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Panel bordered className="text-center bg-white">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {allPosts.total}
            </div>
            <div className="text-gray-600">Total Posts</div>
          </Panel>

          <Panel bordered className="text-center bg-white">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {totalViews}
            </div>
            <div className="text-gray-600">Total Views</div>
          </Panel>

          <Panel bordered className="text-center bg-white">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {allPosts.data.filter((p) => p.featured).length}
            </div>
            <div className="text-gray-600">Featured Posts</div>
          </Panel>
        </div>

        {/* Features */}
        <Panel bordered className="bg-blue-50 border-blue-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Admin Features
          </h3>
          <div className="space-y-3">
            <Button
              as={Link}
              to="/admin/posts"
              appearance="primary"
              startIcon={<EditIcon />}
              block
            >
              Manage Posts (Create, Edit, Delete)
            </Button>
            <div className="mt-4 space-y-2 text-gray-700">
              <p>• View blog statistics and analytics</p>
              <p>• Manage user profile information</p>
              <p>• Access protected admin routes</p>
              <p>• Post comments on articles</p>
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <Panel bordered shaded className="bg-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">Sign in to access the dashboard</p>
        </div>

        <Form
          fluid
          onSubmit={() => {
            handleLogin();
          }}
        >
          <Form.Group>
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(value) => setUsername(value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Input
              type="password"
              placeholder="Enter password (any)"
              value={password}
              onChange={(value) => setPassword(value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </Form.Group>

          <Button
            type="submit"
            appearance="primary"
            block
            size="lg"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>

        <Divider />

        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <p className="font-semibold text-gray-700 mb-2">Demo Accounts:</p>
          <ul className="space-y-1 text-gray-600">
            <li>
              • <code className="bg-gray-200 px-1 rounded">admin</code>
            </li>
            <li>
              • <code className="bg-gray-200 px-1 rounded">john_doe</code>
            </li>
            <li>
              • <code className="bg-gray-200 px-1 rounded">jane_smith</code>
            </li>
          </ul>
          <p className="mt-2 text-xs text-gray-500">
            Any password will work for demo purposes
          </p>
        </div>
      </Panel>
    </div>
  );
}
