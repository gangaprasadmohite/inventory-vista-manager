
import { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProductTable from '@/components/Products/ProductTable';
import ProductFilters from '@/components/Products/ProductFilters';
import AddEditProductModal from '@/components/Products/AddEditProductModal';
import DeleteConfirmationDialog from '@/components/Products/DeleteConfirmationDialog';
import CategoryChart from '@/components/Dashboard/CategoryChart';
import { useProducts } from '@/hooks/useProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Product, ProductFormData } from '@/types/product';

const Index = () => {
  const {
    products,
    totalProducts,
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
  } = useProducts();

  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productsToDelete, setProductsToDelete] = useState<string[]>([]);

  // Handler for opening add product modal
  const handleAddProduct = () => {
    setProductToEdit(undefined);
    setIsAddEditModalOpen(true);
  };

  // Handler for opening edit product modal
  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsAddEditModalOpen(true);
  };

  // Handler for saving product (add or edit)
  const handleSaveProduct = (productData: ProductFormData) => {
    if (productToEdit) {
      updateProduct(productToEdit.id, productData);
    } else {
      addProduct(productData);
    }
    setIsAddEditModalOpen(false);
  };

  // Handler for deleting products
  const handleDeleteConfirm = (ids: string[]) => {
    setProductsToDelete(ids);
    setIsDeleteDialogOpen(true);
  };

  // Handler for search query changes
  const handleSearchChange = (query: string) => {
    setFilters({ ...filters, searchQuery: query });
  };

  return (
    <DashboardLayout 
      searchQuery={filters.searchQuery}
      onSearchChange={handleSearchChange}
    >
      <div className="grid gap-6">
        {/* Dashboard Summary */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold">{totalProducts}</div>
              <p className="text-sm text-muted-foreground">Total Products</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold">
                {products.filter(p => p.stock > 0).length}
              </div>
              <p className="text-sm text-muted-foreground">In Stock</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-3xl font-bold">
                {products.filter(p => p.stock < 10 && p.stock > 0).length}
              </div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-12">
          {/* Sidebar with filters */}
          <div className="md:col-span-3 space-y-6">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
            />
            
            <CategoryChart data={categoryStats} />
          </div>
          
          {/* Main content - Product table */}
          <div className="md:col-span-9">
            <Card>
              <CardContent className="p-6">
                <ProductTable
                  products={products}
                  selectedProductIds={selectedProductIds}
                  totalProducts={totalProducts}
                  pagination={pagination}
                  sort={sort}
                  onSortChange={setSort}
                  onPaginationChange={setPagination}
                  onToggleSelection={toggleProductSelection}
                  onToggleAllSelection={toggleAllSelection}
                  onAdd={handleAddProduct}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteConfirm}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <AddEditProductModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSave={handleSaveProduct}
        product={productToEdit}
      />
      
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          deleteProducts(productsToDelete);
          setIsDeleteDialogOpen(false);
          setProductsToDelete([]);
        }}
        count={productsToDelete.length}
      />
    </DashboardLayout>
  );
};

export default Index;
