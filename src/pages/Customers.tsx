
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
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddCustomerDialog from '../components/dialogs/AddCustomerDialog';

// Mock data
const initialCustomers = [
  { id: 1, name: 'John Doe', phone: '+1 234-567-8901', address: '123 Main St, City', notes: 'Regular customer' },
  { id: 2, name: 'Jane Smith', phone: '+1 234-567-8902', address: '456 Park Ave, Town', notes: 'Prefers email contact' },
  { id: 3, name: 'Mike Johnson', phone: '+1 234-567-8903', address: '789 Oak Dr, Village', notes: 'New customer' },
];

const Customers: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [customers, setCustomers] = useState(initialCustomers);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddCustomer = () => {
    setShowAddDialog(true);
    console.log("Add customer dialog opened");
  };

  const handleSubmitCustomer = (newCustomer: { name: string; phone: string; address: string; notes: string }) => {
    const customer = {
      id: Math.max(...customers.map(c => c.id)) + 1,
      ...newCustomer
    };
    setCustomers([...customers, customer]);
    toast({
      title: "Customer Added",
      description: `${newCustomer.name} has been successfully added`,
    });
    console.log("New customer added:", customer);
  };

  const handleEditCustomer = (customerId: number) => {
    toast({
      title: "Edit Customer",
      description: `Editing customer with ID: ${customerId}`,
    });
    console.log("Edit customer clicked for ID:", customerId);
  };

  const handleDeleteCustomer = (customerId: number) => {
    const updatedCustomers = customers.filter(customer => customer.id !== customerId);
    setCustomers(updatedCustomers);
    toast({
      title: "Customer Deleted",
      description: "Customer has been successfully deleted",
      variant: "destructive",
    });
    console.log("Delete customer clicked for ID:", customerId);
  };

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
