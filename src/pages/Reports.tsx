
import React from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data
const monthlyData = [
  { name: 'Jan', orders: 12 },
  { name: 'Feb', orders: 15 },
  { name: 'Mar', orders: 18 },
  { name: 'Apr', orders: 22 },
  { name: 'May', orders: 19 },
  { name: 'Jun', orders: 25 },
];

const statusData = [
  { name: 'Completed', value: 45 },
  { name: 'In Design', value: 30 },
  { name: 'Pending', value: 15 },
  { name: 'Rejected', value: 10 },
];

const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#F44336'];

const Reports: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <Layout>
      <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{t('reports')}</h1>
          <p className="text-muted-foreground">Analytics and reporting for your order management</p>
        </div>

        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders Reports</TabsTrigger>
            <TabsTrigger value="customers">Customer Reports</TabsTrigger>
            <TabsTrigger value="products">Product Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Orders</CardTitle>
                  <CardDescription>Order trends over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="orders" fill="#1F4690" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Order Status Distribution</CardTitle>
                  <CardDescription>Current status of all orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="customers" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reports</CardTitle>
                <CardDescription>Detailed customer analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Customer reporting features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Reports</CardTitle>
                <CardDescription>Detailed product analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Product reporting features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
