
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Category } from '@/types/product';

interface CategoryStat {
  name: string;
  value: number;
}

interface CategoryChartProps {
  data: CategoryStat[];
}

const COLORS = [
  '#0EA5E9', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
];

const CategoryChart = ({ data }: CategoryChartProps) => {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      name: item.name,
      value: item.value,
    }));
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products by Category</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => 
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
