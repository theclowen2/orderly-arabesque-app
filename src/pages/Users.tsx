
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
import AddUserDialog from '../components/dialogs/AddUserDialog';
import EditUserDialog from '../components/dialogs/EditUserDialog';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
}

const Users: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Fetch users from Supabase
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add user mutation
  const addUserMutation = useMutation({
    mutationFn: async (newUser: { name: string; email: string; password: string; role: string; permissions: string[] }) => {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
          permissions: newUser.permissions
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User Added",
        description: `${data.name} has been successfully added`,
      });
      console.log("New user added:", data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive",
      });
      console.error("Error adding user:", error);
    }
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: User) => {
      const { data, error } = await supabase
        .from('users')
        .update({
          name: updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
          role: updatedUser.role,
          permissions: updatedUser.permissions
        })
        .eq('id', updatedUser.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User Updated",
        description: `${data.name} has been successfully updated`,
      });
      console.log("User updated:", data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
      console.error("Error updating user:", error);
    }
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted",
        variant: "destructive",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
      console.error("Error deleting user:", error);
    }
  });

  const handleAddUser = () => {
    setShowAddDialog(true);
    console.log("Add user dialog opened");
  };

  const handleSubmitUser = (newUser: { name: string; email: string; password: string; role: string; permissions: string[] }) => {
    addUserMutation.mutate(newUser);
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(user);
      setShowEditDialog(true);
      console.log("Edit user clicked for ID:", userId);
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    updateUserMutation.mutate(updatedUser);
  };

  const handleDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
    console.log("Delete user clicked for ID:", userId);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </Layout>
    );
  }

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
                  <TableCell>{user.permissions?.join(', ')}</TableCell>
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
                        disabled={deleteUserMutation.isPending}
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

        <AddUserDialog 
          open={showAddDialog} 
          onOpenChange={setShowAddDialog}
          onSubmit={handleSubmitUser}
        />

        <EditUserDialog 
          open={showEditDialog} 
          onOpenChange={setShowEditDialog}
          onSubmit={handleUpdateUser}
          user={editingUser}
        />
      </div>
    </Layout>
  );
};

export default Users;
