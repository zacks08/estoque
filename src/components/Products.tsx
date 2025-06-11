import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import type { Product } from '../types';

interface ProductsProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onEditProduct: (id: string, product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDeleteProduct: (id: string) => void;
}

export default function Products({ products, onAddProduct, onEditProduct, onDeleteProduct }: ProductsProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProduct) {
      onEditProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Produtos</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie seu inventário de produtos</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          Adicionar Produto
        </button>
      </div>

      {/* Products Table */}
      <ProductTable 
        products={products}
        onEdit={handleEditProduct}
        onDelete={onDeleteProduct}
      />

      {/* Product Form */}
      <ProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
      />
    </div>
  );
}