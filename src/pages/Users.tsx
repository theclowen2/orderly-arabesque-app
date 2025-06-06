
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

// Mock data
const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Admin', permissions: ['All'] },
  { id: 2, name: 'Manager User', email: 'manager@example.com', role: 'Manager', permissions: ['Read', 'Create', 'Update'] },
  { id: 3, name: 'Viewer User', email: 'viewer@example.com', role: 'Viewer', permissions: ['Read'] },
];

const Users: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "Add user functionality will be implemented here",
    });
    console.log("Add user clicked");
  };

  const handleEditUser = (userId: number) => {
    toast({
      title: "Edit User",
      description: `Editing user with ID: ${userId}`,
    });
    console.log("Edit user clicked for ID:", userId);
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    toast({
      title: "User Deleted",
      description: "User has been successfully deleted",
      variant: "destructive",
    });
    console.log("Delete user clicked for ID:", userId);
  };

  return (
    <Layout>
      <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('users')}</h1>
          <Button onClick={handleAddUser}>
            <Plus className="mr-2 h-4 w-4" /> 
            Add {t('users')}
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.permissions.join(', ')}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditUser(user.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
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

export default Users;
