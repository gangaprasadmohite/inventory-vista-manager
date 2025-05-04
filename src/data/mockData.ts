
import { Product, Category } from '../types/product';

const generateRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateMockProducts = (): Product[] => {
  const categories: Category[] = ['Electronics', 'Clothing', 'Food', 'Furniture', 'Books'];
  const products: Product[] = [];

  const electronicsItems = ['Smartphone', 'Laptop', 'Headphones', 'Tablet', 'Smart Watch', 'Camera', 'Speaker'];
  const clothingItems = ['T-shirt', 'Jeans', 'Sweater', 'Jacket', 'Dress', 'Socks', 'Shoes'];
  const foodItems = ['Pasta', 'Rice', 'Cereal', 'Coffee', 'Tea', 'Chocolate', 'Snacks'];
  const furnitureItems = ['Chair', 'Table', 'Sofa', 'Desk', 'Bookshelf', 'Bed', 'Lamp'];
  const booksItems = ['Fiction', 'History', 'Science', 'Biography', 'Art', 'Business', 'Technology'];

  const categoryItems = {
    'Electronics': electronicsItems,
    'Clothing': clothingItems,
    'Food': foodItems,
    'Furniture': furnitureItems,
    'Books': booksItems
  };

  let id = 1;
  
  // Generate multiple products for each category
  categories.forEach(category => {
    const items = categoryItems[category];
    
    items.forEach(item => {
      // Generate 1-3 variations of each item
      const variations = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < variations; i++) {
        const now = new Date();
        const pastDate = new Date(now);
        pastDate.setMonth(now.getMonth() - 6);
        
        const createdAt = generateRandomDate(pastDate, now);
        const updatedAt = generateRandomDate(createdAt, now);
        
        const stock = Math.floor(Math.random() * 100);
        const price = Number((Math.random() * 500 + 10).toFixed(2));
        
        const variation = i > 0 ? ` ${['Premium', 'Deluxe', 'Standard'][i - 1]}` : '';
        const name = `${item}${variation}`;
        
        products.push({
          id: id.toString(),
          name,
          category,
          price,
          stock,
          createdAt,
          updatedAt,
          description: `High-quality ${name.toLowerCase()} for all your needs.`
        });
        
        id++;
      }
    });
  });

  return products;
};

export const mockProducts = generateMockProducts();
