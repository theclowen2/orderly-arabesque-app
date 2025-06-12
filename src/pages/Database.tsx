
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const DatabasePage: React.FC = () => {
  const { t, language } = useLanguage();
  const [tableCounts, setTableCounts] = useState({
    customers: 0,
    products: 0,
    orders: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTableCounts = async () => {
      try {
        setLoading(true);
        
        // Fetch count of customers
        const { count: customersCount } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true });
        
        // Fetch count of products
        const { count: productsCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });
        
        // Fetch count of orders
        const { count: ordersCount } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });
        
        // Fetch count of users
        const { count: usersCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });

        setTableCounts({
          customers: customersCount || 0,
          products: productsCount || 0,
          orders: ordersCount || 0,
          users: usersCount || 0
        });
      } catch (error) {
        console.error('Error fetching table counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableCounts();
  }, []);

  return (
    <Layout>
      <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{t('database')}</h1>
          <p className="text-muted-foreground">Database management and backups</p>
        </div>

        <Tabs defaultValue="tables">
          <TabsList>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tables" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Tables</CardTitle>
                <CardDescription>Manage your database tables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Database className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Customers</p>
                        <p className="text-sm text-muted-foreground">
                          {loading ? 'Loading...' : `${tableCounts.customers} records`}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Database className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Products</p>
                        <p className="text-sm text-muted-foreground">
                          {loading ? 'Loading...' : `${tableCounts.products} records`}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Database className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Orders</p>
                        <p className="text-sm text-muted-foreground">
                          {loading ? 'Loading...' : `${tableCounts.orders} records`}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Database className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Users</p>
                        <p className="text-sm text-muted-foreground">
                          {loading ? 'Loading...' : `${tableCounts.users} records`}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="backups" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Backups</CardTitle>
                <CardDescription>Manage database backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Button>Create New Backup</Button>
                </div>
                <p className="text-muted-foreground">No backups available yet</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Settings</CardTitle>
                <CardDescription>Configure database connection</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Database configuration settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DatabasePage;
