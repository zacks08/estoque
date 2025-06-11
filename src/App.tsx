import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import PlaceholderPage from './components/PlaceholderPage';
import type { Product, DashboardStats, ActivePage } from './types';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      code: 'IPH15PM',
      category: 'Eletrônicos',
      quantity: 25,
      price: 8999.99,
      supplier: 'Apple Inc.',
      notes: 'Modelo premium com 256GB',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'MacBook Pro 14"',
      code: 'MBP14',
      category: 'Eletrônicos',
      quantity: 8,
      price: 12999.99,
      supplier: 'Apple Inc.',
      notes: 'M3 Pro, 18GB RAM, 512GB SSD',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '3',
      name: 'Camiseta Nike Dri-FIT',
      code: 'NIKE001',
      category: 'Roupas',
      quantity: 45,
      price: 129.90,
      supplier: 'Nike Brasil',
      notes: 'Disponível em várias cores e tamanhos',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: '4',
      name: 'Mesa de Escritório Ergonômica',
      code: 'MESA001',
      category: 'Casa e Jardim',
      quantity: 3,
      price: 899.99,
      supplier: 'Móveis & Cia',
      notes: 'Mesa com regulagem de altura',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '5',
      name: 'Tênis Adidas Ultraboost 22',
      code: 'ADID001',
      category: 'Esportes',
      quantity: 0,
      price: 899.99,
      supplier: 'Adidas Brasil',
      notes: 'Esgotado - aguardando reposição',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-25')
    },
    {
      id: '6',
      name: 'Samsung Galaxy S24 Ultra',
      code: 'SAMS24U',
      category: 'Eletrônicos',
      quantity: 15,
      price: 7499.99,
      supplier: 'Samsung Electronics',
      notes: 'Modelo top de linha com S Pen',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    }
  ]);

  const calculateStats = (): DashboardStats => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const recentProducts = products.filter(p => {
      const productDate = new Date(p.createdAt);
      const daysDiff = Math.floor((today.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff <= 7;
    }).length;

    const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

    const categoryDistribution = products.reduce((acc, product) => {
      const existing = acc.find(item => item.category === product.category);
      if (existing) {
        existing.count++;
      } else {
        acc.push({
          category: product.category,
          count: 1,
          color: getCategoryColor(product.category)
        });
      }
      return acc;
    }, [] as { category: string; count: number; color: string }[]);

    return {
      totalProducts: products.length,
      lowStockProducts: products.filter(p => p.quantity <= 10).length,
      recentProducts,
      totalValue,
      categoryDistribution
    };
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'Eletrônicos': '#3B82F6',
      'Roupas': '#EF4444',
      'Casa e Jardim': '#10B981',
      'Esportes': '#F59E0B',
      'Livros': '#8B5CF6',
      'Alimentação': '#F97316',
      'Beleza': '#EC4899',
      'Automóveis': '#6B7280'
    };
    return colors[category] || '#6B7280';
  };

  const handleAddProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleEditProduct = (id: string, productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setProducts(prev => prev.map(p => 
      p.id === id 
        ? { ...p, ...productData, updatedAt: new Date() }
        : p
    ));
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Dashboard';
      case 'products': return 'Produtos';
      case 'categories': return 'Categorias';
      case 'reports': return 'Relatórios';
      case 'settings': return 'Configurações';
      default: return 'Dashboard';
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard stats={calculateStats()} />;
      case 'products':
        return (
          <Products
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      case 'categories':
        return (
          <PlaceholderPage
            title="Categorias"
            description="Gerencie as categorias dos seus produtos de forma organizada."
          />
        );
      case 'reports':
        return (
          <PlaceholderPage
            title="Relatórios"
            description="Visualize relatórios detalhados sobre seu estoque e vendas."
          />
        );
      case 'settings':
        return (
          <PlaceholderPage
            title="Configurações"
            description="Configure as preferências do sistema e sua conta."
          />
        );
      default:
        return <Dashboard stats={calculateStats()} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onPageChange={setActivePage}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={getPageTitle()}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;