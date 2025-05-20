
import React from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';

const DatabasePage: React.FC = () => {
  const { t, language } = useLanguage();

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
                        <p className="text-sm text-muted-foreground">3 records</p>
                      </div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Database className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Products</p>
                        <p className="text-sm text-muted-foreground">3 records</p>
                      </div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Database className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Orders</p>
                        <p className="text-sm text-muted-foreground">3 records</p>
                      </div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Database className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="font-medium">Users</p>
                        <p className="text-sm text-muted-foreground">3 records</p>
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
