'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Sale } from '@/lib/types';
import { STORAGE_KEY } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  const [sales] = useLocalStorage<Sale[]>(STORAGE_KEY, []);

  return (
    <>
      <Navigation />
      <main className="max-w-6xl mx-auto p-4 space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-sky-900 mb-4">
            Sales Dashboard
          </h1>
          <p className="text-xl text-sky-700">
            Track your business performance and payment status
          </p>
        </div>

        <Dashboard sales={sales} />
      </main>
    </>
  );
}
