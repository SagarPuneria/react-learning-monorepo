# TechBlog - Modern Blog Platform

A feature-rich blog platform demonstrating **React Router v7**, **RSuite UI components**, **Tailwind CSS 4**, and **Supabase** backend. This application showcases modern React development patterns including declarative routing, protected routes, nested routes, and cloud-based data persistence.

## 🚀 Features

### Routing (React Router v7)

- ✅ **Declarative routing** with React Router v7
- ✅ **Type-safe navigation** with full TypeScript support
- ✅ **Nested routes** for comments section
- ✅ **Protected routes** with authentication guards
- ✅ **Route loaders** for data fetching
- ✅ **Search params** handling and validation
- ✅ **Breadcrumb navigation**
- ✅ **404 error handling**

### UI Components (RSuite)

- ✅ **Navigation**: Nav, Navbar for header navigation
- ✅ **Panels**: Post cards, content containers
- ✅ **Pagination**: Multi-page post browsing
- ✅ **Search**: InputGroup with search functionality
- ✅ **Lists**: Comments display with avatars
- ✅ **Forms**: Login and comment forms
- ✅ **Loading states**: Loader and Placeholder components
- ✅ **Breadcrumbs**: Navigation hierarchy
- ✅ **Tags**: Post categorization and filtering
- ✅ **Avatars**: User profile images
- ✅ **Messages**: Toast notifications

### Data Layer (Supabase)

- ✅ **Cloud PostgreSQL database** powered by Supabase
- ✅ **Relational schema** with users, posts, and comments tables
- ✅ **Real-time capabilities** with Supabase subscriptions
- ✅ **Authentication** with Supabase Auth
- ✅ **Full CRUD operations** with TypeScript service layer
- ✅ **Search functionality** across post content
- ✅ **Tag filtering** and aggregation

### Pages & Routes

```
/                    → Home page with featured posts
/posts               → All posts with search & pagination
/posts/:id           → Individual post detail view
/posts/:id/comments  → Nested comments section
/about               → About page with tech stack info
/admin               → Protected admin dashboard
*                    → 404 Not Found page (handled)
```

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - Latest React features
- **TypeScript 5.9** - Full type safety
- **React Router v7** - Declarative routing with data APIs
- **Vite 7** - Lightning-fast development
- **Nx Monorepo** - Workspace management

### UI & Styling

- **RSuite 5.73** - React component library
- **Tailwind CSS 4** - Utility-first styling
- **@rsuite/icons** - Icon components

### Data & State

- **Supabase** - Backend as a Service (PostgreSQL + Auth)
- **@supabase/supabase-js** - Supabase JavaScript client
- **React Context** - Authentication state

## 📦 Installation

```bash
# Install dependencies (from monorepo root)
npm install

# Start development server
npx nx serve blog-platform
```

The application will be available at `http://localhost:4203`

## 🎯 Key Features Breakdown

### 1. Home Page (`/`)

- **Hero section** with gradient background
- **Featured posts grid** (3 columns on desktop)
- **Recent posts section**
- **Statistics cards** showing post counts and views
- **Responsive design** with Tailwind utilities

### 2. Posts List (`/posts`)

- **Search bar** with real-time filtering
- **Tag-based filtering** - click tags to filter
- **Active filters display** with clear options
- **Pagination** with RSuite Pagination component
- **Results counter** showing current page range
- **Loading placeholders** during data fetch
- **Empty state** when no results found

### 3. Post Detail (`/posts/:id`)

- **Breadcrumb navigation** (Home → Posts → Current Post)
- **Cover image display** with responsive sizing
- **Post metadata** - author, date, views, comment count
- **Tag navigation** - click to filter posts by tag
- **Formatted content** with prose styling
- **Author bio box** at the bottom
- **Preview of latest 3 comments**
- **View count** automatically increments on visit

### 4. Comments Page (`/posts/:id/comments`)

- **Full comments list** with RSuite List component
- **Comment form** for authenticated users
- **User avatars** from gravatar/placeholder service
- **Timestamp formatting** for each comment
- **Real-time updates** after posting
- **Authentication check** - redirects to login if needed

### 5. About Page (`/about`)

- **Mission statement**
- **Technology stack details** - Frontend & Backend
- **Feature highlights** with icons
- **Key features** explained with emojis
- **Demo credentials** for testing

### 6. Admin Dashboard (`/admin`)

- **Protected route** - requires authentication
- **Login form** with demo accounts:
  - `admin` (any password)
  - `john_doe` (any password)
  - `jane_smith` (any password)
- **User profile display**
- **Statistics dashboard** - Total posts, views, featured count
- **Logout functionality**
- **Session persistence** using sessionStorage

## 🗄️ Database Schema (Supabase/PostgreSQL)

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Posts Table

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id UUID NOT NULL REFERENCES users(id),
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Comments Table

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## 🎨 RSuite Components Used

| Component | Usage |
|-----------|-------|
| `Navbar`, `Nav` | Header navigation |
| `Panel` | Post cards, content containers |
| `Pagination` | Post list pagination |
| `InputGroup`, `Input` | Search and form inputs |
| `List` | Comments display |
| `Avatar` | User profile images |
| `Tag` | Post tags and categories |
| `Breadcrumb` | Page navigation hierarchy |
| `Button` | Actions and navigation |
| `Loader` | Loading states |
| `Placeholder` | Skeleton screens |
| `Message`, `toaster` | Notifications |
| `Form`, `FormGroup`, `FormControl` | Form layouts |
| `Container` | Page layouts |
| `Header`, `Footer` | Layout sections |
| `Divider` | Content separation |

