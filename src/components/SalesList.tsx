'use client';

import { Sale } from '@/lib/types';
import { Calendar, MapPin, Package, Phone, DollarSign, Clock } from 'lucide-react';

interface SalesListProps {
  sales: Sale[];
}

export default function SalesList({ sales }: SalesListProps) {
  const sortedSales = [...sales].sort((a, b) => b.createdAt - a.createdAt);

  if (sales.length === 0) {
    return (
      <div className="card text-center py-12">
        <Package className="mx-auto text-sky-300 mb-4" style={{width: '64px', height: '64px'}} />
        <h3 className="text-xl font-semibold text-sky-800 mb-2">No Sales Yet</h3>
        <p className="text-sky-600">Add your first sale to get started!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-sky-900 mb-6">Recent Sales</h2>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedSales.map((sale) => (
          <div
            key={sale.id}
            className="bg-sky-50 border border-sky-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-sky-900 text-lg">{sale.shopKeeperName}</h3>
                <div className="flex items-center space-x-1 text-sky-600">
                  <MapPin size={14} />
                  <span className="text-sm">{sale.area}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-sky-600 mb-1">
                  <Calendar size={14} />
                  <span className="text-sm">{sale.date}</span>
                </div>
                {sale.phoneNumber && (
                  <div className="flex items-center space-x-1 text-sky-600">
                    <Phone size={14} />
                    <span className="text-sm">{sale.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-3 text-center">
                <Package className="mx-auto text-sky-500 mb-1" size={16} />
                <div className="text-sm text-sky-600">Quantity</div>
                <div className="font-semibold text-sky-900">{sale.soapBars}</div>
              </div>

              <div className="bg-white rounded-lg p-3 text-center">
                <DollarSign className="mx-auto text-green-500 mb-1" size={16} />
                <div className="text-sm text-sky-600">Total</div>
                <div className="font-semibold text-sky-900">₹{sale.totalPayment}</div>
              </div>

              <div className="bg-white rounded-lg p-3 text-center">
                <DollarSign className="mx-auto text-blue-500 mb-1" size={16} />
                <div className="text-sm text-sky-600">Received</div>
                <div className="font-semibold text-sky-900">₹{sale.receivedPayment}</div>
              </div>

              <div className="bg-white rounded-lg p-3 text-center">
                <Clock className="mx-auto text-orange-500 mb-1" size={16} />
                <div className="text-sm text-sky-600">Pending</div>
                <div className="font-semibold text-sky-900">₹{sale.pendingPayment}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}