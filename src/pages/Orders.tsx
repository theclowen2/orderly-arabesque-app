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
import AddOrderDialog from '../components/dialogs/AddOrderDialog';
import EditOrderDialog from '../components/dialogs/EditOrderDialog';
import OrderDetailsDialog from '../components/dialogs/OrderDetailsDialog';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Orders: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const queryClient = useQueryClient();

  // Fetch orders with customer and product data
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customers (name),
          products (name, front_image)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Update order mutation
  const updateOrderMutation = useMutation({
    mutationFn: async (updatedOrder: any) => {
      const { data, error } = await supabase
        .from('orders')
        .update({
          customer_id: updatedOrder.customer_id,
          product_id: updatedOrder.product_id,
          status: updatedOrder.status,
          order_date: updatedOrder.order_date,
          notes: updatedOrder.notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedOrder.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order Updated",
        description: "Order has been successfully updated",
      });
      console.log("Order updated:", data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update order",
        variant: "destructive",
      });
      console.error("Error updating order:", error);
    }
  });

  // Delete order mutation
  const deleteOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order Deleted",
        description: "Order has been successfully deleted",
        variant: "destructive",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
      console.error("Error deleting order:", error);
    }
  });

  const handleAddOrder = () => {
    setIsAddDialogOpen(true);
    console.log("Add order dialog opened");
  };

  const handleAddOrderSubmit = async (orderData: {
    customer: string;
    product: string;
    frontImage: string;
    backImage: string;
    date: string;
    status: string;
  }) => {
    try {
      // First, get customer and product IDs
      const { data: customers } = await supabase
        .from('customers')
        .select('id')
        .eq('name', orderData.customer)
        .single();

      const { data: products } = await supabase
        .from('products')
        .select('id')
        .eq('name', orderData.product)
        .single();

      if (!customers || !products) {
        toast({
          title: "Error",
          description: "Customer or product not found",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          customer_id: customers.id,
          product_id: products.id,
          status: orderData.status as any,
          order_date: orderData.date,
          front_image: orderData.frontImage,
          back_image: orderData.backImage,
          notes: ''
        }])
        .select()
        .single();

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order Added",
        description: `Order for ${orderData.customer} has been created successfully`,
      });
      console.log("New order added:", data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create order",
        variant: "destructive",
      });
      console.error("Error creating order:", error);
    }
  };

  const handleViewDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setShowDetailsDialog(true);
      console.log("View details clicked for order ID:", orderId);
    }
  };

  const handleEditOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setEditingOrder(order);
      setShowEditDialog(true);
      console.log("Edit order clicked for ID:", orderId);
    }
  };

  const handleUpdateOrder = (updatedOrder: any) => {
    updateOrderMutation.mutate(updatedOrder);
  };

  const handleDeleteOrder = (orderId: string) => {
    deleteOrderMutation.mutate(orderId);
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

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading orders...</div>
        </div>
      </Layout>
    );
  }

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
                  <TableCell className="font-medium">{order.customers?.name}</TableCell>
                  <TableCell>{order.products?.name}</TableCell>
                  <TableCell>{order.order_date}</TableCell>
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
                        disabled={deleteOrderMutation.isPending}
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

        <AddOrderDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddOrderSubmit}
        />

        <EditOrderDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onSubmit={handleUpdateOrder}
          order={editingOrder}
        />

        <OrderDetailsDialog
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
          order={selectedOrder}
        />
      </div>
    </Layout>
  );
};

export default Orders;
