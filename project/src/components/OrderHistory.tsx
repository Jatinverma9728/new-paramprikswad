import React, { useState } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'in transit' | 'processing' | 'cancelled';
  total: number;
  items: OrderItem[];
}

interface OrderHistoryProps {
  orders: Order[];
  onClose: () => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onClose }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' ? true : order.status === filterStatus;
    const matchesSearch = searchQuery === '' ? true : 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-white/80 text-amber-600 border-amber-200';
      case 'in transit':
        return 'bg-white/80 text-orange-600 border-orange-200';
      case 'processing':
        return 'bg-white/80 text-amber-600 border-amber-200';
      case 'cancelled':
        return 'bg-white/80 text-red-600 border-red-200';
      default:
        return 'bg-white/80 text-amber-600 border-amber-200';
    }
  };

  const handleTrackOrder = (orderId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      alert(`Tracking information for order ${orderId} will be displayed here`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative pb-4 mb-6">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Order History
          </h3>
          <button
            onClick={onClose}
            className="text-amber-600 hover:text-orange-500 transition-all duration-300 hover:rotate-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders..."
            className="w-full px-4 py-2 pl-10 rounded-xl border-2 border-amber-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-amber-900"
          />
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-amber-700 font-medium whitespace-nowrap">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-amber-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-amber-900"
          >
            <option value="all">All Orders</option>
            <option value="delivered">Delivered</option>
            <option value="in transit">In Transit</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-amber-500 animate-bounce">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-amber-800 mb-2">No Orders Found</h3>
            <p className="text-amber-600">
              {searchQuery ? 'Try different search terms or' : 'Try'} adjusting your filter criteria
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map(order => (
              <div
                key={order.id}
                className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl shadow-2xl transform transition-all duration-500 hover:shadow-amber-200/50 border border-white/50 hover:scale-[1.02]"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-lg font-semibold text-amber-800">
                        Order #{order.id}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-amber-600">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-800">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-amber-600">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrackOrder(order.id);
                      }}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-xl hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 font-medium shadow-lg hover:shadow-amber-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : 'Track Order'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-30 backdrop-blur-md">
          <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-2xl mx-4 transform transition-all duration-500 hover:shadow-amber-200/50 border border-white/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Order Details
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-amber-600 hover:text-orange-500 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-amber-200">
                <div>
                  <p className="text-amber-800 font-medium">Order #{selectedOrder.id}</p>
                  <p className="text-amber-600">
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div>
                      <p className="text-amber-800 font-medium">{item.name}</p>
                      <p className="text-amber-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-amber-800 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-amber-200">
                <span className="text-lg font-semibold text-amber-800">Total</span>
                <span className="text-lg font-bold text-amber-800">
                  ${selectedOrder.total.toFixed(2)}
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    alert('Reorder functionality coming soon!');
                    setSelectedOrder(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transform hover:scale-[1.02] transition-all duration-300 font-medium shadow-lg hover:shadow-amber-200/50"
                >
                  Reorder
                </button>
                <button
                  onClick={() => {
                    alert('Download invoice functionality coming soon!');
                    setSelectedOrder(null);
                  }}
                  className="flex-1 border-2 border-amber-200 text-amber-700 py-3 rounded-xl hover:bg-amber-50 hover:border-amber-300 transform hover:scale-[1.02] transition-all duration-300 font-medium"
                >
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 