
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex w-full justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Inventory Vista</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64 md:w-80 bg-background pl-8"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
