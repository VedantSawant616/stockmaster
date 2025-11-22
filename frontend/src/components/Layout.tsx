import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowRightLeft, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';

const Layout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; full_name: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/register');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">StockMaster</h1>
          <p className="text-sm text-gray-600 mt-2">Inventory Management</p>
        </div>
        <nav className="flex-1 mt-6">
          <Link to="/" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link to="/products" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
            <Package className="w-5 h-5 mr-3" />
            Products
          </Link>
          <Link to="/operations" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
            <ArrowRightLeft className="w-5 h-5 mr-3" />
            Operations
          </Link>
        </nav>
        
        {/* User Info & Logout */}
        <div className="border-t border-gray-200">
          {user && (
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user.full_name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
