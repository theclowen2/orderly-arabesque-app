
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data
const initialOrders = [
  { 
    id: 1, 
    customer: 'John Doe', 
    product: 'Custom Cabinet', 
    frontImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 
    backImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    date: '2023-05-15',
    status: 'completed'
  },
  { 
    id: 2, 
    customer: 'Jane Smith', 
    product: 'Wooden Table', 
    frontImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 
    backImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    date: '2023-05-18',
    status: 'in-design'
  },
  { 
    id: 3, 
    customer: 'Mike Johnson', 
    product: 'Kitchen Drawer', 
    frontImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 
    backImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    date: '2023-05-20',
    status: 'pending'
  },
];

const Orders: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [orders, setOrders] = useState(initialOrders);

  const handleAddOrder = () => {
    toast({
      title: "Add Order",
      description: "Add order functionality will be implemented here",
    });
    console.log("Add order clicked");
  };

  const handleViewDetails = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    toast({
      title: "Order Details",
      description: `Viewing details for order #${orderId} - ${order?.product}`,
    });
    console.log("View details clicked for order ID:", orderId);
  };

  const handleEditOrder = (orderId: number) => {
    toast({
      title: "Edit Order",
      description: `Editing order with ID: ${orderId}`,
    });
    console.log("Edit order clicked for ID:", orderId);
  };

  const handleDeleteOrder = (orderId: number) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    toast({
      title: "Order Deleted",
      description: "Order has been successfully deleted",
      variant: "destructive",
    });
    console.log("Delete order clicked for ID:", orderId);
  };

  const getStatusBadge = (status: string) => {
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
    <Layout>
      <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('orders')}</h1>
          <Button onClick={handleAddOrder}>
            <Plus className="mr-2 h-4 w-4" /> 
            Add {t('orders')}
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('products')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(order.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditOrder(order.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