## 🎯 React Router v7 Features

### 1. Data Router with createBrowserRouter

Routes are configured using `createBrowserRouter` with data APIs:

```typescript
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "posts", element: <PostsPage />, loader: postsLoader },
      { path: "posts/:slug", element: <PostDetailPage />, loader: postLoader },
      // ... more routes
    ]
  }
]);
```

### 2. Type-Safe Navigation

```typescript
import { useNavigate, Link } from 'react-router';

// Programmatic navigation
const navigate = useNavigate();
navigate(`/posts/${postSlug}`);

// Declarative navigation
<Link to={`/posts/${post.slug}`}>Read More</Link>
```

### 3. Route Loaders for Data Fetching

```typescript
const loader = async ({ params }) => {
  const post = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();
  return { post };
};
```

### 4. Search Params with useSearchParams

```typescript
const [searchParams, setSearchParams] = useSearchParams();
const page = searchParams.get('page') || '1';

setSearchParams({ page: '2', tag: 'react' });
```

### 5. Data Access with useLoaderData

```typescript
function PostDetailPage() {
  const { post } = useLoaderData();
  return <div>{post.title}</div>;
}
```

## 💾 Data Persistence

### Supabase Configuration

- Environment variables for Supabase URL and anon key
- Real-time subscriptions for live data updates
- Row Level Security (RLS) policies for data access control

### Database Operations

```typescript
// Get all posts with filters and pagination
const { data: posts } = await supabase
  .from('posts')
  .select('*, author:users(*)')
  .order('created_at', { ascending: false })
  .range(start, end);

// Search posts
const { data } = await supabase
  .from('posts')
  .select('*')
  .textSearch('title,content', query);

// Get post by slug
const { data: post } = await supabase
  .from('posts')
  .select('*, author:users(*), comments(*)')
  .eq('slug', slug)
  .single();

// Create comment
const { data } = await supabase
  .from('comments')
  .insert({ post_id, user_id, content })
  .select()
  .single();
```

## 🎨 Tailwind CSS Usage

### Layout Classes

- `min-h-screen`, `max-w-4xl`, `mx-auto` - Page containers
- `grid`, `grid-cols-3`, `gap-6` - Post grids
- `flex`, `justify-between`, `items-center` - Flexbox layouts

### Responsive Design

- `md:grid-cols-2`, `lg:grid-cols-3` - Responsive grids
- `sm:text-5xl` - Responsive typography

### Custom Utilities

- `bg-linear-to-r` - Gradient backgrounds
- `line-clamp-3` - Text truncation
- `prose` - Content typography
- `hover:shadow-lg` - Interactive states

## 🚦 Running the Application

### Development

```bash
# From monorepo root
npx nx serve blog-platform

# Or from app directory
cd apps/blog-platform
npm run dev
```

### Build

```bash
npx nx build blog-platform
```

### Type Checking

```bash
npx nx type-check blog-platform
```

## 📝 Sample Data

### Demo Users

1. **admin** - Blog administrator
2. **john_doe** - Tech enthusiast
3. **jane_smith** - Full-stack developer

### Sample Posts

1. Getting Started with React 19
2. TypeScript Best Practices in 2025
3. Building Scalable Web Applications
4. Modern CSS Techniques
5. Introduction to TanStack Router
6. State Management in 2025

## 🔐 Authentication

This is a demo authentication system:

- **Login**: Enter any demo username (password ignored)
- **Session**: Stored in sessionStorage
- **Protected Routes**: Admin route requires login
- **Logout**: Clears session and redirects to home

## 📱 Responsive Design

- **Mobile**: Single column layout, stacked navigation
- **Tablet**: 2-column post grid
- **Desktop**: 3-column post grid, side-by-side layouts
- **Large screens**: Max-width containers for readability

## 🎓 Learning Outcomes

This project demonstrates:

1. **Type-safe routing** with TanStack Router
2. **File-based route organization**
3. **Protected and nested routes**
4. **Client-side database** with SQL.js
5. **Component library integration** (RSuite)
6. **Modern CSS** with Tailwind 4
7. **Authentication patterns**
8. **Data persistence strategies**
9. **Search and filtering**
10. **Pagination implementation**

## 🔧 Project Structure

```
apps/blog-platform/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── RootLayout.tsx
│   │   └── PostCard.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── database.ts       # SQLite initialization
│   │   └── db-service.ts     # Database operations
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PostsPage.tsx
│   │   ├── PostDetailPage.tsx
│   │   ├── CommentsPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── AdminPage.tsx
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── posts.tsx
│   │   ├── posts.$id.tsx
│   │   ├── posts.$id.comments.tsx
│   │   ├── about.tsx
│   │   └── admin.tsx
│   ├── types/
│   │   └── index.ts
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🌟 Highlights

- **Zero backend required** - Everything runs in the browser
- **Type-safe from end to end** - TypeScript everywhere
- **Modern developer experience** - Hot reload, TypeScript, ESM
- **Production-ready patterns** - Authentication, routing, data fetching
- **Beautiful UI** - RSuite + Tailwind combination
- **Performant** - Vite build, code splitting, lazy loading

## 📚 Additional Resources

- [TanStack Router Docs](https://tanstack.com/router)
- [RSuite Documentation](https://rsuitejs.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [SQL.js Documentation](https://sql.js.org/)
- [React 19 Documentation](https://react.dev/)

---

**Built with ❤️ as a demonstration of modern web development techniques**

**Port**: 4203  
**Status**: ✅ Complete and production-ready
