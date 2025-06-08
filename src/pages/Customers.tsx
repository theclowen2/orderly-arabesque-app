
import React, { useState, useEffect } from 'react';
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
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddCustomerDialog from '../components/dialogs/AddCustomerDialog';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Customers: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const queryClient = useQueryClient();

  // Fetch customers from Supabase
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add customer mutation
  const addCustomerMutation = useMutation({
    mutationFn: async (newCustomer: { name: string; phone: string; address: string; notes: string }) => {
      const { data, error } = await supabase
        .from('customers')
        .insert([{
          name: newCustomer.name,
          phone: newCustomer.phone,
          address: newCustomer.address,
          notes: newCustomer.notes
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: "Customer Added",
        description: `${data.name} has been successfully added`,
      });
      console.log("New customer added:", data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add customer",
        variant: "destructive",
      });
      console.error("Error adding customer:", error);
    }
  });

  // Delete customer mutation
  const deleteCustomerMutation = useMutation({
    mutationFn: async (customerId: string) => {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: "Customer Deleted",
        description: "Customer has been successfully deleted",
        variant: "destructive",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      });
      console.error("Error deleting customer:", error);
    }
  });

  const handleAddCustomer = () => {
    setShowAddDialog(true);
    console.log("Add customer dialog opened");
  };

  const handleSubmitCustomer = (newCustomer: { name: string; phone: string; address: string; notes: string }) => {
    addCustomerMutation.mutate(newCustomer);
  };

  const handleEditCustomer = (customerId: string) => {
    toast({
      title: "Edit Customer",
      description: `Editing customer with ID: ${customerId}`,
    });
    console.log("Edit customer clicked for ID:", customerId);
  };

  const handleDeleteCustomer = (customerId: string) => {
    deleteCustomerMutation.mutate(customerId);
    console.log("Delete customer clicked for ID:", customerId);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading customers...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('customers')}</h1>
          <Button onClick={handleAddCustomer}>
            <Plus className="mr-2 h-4 w-4" /> 
            Add {t('customers')}
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('phone')}</TableHead>
                <TableHead>{t('address')}</TableHead>
                <TableHead>{t('notes')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.notes}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditCustomer(customer.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteCustomer(customer.id)}
                        disabled={deleteCustomerMutation.isPending}
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

        <AddCustomerDialog 
          open={showAddDialog} 
          onOpenChange={setShowAddDialog}
          onSubmit={handleSubmitCustomer}
        />
      </div>
    </Layout>
  );
};

export default Customers;
