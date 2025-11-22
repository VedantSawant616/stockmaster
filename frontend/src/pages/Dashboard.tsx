import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Package } from 'lucide-react';

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-red-600">12</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Receipts</p>
              <p className="text-2xl font-bold text-green-600">5</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Deliveries</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full text-orange-600">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="text-gray-500 text-center py-8">
          No recent activity to show.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
