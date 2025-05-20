
import React from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, CheckCircle } from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBgColor: string;
}> = ({ title, value, icon, iconBgColor }) => {
  return (
    <Card>
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div className={`p-2 rounded-full ${iconBgColor}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

const RecentOrderItem: React.FC<{
  customer: string;
  product: string;
  date: string;
  status: 'completed' | 'in-design' | 'rejected' | 'pending';
}> = ({ customer, product, date, status }) => {
  const { t } = useLanguage();
  
  const getStatusBadge = () => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 rounded-full status-completed text-xs font-medium">{t('completed')}</span>;
      case 'in-design':
        return <span className="px-2 py-1 rounded-full status-in-design text-xs font-medium">{t('inDesign')}</span>;
      case 'rejected':
        return <span className="px-2 py-1 rounded-full status-rejected text-xs font-medium">{t('rejected')}</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full status-pending text-xs font-medium">{t('pendingOrders')}</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-none">
      <div>
        <p className="font-medium">{customer}</p>
        <p className="text-sm text-muted-foreground">{product}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-muted-foreground">{date}</p>
        {getStatusBadge()}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();

  // Mock data - in a real app, this would come from API
  const stats = {
    totalOrders: 3,
    pendingOrders: 1,
    inProgress: 1,
    completed: 1
  };

  const recentOrders = [
    {
      id: 1,
      customer: 'John Doe',
      product: 'Custom Cabinet',
      date: '2023-05-15',
      status: 'completed' as const
    },
    {
      id: 2,
      customer: 'Jane Smith',
      product: 'Wooden Table',
      date: '2023-05-18',
      status: 'in-design' as const
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      product: 'Kitchen Drawer',
      date: '2023-05-20',
      status: 'pending' as const
    }
  ];

  return (
    <Layout>
      <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
          <p className="text-muted-foreground">{t('overview')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title={t('totalOrders')} 
            value={stats.totalOrders} 
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            iconBgColor="bg-blue-100"
          />
          <StatCard 
            title={t('pendingOrders')} 
            value={stats.pendingOrders} 
            icon={<Clock className="h-6 w-6 text-yellow-600" />}
            iconBgColor="bg-yellow-100"
          />
          <StatCard 
            title={t('inProgressOrders')} 
            value={stats.inProgress} 
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            iconBgColor="bg-blue-100"
          />
          <StatCard 
            title={t('completedOrders')} 
            value={stats.completed} 
            icon={<CheckCircle className="h-6 w-6 text-green-600" />}
            iconBgColor="bg-green-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('recentOrders')}</CardTitle>
              <a href="/orders" className="text-sm text-primary hover:underline">{t('viewAll')}</a>
            </CardHeader>
            <CardContent>
              {recentOrders.map(order => (
                <RecentOrderItem 
                  key={order.id}
                  customer={order.customer}
                  product={order.product}
                  date={order.date}
                  status={order.status}
                />
              ))}
            </CardContent>
          </Card>

          {/* Recent Customers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('customers')}</CardTitle>
              <a href="/customers" className="text-sm text-primary hover:underline">{t('viewAll')}</a>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-white">
                    J
                  </div>
                  <p>John Doe</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-white">
                    J
                  </div>
                  <p>Jane Smith</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-white">
                    M
                  </div>
                  <p>Mike Johnson</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
