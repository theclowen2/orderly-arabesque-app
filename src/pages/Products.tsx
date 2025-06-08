
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddProductDialog from '../components/dialogs/AddProductDialog';
import EditProductDialog from '../components/dialogs/EditProductDialog';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Products: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const queryClient = useQueryClient();

  // Fetch products from Supabase
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async (newProduct: { name: string; price: number; description: string; frontImage: string; backImage: string }) => {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name,
          price: newProduct.price,
          description: newProduct.description,
          front_image: newProduct.frontImage,
          back_image: newProduct.backImage
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product Added",
        description: `${data.name} has been successfully added`,
      });
      console.log("New product added:", data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
      console.error("Error adding product:", error);
    }
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct: { id: string; name: string; price: number; description: string; front_image: string; back_image: string }) => {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          price: updatedProduct.price,
          description: updatedProduct.description,
          front_image: updatedProduct.front_image,
          back_image: updatedProduct.back_image,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedProduct.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product Updated",
        description: `${data.name} has been successfully updated`,
      });
      console.log("Product updated:", data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
      console.error("Error updating product:", error);
    }
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product Deleted",
        description: "Product has been successfully deleted",
        variant: "destructive",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      console.error("Error deleting product:", error);
    }
  });

  const handleAddProduct = () => {
    setShowAddDialog(true);
    console.log("Add product dialog opened");
  };

  const handleSubmitProduct = (newProduct: { name: string; price: number; description: string; frontImage: string; backImage: string }) => {
    addProductMutation.mutate(newProduct);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowEditDialog(true);
    console.log("Edit product clicked for ID:", product.id);
  };

  const handleUpdateProduct = (updatedProduct: any) => {
    updateProductMutation.mutate(updatedProduct);
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate(productId);
    console.log("Delete product clicked for ID:", productId);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading products...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('products')}</h1>
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" /> 
            Add {t('products')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={product.front_image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">${product.price}</p>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditProduct(product)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                  disabled={deleteProductMutation.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <AddProductDialog 
          open={showAddDialog} 
          onOpenChange={setShowAddDialog}
          onSubmit={handleSubmitProduct}
        />

        <EditProductDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onSubmit={handleUpdateProduct}
          product={selectedProduct}
        />
      </div>
    </Layout>
  );
};

export default Products;
