export interface Sale {
    id: string;
    shopKeeperName: string;
    area: string;
    soapBars: number;
    totalPayment: number;
    receivedPayment: number;
    pendingPayment: number;
    phoneNumber: string;
    date: string;
    createdAt: number;
  }
  
  export interface DashboardStats {
    totalSales: number;
    totalSoapBars: number;
    totalRevenue: number;
    pendingAmount: number;
    receivedAmount: number;
    salesCount: number;
  }