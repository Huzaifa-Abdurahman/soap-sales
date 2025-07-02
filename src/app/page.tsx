'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Sale } from '@/lib/types';
import { STORAGE_KEY } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import SalesForm from '@/components/SalesForm';
import SalesList from '@/components/SalesList';

export default function Home() {
  const [sales, setSales] = useLocalStorage<Sale[]>(STORAGE_KEY, []);

  const handleAddSale = (newSale: Sale) => {
    setSales(prev => [newSale, ...prev]);
  };

  return (
  <>
      <Navigation />
      <main className="max-w-6xl mx-auto p-4 space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-sky-900 mb-4">
            Soap Sales Tracker
          </h1>
          <p className="text-xl text-sky-700">
            Manage your soap business sales and track payments efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesForm onAddSale={handleAddSale} />
          <SalesList sales={sales} />
        </div>

        {sales.length > 0 && (
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-sky-100">
            <div className="text-sm text-sky-600 mb-2">Total Sales Recorded</div>
            <div className="text-3xl font-bold text-sky-900">{sales.length}</div>
          </div>
        )}
      </main>
    </>
  );
}