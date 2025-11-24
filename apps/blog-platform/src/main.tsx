import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import { CustomProvider } from 'rsuite';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PostsPage } from './pages/PostsPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { CommentsPage } from './pages/CommentsPage';
import { AdminPage } from './pages/AdminPage';
import { ManagePostsPage } from './pages/ManagePostsPage';
import { getAllPosts, getPostBySlug } from './lib/db-service';
import './styles.css';

// Error boundary components
function PostDetailError() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
      <p className="text-gray-600">Post not found</p>
    </div>
  );
}

function PostCommentsError() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
      <p className="text-gray-600">Post not found</p>
    </div>
  );
}

// Root component
function Root() {
  return (
    <RootLayout>
      <Outlet />
      {import.meta.env.DEV && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '8px 12px',
            background: '#333',
            color: 'white',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          React Router v7 - Declarative
        </div>
      )}
    </RootLayout>
  );
}

// Create the router instance with declarative routing
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'posts',
        element: <PostsPage />,
        loader: async () => {
          const posts = await getAllPosts();
          return { posts };
        },
      },
      {
        path: 'posts/:id',
        element: <PostDetailPage />,
        loader: async ({ params }) => {
          const post = await getPostBySlug(params['id']!);
          if (!post) {
            throw new Response('Post not found', { status: 404 });
          }
          return { post };
        },
        errorElement: <PostDetailError />,
      },
      {
        path: 'post-comments/:id',
        element: <CommentsPage />,
        loader: async ({ params }) => {
          const post = await getPostBySlug(params['id']!);
          if (!post) {
            throw new Response('Post not found', { status: 404 });
          }
          return { post };
        },
        errorElement: <PostCommentsError />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
      {
        path: 'admin/posts',
        element: <ManagePostsPage />,
      },
    ],
  },
]);

function AppContent() {
  const { theme } = useTheme();

  return (
    <CustomProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CustomProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </StrictMode>
);
