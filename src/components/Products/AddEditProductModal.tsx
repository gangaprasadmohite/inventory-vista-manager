
import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Product, ProductFormData, Category } from '@/types/product';
import { toast } from 'sonner';

interface AddEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
  product?: Product;
}

const CATEGORIES: Category[] = ['Electronics', 'Clothing', 'Food', 'Furniture', 'Books'];

const AddEditProductModal = ({ isOpen, onClose, onSave, product }: AddEditProductModalProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'Electronics',
    price: 0,
    stock: 0,
    description: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Reset form data when the product prop changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description || '',
      });
    } else {
      // Reset form for new product
      setFormData({
        name: '',
        category: 'Electronics',
        price: 0,
        stock: 0,
        description: '',
      });
    }
    
    // Clear errors
    setErrors({});
  }, [product, isOpen]);
  
  const handleChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field is changed
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (formData.price < 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (formData.stock < 0) {
      newErrors.stock = 'Stock must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    } else {
      toast.error('Please fix the form errors');
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-right">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value as Category)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price" className="text-right">
                Price ($) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                className={errors.price ? 'border-destructive' : ''}
              />
              {errors.price && (
                <p className="text-xs text-destructive">{errors.price}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-right">
                Stock <span className="text-destructive">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                min="0"
                step="1"
                value={formData.stock}
                onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                className={errors.stock ? 'border-destructive' : ''}
              />
              {errors.stock && (
                <p className="text-xs text-destructive">{errors.stock}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {product ? 'Update Product' : 'Add Product'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProductModal;
