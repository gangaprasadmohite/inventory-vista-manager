
import { useState, useMemo, useCallback } from 'react';
import { mockProducts } from '../data/mockData';
import { Product, FilterState, SortState, PaginationState, ProductFormData, Category } from '../types/product';
import { toast } from '@/components/ui/sonner';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    onlyInStock: false,
    searchQuery: '',
  });
  const [sort, setSort] = useState<SortState>({
    field: 'name',
    direction: 'asc',
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    totalItems: mockProducts.length,
  });

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      
      // Stock filter
      if (filters.onlyInStock && product.stock <= 0) {
        return false;
      }
      
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          false
        );
      }
      
      return true;
    });
  }, [products, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const { field, direction } = sort;
      
      // Special case for date fields
      if (field === 'updatedAt') {
        return direction === 'asc'
          ? a.updatedAt.getTime() - b.updatedAt.getTime()
          : b.updatedAt.getTime() - a.updatedAt.getTime();
      }
      
      // For other fields
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredProducts, sort]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const { page, pageSize } = pagination;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    return sortedProducts.slice(start, end);
  }, [sortedProducts, pagination]);

  // Update pagination when filters change
  useMemo(() => {
    setPagination(prev => ({
      ...prev,
      page: 1, // Reset to first page
      totalItems: filteredProducts.length
    }));
  }, [filteredProducts]);

  // Product operations
  const addProduct = useCallback((productData: ProductFormData) => {
    const now = new Date();
    const newProduct: Product = {
      id: Date.now().toString(),
      ...productData,
      createdAt: now,
      updatedAt: now,
    };
    
    setProducts(prev => [...prev, newProduct]);
    toast.success('Product added successfully');
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, productData: Partial<ProductFormData>) => {
    setProducts(prev =>
      prev.map(product => {
        if (product.id === id) {
          return {
            ...product,
            ...productData,
            updatedAt: new Date(),
          };
        }
        return product;
      })
    );
    toast.success('Product updated successfully');
  }, []);

  const deleteProducts = useCallback((ids: string[]) => {
    setProducts(prev => prev.filter(product => !ids.includes(product.id)));
    setSelectedProductIds(prev => prev.filter(id => !ids.includes(id)));
    
    if (ids.length === 1) {
      toast.success('Product deleted successfully');
    } else {
      toast.success(`${ids.length} products deleted successfully`);
    }
  }, []);

  // Selection handling
  const toggleProductSelection = useCallback((id: string) => {
    setSelectedProductIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(productId => productId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const toggleAllSelection = useCallback(() => {
    if (selectedProductIds.length === paginatedProducts.length) {
      // Deselect all
      setSelectedProductIds([]);
    } else {
      // Select all visible products
      setSelectedProductIds(paginatedProducts.map(p => p.id));
    }
  }, [paginatedProducts, selectedProductIds]);

  // Calculate category stats for chart
  const categoryStats = useMemo(() => {
    const stats = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = 0;
      }
      acc[product.category] += 1;
      return acc;
    }, {} as Record<Category, number>);

    return Object.entries(stats).map(([category, count]) => ({
      name: category,
      value: count,
    }));
  }, [products]);

  return {
    products: paginatedProducts,
    totalProducts: filteredProducts.length,
    filters,
    setFilters,
    sort,
    setSort,
    pagination,
    setPagination,
    selectedProductIds,
    toggleProductSelection,
    toggleAllSelection,
    addProduct,
    updateProduct,
    deleteProducts,
    categoryStats,
  };
};
