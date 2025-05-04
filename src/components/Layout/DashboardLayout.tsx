
import { ReactNode } from 'react';
import Header from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const DashboardLayout = ({ children, searchQuery, onSearchChange }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <main className="flex-1 p-4 md:p-6 bg-gray-50/50">{children}</main>
    </div>
  );
};

export default DashboardLayout;
