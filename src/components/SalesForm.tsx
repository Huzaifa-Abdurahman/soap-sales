'use client';

import { useState } from 'react';
import { Sale } from '@/lib/types';
import { generateId } from '@/lib/storage';
import { Plus, Calculator } from 'lucide-react';

interface SalesFormProps {
  onAddSale: (sale: Sale) => void;
}

export default function SalesForm({ onAddSale }: SalesFormProps) {
  const [formData, setFormData] = useState({
    shopKeeperName: '',
    area: '',
    soapBars: '',
    totalPayment: '',
    receivedPayment: '',
    phoneNumber: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculatePendingPayment = () => {
    const total = parseFloat(formData.totalPayment) || 0;
    const received = parseFloat(formData.receivedPayment) || 0;
    return Math.max(0, total - received);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newSale: Sale = {
      id: generateId(),
      shopKeeperName: formData.shopKeeperName,
      area: formData.area,
      soapBars: parseInt(formData.soapBars) || 0,
      totalPayment: parseFloat(formData.totalPayment) || 0,
      receivedPayment: parseFloat(formData.receivedPayment) || 0,
      pendingPayment: calculatePendingPayment(),
      phoneNumber: formData.phoneNumber,
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now(),
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    onAddSale(newSale);
    
    // Reset form
    setFormData({
      shopKeeperName: '',
      area: '',
      soapBars: '',
      totalPayment: '',
      receivedPayment: '',
      phoneNumber: '',
    });

    setIsSubmitting(false);
  };

  const pendingPayment = calculatePendingPayment();

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Plus className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-bold text-sky-900">Add New Sale</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-sky-800 mb-2">
              Shop Keeper Name *
            </label>
            <input
              type="text"
              name="shopKeeperName"
              value={formData.shopKeeperName}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter shop keeper name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-sky-800 mb-2">
              Area/Village *
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter area or village"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-sky-800 mb-2">
              Soap Bars/Boxes *
            </label>
            <input
              type="number"
              name="soapBars"
              value={formData.soapBars}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter quantity"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-sky-800 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-sky-800 mb-2">
              Total Payment *
            </label>
            <input
              type="number"
              name="totalPayment"
              value={formData.totalPayment}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter total amount"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-sky-800 mb-2">
              Received Payment
            </label>
            <input
              type="number"
              name="receivedPayment"
              value={formData.receivedPayment}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter received amount"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {(formData.totalPayment || formData.receivedPayment) && (
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calculator className="text-sky-600" size={16} />
              <span className="text-sm font-semibold text-sky-800">Payment Calculation</span>
            </div>
            <div className="text-lg font-bold text-sky-900">
              Pending Payment: ₹{pendingPayment.toFixed(2)}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Adding Sale...' : 'Add Sale'}
        </button>
      </form>
    </div>
  );
}
