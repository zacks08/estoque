export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  quantity: number;
  price: number;
  supplier?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  recentProducts: number;
  totalValue: number;
  categoryDistribution: { category: string; count: number; color: string }[];
}

export type Theme = 'light' | 'dark';

export type ActivePage = 'dashboard' | 'products' | 'categories' | 'reports' | 'settings';