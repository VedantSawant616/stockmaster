import { useState } from 'react';
import { Package, ArrowRightLeft, TruckIcon, AlertCircle, Plus } from 'lucide-react';

const Operations = () => {
  const [activeTab, setActiveTab] = useState<'receipt' | 'delivery' | 'transfer' | 'adjustment'>('receipt');

  const operationTypes = [
    { id: 'receipt', label: 'Receipts', icon: Package, color: 'bg-green-100 text-green-600' },
    { id: 'delivery', label: 'Deliveries', icon: TruckIcon, color: 'bg-blue-100 text-blue-600' },
    { id: 'transfer', label: 'Transfers', icon: ArrowRightLeft, color: 'bg-purple-100 text-purple-600' },
    { id: 'adjustment', label: 'Adjustments', icon: AlertCircle, color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Operations</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          New Operation
        </button>
      </div>

      {/* Operation Type Tabs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {operationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id as any)}
              className={`p-4 rounded-lg border-2 transition-all ${
                activeTab === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className={`p-3 rounded-full ${type.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-center font-semibold text-gray-700">{type.label}</div>
            </button>
          );
        })}
      </div>

      {/* Workflow Example Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2 text-blue-600" />
          Example Workflow: Steel Inventory Management
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Step 1: Receipt */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-700">Step 1: Receipt</div>
                <div className="text-xs text-gray-500">Vendor Delivery</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">Receive 100 kg Steel</div>
            <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
              Stock: <span className="font-bold">+100 kg</span>
            </div>
          </div>

          {/* Step 2: Transfer */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-purple-100 rounded-full mr-3">
                <ArrowRightLeft className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-700">Step 2: Transfer</div>
                <div className="text-xs text-gray-500">Internal Move</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">Main Store → Production</div>
            <div className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
              Stock: <span className="font-bold">Unchanged</span>
            </div>
          </div>

          {/* Step 3: Delivery */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <TruckIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-700">Step 3: Delivery</div>
                <div className="text-xs text-gray-500">Customer Order</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">Deliver 20 kg Steel</div>
            <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
              Stock: <span className="font-bold">-20 kg</span>
            </div>
          </div>

          {/* Step 4: Adjustment */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-red-100 rounded-full mr-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-700">Step 4: Adjustment</div>
                <div className="text-xs text-gray-500">Damage/Loss</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">3 kg Steel Damaged</div>
            <div className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
              Stock: <span className="font-bold">-3 kg</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 flex items-center">
          <div className="w-full h-px bg-gray-300 mr-2"></div>
          <span className="whitespace-nowrap">All operations logged in Stock Ledger</span>
          <div className="w-full h-px bg-gray-300 ml-2"></div>
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
          {activeTab} Operations
        </h3>
        
        {/* Mock Operations Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Quantity</th>
                {activeTab === 'transfer' && (
                  <>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">From</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">To</th>
                  </>
                )}
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Mock Data */}
              {activeTab === 'receipt' && (
                <>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">Nov 22, 2025</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Intel Core i9-14900K</td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold">+50 units</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Completed</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 cursor-pointer">View</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">Nov 21, 2025</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">NVIDIA RTX 4090</td>
                    <td className="px-4 py-3 text-sm text-green-600 font-semibold">+10 units</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Completed</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 cursor-pointer">View</td>
                  </tr>
                </>
              )}

              {activeTab === 'delivery' && (
                <>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">Nov 22, 2025</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">AMD Ryzen 9 7950X</td>
                    <td className="px-4 py-3 text-sm text-blue-600 font-semibold">-15 units</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Shipped</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 cursor-pointer">View</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">Nov 21, 2025</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Samsung 990 Pro 2TB</td>
                    <td className="px-4 py-3 text-sm text-blue-600 font-semibold">-8 units</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">Pending</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 cursor-pointer">View</td>
                  </tr>
                </>
              )}

              {activeTab === 'transfer' && (
                <>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">Nov 22, 2025</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Corsair RM1000x 1000W</td>
                    <td className="px-4 py-3 text-sm text-purple-600 font-semibold">25 units</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Main Warehouse</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Retail Store</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">Completed</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 cursor-pointer">View</td>
                  </tr>
                </>
              )}

              {activeTab === 'adjustment' && (
                <>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">Nov 20, 2025</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Thermal Paste - Arctic MX-6</td>
                    <td className="px-4 py-3 text-sm text-red-600 font-semibold">-2 tubes</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">Damaged</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 cursor-pointer">View</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Operations;
