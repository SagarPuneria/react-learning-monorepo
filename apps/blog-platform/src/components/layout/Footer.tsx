import { Divider } from 'rsuite';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">About TechBlog</h3>
            <p className="text-gray-300 text-sm">
              A modern blogging platform built with React, React Router v7, and
              Tailwind CSS. Showcasing the latest web development techniques and
              best practices.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/posts"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  All Posts
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Technologies</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• React 19</li>
              <li>• React Router v7</li>
              <li>• Tailwind CSS</li>
              <li>• SQL.js Database</li>
            </ul>
          </div>
        </div>
        <Divider className="bg-gray-600" />
        <div className="text-center text-sm text-gray-400 mt-6">
          <p>
            &copy; {new Date().getFullYear()} TechBlog. Built with ❤️ for
            learning purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
