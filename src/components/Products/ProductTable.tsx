
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  ChevronDown, 
  ChevronUp,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Product, SortField, SortDirection, SortState, PaginationState } from '@/types/product';

interface ProductTableProps {
  products: Product[];
  selectedProductIds: string[];
  totalProducts: number;
  pagination: PaginationState;
  sort: SortState;
  onSortChange: (sort: SortState) => void;
  onPaginationChange: (pagination: PaginationState) => void;
  onToggleSelection: (id: string) => void;
  onToggleAllSelection: () => void;
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (ids: string[]) => void;
}

const ProductTable = ({
  products,
  selectedProductIds,
  totalProducts,
  pagination,
  sort,
  onSortChange,
  onPaginationChange,
  onToggleSelection,
  onToggleAllSelection,
  onAdd,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const allSelected = 
    products.length > 0 && selectedProductIds.length === products.length;
    
  const handleSort = (field: SortField) => {
    const direction: SortDirection = 
      sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ field, direction });
  };

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    const totalPages = Math.ceil(totalProducts / pagination.pageSize);
    if (page > totalPages) return;
    
    onPaginationChange({
      ...pagination,
      page,
    });
  };
  
  const renderSortIcon = (field: SortField) => {
    if (sort.field !== field) return null;
    
    return sort.direction === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };
  
  const renderStockStatus = (stock: number) => {
    if (stock <= 0) {
      return <XCircle className="h-5 w-5 text-destructive" />;
    } else if (stock < 10) {
      return <AlertTriangle className="h-5 w-5 text-inventory-yellow" />;
    } else {
      return <CheckCircle className="h-5 w-5 text-inventory-green" />;
    }
  };

  const getPaginationArray = () => {
    const totalPages = Math.ceil(totalProducts / pagination.pageSize);
    const { page } = pagination;
    
    // Show up to 5 page numbers with current page in the middle when possible
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4 && totalPages > 5) {
      startPage = Math.max(1, endPage - 4);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {products.length} of {totalProducts} products
        </div>
        <div className="flex space-x-2">
          {selectedProductIds.length > 0 && (
            <Button 
              variant="destructive"
              size="sm"
              onClick={() => onDelete(selectedProductIds)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete {selectedProductIds.length} Selected
            </Button>
          )}
          <Button onClick={onAdd} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th className="w-[50px]">
                <Checkbox 
                  checked={allSelected}
                  onCheckedChange={onToggleAllSelection}
                  aria-label="Select all products"
                />
              </th>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Product Name
                  {renderSortIcon('name')}
                </div>
              </th>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center">
                  Category
                  {renderSortIcon('category')}
                </div>
              </th>
              <th 
                className="cursor-pointer text-right"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center justify-end">
                  Price
                  {renderSortIcon('price')}
                </div>
              </th>
              <th 
                className="cursor-pointer text-right"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center justify-end">
                  Stock
                  {renderSortIcon('stock')}
                </div>
              </th>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort('updatedAt')}
              >
                <div className="flex items-center">
                  Last Updated
                  {renderSortIcon('updatedAt')}
                </div>
              </th>
              <th className="text-right">Status</th>
              <th className="w-[100px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr 
                key={product.id}
                className={selectedProductIds.includes(product.id) ? 'selected' : ''}
              >
                <td>
                  <Checkbox 
                    checked={selectedProductIds.includes(product.id)}
                    onCheckedChange={() => onToggleSelection(product.id)}
                    aria-label={`Select ${product.name}`}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td className="text-right">${product.price.toFixed(2)}</td>
                <td className="text-right">{product.stock}</td>
                <td>
                  {product.updatedAt.toLocaleDateString()}
                </td>
                <td className="text-right">
                  {renderStockStatus(product.stock)}
                </td>
                <td className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete([product.id])}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-muted-foreground">
                  No products found. Try changing filters or add a product.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalProducts > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(pagination.page - 1)}
                className="cursor-pointer"
                aria-disabled={pagination.page === 1}
              />
            </PaginationItem>
            
            {getPaginationArray().map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={pagination.page === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(pagination.page + 1)}
                className="cursor-pointer"
                aria-disabled={pagination.page === Math.ceil(totalProducts / pagination.pageSize)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProductTable;
