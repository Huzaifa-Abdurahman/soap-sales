import { Sale, DashboardStats } from './types';

export const STORAGE_KEY = 'soap_sales_data';

export function calculateStats(sales: Sale[]): DashboardStats {
  return sales.reduce(
    (stats, sale) => ({
      totalSales: stats.totalSales + 1,
      totalSoapBars: stats.totalSoapBars + sale.soapBars,
      totalRevenue: stats.totalRevenue + sale.totalPayment,
      pendingAmount: stats.pendingAmount + sale.pendingPayment,
      receivedAmount: stats.receivedAmount + sale.receivedPayment,
      salesCount: stats.salesCount + 1,
    }),
    {
      totalSales: 0,
      totalSoapBars: 0,
      totalRevenue: 0,
      pendingAmount: 0,
      receivedAmount: 0,
      salesCount: 0,
    }
  );
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}