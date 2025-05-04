# Inventory Vista - Product Management Dashboard

## Overview

Inventory Vista is a powerful yet easy-to-use product management dashboard built with React, TypeScript, and Tailwind CSS. It provides businesses with a comprehensive solution for tracking, managing, and analyzing their inventory data.

## Features

### Product Management

- **View Products**: Browse through your entire inventory with a responsive data table
- **Add/Edit Products**: Easily update product information through an intuitive modal interface
- **Delete Products**: Remove single products or perform batch deletions with confirmation safeguards
- **Multi-select**: Select multiple products for batch operations

### Advanced Filtering & Sorting

- **Category Filtering**: Filter products by multiple categories (Electronics, Clothing, Food, Furniture, Books)
- **Stock Availability**: Toggle to view only in-stock products
- **Search**: Quickly find products with the global search functionality
- **Sorting**: Sort by name, category, price, or stock levels

### Dashboard Analytics

- **Inventory Overview**: Get a quick snapshot of your inventory status
- **Category Distribution**: Visualize product distribution across categories
- **Stock Alerts**: Easily identify products with low stock

## Technical Stack

- **Frontend**: React with TypeScript
- **State Management**: Custom hooks for state management
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts for data visualization
- **Form Handling**: React Hook Form with validation
- **UI Components**: Shadcn UI component library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/gangaprasadmohite/inventory-vista-manager.git

# Navigate to project directory
cd inventory-vista-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Usage Guide

### Product Table

The product table displays all your inventory items with the following information:

- Product name
- Category
- Price
- Stock quantity
- Last updated date

### Adding a Product

1. Click the "Add Product" button above the product table
2. Fill in the required fields in the modal form
3. Click "Save" to add the product to your inventory

### Editing a Product

1. Click the edit icon next to the product you want to modify
2. Update the information in the modal form
3. Click "Save" to apply your changes

### Filtering Products

Use the sidebar filters to:

- Select specific product categories
- Show only in-stock items
- Use the search bar in the header to find products by name or description

## Customization

The application is built with modularity in mind, making it easy to extend and customize:

- Add new product categories by updating the product types
- Customize the filter options to match your business needs
- Extend the chart components to visualize additional metrics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Charts powered by [Recharts](https://recharts.org/)

---

**Inventory Vista** - Take control of your inventory today!
