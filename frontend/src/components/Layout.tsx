import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowRightLeft } from 'lucide-react';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">StockMaster</h1>
          <p className="text-sm text-gray-600 mt-2">Inventory Management</p>
        </div>
        <nav className="mt-6">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
