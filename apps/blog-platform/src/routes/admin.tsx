import { createFileRoute, Outlet, useMatches } from '@tanstack/react-router';
import { AdminPage } from '../pages/AdminPage';

export const Route = createFileRoute('/admin')({
  component: AdminLayoutComponent,
});

function AdminLayoutComponent() {
  const matches = useMatches();

  // Check if we're at /admin (index) or a child route like /admin/posts
  const currentMatch = matches[matches.length - 1];
  const isAdminIndex = currentMatch?.routeId === '/admin';

  if (isAdminIndex) {
    return <AdminPage />;
  }

  return <Outlet />;
}
