# TechBlog - Modern Blog Platform

A feature-rich blog platform demonstrating **TanStack Router**, **RSuite UI components**, **Tailwind CSS 4**, and **SQLite** database integration. This application showcases modern React development patterns including type-safe routing, protected routes, nested routes, and client-side data persistence.

## 🚀 Features

### Routing (TanStack Router)
- ✅ **Type-safe routing** with full TypeScript support
- ✅ **File-based routing** structure
- ✅ **Nested routes** for comments section
- ✅ **Protected routes** with authentication guards
- ✅ **Route loaders** for data fetching
- ✅ **Search params** validation and type safety
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

### Data Layer (SQLite + sql.js)
- ✅ **In-browser SQLite database** powered by sql.js
- ✅ **Relational schema** with users, posts, and comments tables
- ✅ **LocalStorage persistence** - data survives page refreshes
- ✅ **Seeded sample data** - 6 posts, 3 users, 10 comments
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
- **TanStack Router 1.87** - Type-safe routing
- **Vite 7** - Lightning-fast development
- **Nx Monorepo** - Workspace management

### UI & Styling
- **RSuite 5.73** - React component library
- **Tailwind CSS 4** - Utility-first styling
- **@rsuite/icons** - Icon components

### Data & State
- **sql.js 1.12** - SQLite in the browser
- **LocalStorage API** - Data persistence
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

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  avatar TEXT,
  bio TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Posts Table
```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id INTEGER NOT NULL,
  tags TEXT NOT NULL, -- JSON array
  published INTEGER NOT NULL DEFAULT 1,
  featured INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);
```

### Comments Table
```sql
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
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

## 🎯 TanStack Router Features

### 1. File-Based Routing
Routes are automatically generated from files in `src/routes/`:
- `__root.tsx` - Root layout with outlet
- `index.tsx` - Home page
- `posts.tsx` - Posts list
- `posts.$id.tsx` - Post detail (dynamic param)
- `posts.$id.comments.tsx` - Nested comments route
- `about.tsx` - About page
- `admin.tsx` - Protected admin route

### 2. Type-Safe Navigation
```typescript
// Fully type-checked navigation
navigate({ 
  to: '/posts/$id', 
  params: { id: postId } 
});

// Search params with validation
search={{ page: 1, tag: 'react' }}
```

### 3. Route Loaders
```typescript
loader: ({ params }) => {
  const post = getPostById(Number(params.id));
  if (!post) throw new Error('Post not found');
  return { post };
}
```

### 4. Protected Routes
```typescript
beforeLoad: () => {
  const authUser = sessionStorage.getItem('auth-user');
  if (!authUser) {
    throw redirect({ to: '/', search: { redirect: '/admin' } });
  }
}
```

### 5. Search Params Validation
```typescript
validateSearch: (search: Record<string, unknown>) => ({
  page: Number(search?.page ?? 1),
  search: (search?.search as string) || '',
  tag: (search?.tag as string) || '',
})
```

## 💾 Data Persistence

### LocalStorage Keys
- `blog-db` - Serialized SQLite database
- `auth-user` - Current authenticated user (sessionStorage)

### Database Operations
```typescript
// Get all posts with filters and pagination
getAllPosts(filters, pagination)

// Search posts
searchPosts(query)

// Get post by ID or slug
getPostById(id)
getPostBySlug(slug)

// Comments
getCommentsByPostId(postId)
createComment(postId, userId, content)

// Users
getUserById(id)
getUserByUsername(username)

// Tags
getAllTags()
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
