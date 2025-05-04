
export type Category = 'Electronics' | 'Clothing' | 'Food' | 'Furniture' | 'Books';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  image?: string;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export type FilterState = {
  categories: Category[];
  onlyInStock: boolean;
  searchQuery: string;
};

export type SortField = 'name' | 'category' | 'price' | 'stock' | 'updatedAt';
export type SortDirection = 'asc' | 'desc';

export type SortState = {
  field: SortField;
  direction: SortDirection;
};

export type PaginationState = {
  page: number;
  pageSize: number;
  totalItems: number;
};
