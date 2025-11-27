import { Panel, Divider } from 'rsuite';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          About TechBlog
        </h1>
        <p className="text-xl text-gray-600">
          A modern blogging platform built for developers, by developers
        </p>
      </div>

      {/* Mission */}
      <Panel bordered className="bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          TechBlog is dedicated to providing high-quality technical content for
          developers of all skill levels. We believe in sharing knowledge, best
          practices, and real-world experiences to help the developer community
          grow and thrive.
        </p>
      </Panel>

      {/* Technologies */}
      <Panel bordered className="bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Built With</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Frontend
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ React 19 - Latest React features</li>
              <li>✓ TypeScript 5.9 - Type-safe development</li>
              <li>✓ React Router v7 - Declarative routing</li>
              <li>✓ RSuite - React UI component library</li>
              <li>✓ Tailwind CSS 4 - Utility-first styling</li>
              <li>✓ Vite 7 - Lightning-fast development</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Backend
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Supabase - Backend as a Service</li>
              <li>✓ PostgreSQL - Cloud database</li>
              <li>✓ Supabase Auth - User authentication</li>
              <li>✓ Real-time subscriptions - Live updates</li>
              <li>✓ TypeScript services - Type-safe data layer</li>
            </ul>
          </div>
        </div>
      </Panel>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Panel bordered className="bg-white text-center p-6">
          <svg
            className="w-12 h-12 mx-auto text-blue-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Modern Stack
          </h3>
          <p className="text-gray-600">
            Built with the latest and greatest web technologies for optimal
            performance
          </p>
        </Panel>

        <Panel bordered className="bg-white text-center p-6">
          <svg
            className="w-12 h-12 mx-auto text-purple-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Quality Content
          </h3>
          <p className="text-gray-600">
            Curated articles covering best practices and real-world solutions
          </p>
        </Panel>

        <Panel bordered className="bg-white text-center p-6">
          <svg
            className="w-12 h-12 mx-auto text-green-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Fast & Responsive
          </h3>
          <p className="text-gray-600">
            Lightning-fast performance with a beautiful, responsive design
          </p>
        </Panel>
      </div>

      {/* Key Features */}
      <Panel bordered className="bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Features</h2>

        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="text-2xl">🔍</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Advanced Search
              </h4>
              <p className="text-gray-600">
                Full-text search across titles, content, and excerpts with tag
                filtering
              </p>
            </div>
          </div>

          <Divider />

          <div className="flex gap-4">
            <span className="text-2xl">📄</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Pagination</h4>
              <p className="text-gray-600">
                Smooth pagination with customizable page sizes and navigation
              </p>
            </div>
          </div>

          <Divider />

          <div className="flex gap-4">
            <span className="text-2xl">💬</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Comments System
              </h4>
              <p className="text-gray-600">
                Nested comments route with real-time interaction and user
                authentication
              </p>
            </div>
          </div>

          <Divider />

          <div className="flex gap-4">
            <span className="text-2xl">🎨</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Beautiful UI</h4>
              <p className="text-gray-600">
                Modern design with Tailwind CSS for a polished interface
              </p>
            </div>
          </div>

          <Divider />

          <div className="flex gap-4">
            <span className="text-2xl">🔐</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Protected Routes
              </h4>
              <p className="text-gray-600">
                Admin dashboard with route-level authentication and
                authorization
              </p>
            </div>
          </div>

          <Divider />

          <div className="flex gap-4">
            <span className="text-2xl">🗂️</span>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Supabase Backend
              </h4>
              <p className="text-gray-600">
                Cloud PostgreSQL database with authentication and real-time
                capabilities
              </p>
            </div>
          </div>
        </div>
      </Panel>

      {/* Demo Info */}
      <Panel bordered className="bg-blue-50 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Demo Information
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Login Credentials:</strong> Username:{' '}
            <code className="bg-blue-100 px-2 py-1 rounded">admin</code> (any
            password)
          </p>
          <p>
            <strong>Database:</strong> Powered by Supabase PostgreSQL with
            real-time capabilities
          </p>
          <p>
            <strong>Sample Data:</strong> Includes multiple posts, users, and
            comments for testing
          </p>
        </div>
      </Panel>
    </div>
  );
}
