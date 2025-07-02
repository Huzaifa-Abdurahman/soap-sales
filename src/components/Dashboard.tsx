'use client';

import { Sale } from '@/lib/types';
import { calculateStats } from '@/lib/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, DollarSign, Clock, Users } from 'lucide-react';

interface DashboardProps {
  sales: Sale[];
}

export default function Dashboard({ sales }: DashboardProps) {
  const stats = calculateStats(sales);

  // Prepare chart data
  const paymentData = [
    { name: 'Received', value: stats.receivedAmount, color: '#10b981' },
    { name: 'Pending', value: stats.pendingAmount, color: '#f59e0b' },
  ];

  // Sales by area
  const salesByArea = sales.reduce((acc, sale) => {
    acc[sale.area] = (acc[sale.area] || 0) + sale.soapBars;
    return acc;
  }, {} as Record<string, number>);

  const areaData = Object.entries(salesByArea).map(([area, quantity]) => ({
    area,
    quantity,
  }));

  const statCards = [
    {
      title: 'Total Sales',
      value: stats.salesCount,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
    },
    {
      title: 'Soap Bars Sold',
      value: stats.totalSoapBars,
      icon: Package,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
    },
    {
      title: 'Pending Amount',
      value: `₹${stats.pendingAmount.toFixed(2)}`,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
    },
  ];

  if (sales.length === 0) {
    return (
      <div className="space-y-6">
        <div className="card text-center py-12">
          <BarChart className="mx-auto text-sky-300 mb-4" style={{width: '64px', height: '64px'}} />
          <h3 className="text-xl font-semibold text-sky-800 mb-2">No Data Available</h3>
          <p className="text-sky-600">Add some sales to see your dashboard analytics!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sky-600">{stat.title}</p>
                <p className="text-2xl font-bold text-sky-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} 
                   style={{background: `linear-gradient(135deg, ${stat.color.includes('blue') ? '#3b82f6, #1d4ed8' : stat.color.includes('green') ? '#10b981, #059669' : stat.color.includes('purple') ? '#8b5cf6, #7c3aed' : '#f59e0b, #d97706'})`}}>
                <stat.icon className="text-white" style={{width: '24px', height: '24px'}} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Status Chart */}
        <div className="card">
          <h3 className="text-xl font-bold text-sky-900 mb-4">Payment Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ₹${value}`}
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Area Chart */}
        <div className="card">
          <h3 className="text-xl font-bold text-sky-900 mb-4">Sales by Area</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-xl font-bold text-sky-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-600 mb-1">Collection Rate</div>
            <div className="text-2xl font-bold text-green-700">
              {stats.totalRevenue > 0 ? ((stats.receivedAmount / stats.totalRevenue) * 100).toFixed(1) : 0}%
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600 mb-1">Average Sale</div>
            <div className="text-2xl font-bold text-blue-700">
              ₹{stats.salesCount > 0 ? (stats.totalRevenue / stats.salesCount).toFixed(2) : 0}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600 mb-1">Avg. Quantity</div>
            <div className="text-2xl font-bold text-purple-700">
              {stats.salesCount > 0 ? (stats.totalSoapBars / stats.salesCount).toFixed(1) : 0} units
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
