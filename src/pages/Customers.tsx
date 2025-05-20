
import React from 'react';
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
import { Plus } from 'lucide-react';

// Mock data
const customers = [
  { id: 1, name: 'John Doe', phone: '+1 234-567-8901', address: '123 Main St, City', notes: 'Regular customer' },
  { id: 2, name: 'Jane Smith', phone: '+1 234-567-8902', address: '456 Park Ave, Town', notes: 'Prefers email contact' },
  { id: 3, name: 'Mike Johnson', phone: '+1 234-567-8903', address: '789 Oak Dr, Village', notes: 'New customer' },
];

const Customers: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <Layout>
      <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('customers')}</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> 
            {t('customers')}
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
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
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

export default Customers;
