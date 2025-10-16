import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Car, Users, Home } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Fahrzeuge', href: '/admin/vehicles', icon: Car },
    { name: 'Benutzer', href: '/admin/users', icon: Users },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white shadow-sm">
      <div className="p-6">
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-8"
        >
          <Home className="h-5 w-5" />
          <span>Zur Website</span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

