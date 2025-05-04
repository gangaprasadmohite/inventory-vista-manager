
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FilterState, Category } from '@/types/product';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const CATEGORIES: Category[] = ['Electronics', 'Clothing', 'Food', 'Furniture', 'Books'];

const ProductFilters = ({ filters, onFilterChange }: ProductFiltersProps) => {
  const handleCategoryToggle = (category: Category) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({
      ...filters,
      categories,
    });
  };

  const handleStockToggle = (checked: boolean) => {
    onFilterChange({
      ...filters,
      onlyInStock: checked,
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label 
                    htmlFor={`category-${category}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Availability</h3>
            <div className="flex items-center space-x-2">
              <Switch
                id="stock-filter"
                checked={filters.onlyInStock}
                onCheckedChange={handleStockToggle}
              />
              <Label htmlFor="stock-filter" className="cursor-pointer">
                In Stock Only
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
