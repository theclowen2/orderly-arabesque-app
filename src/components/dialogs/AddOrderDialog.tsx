
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (order: {
    customer: string;
    product: string;
    frontImage: string;
    backImage: string;
    date: string;
    status: string;
  }) => void;
}

// Mock data for customers and products - in a real app, these would come from props or context
const mockCustomers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
  { id: 4, name: 'مايكل' },
];

const mockProducts = [
  { 
    id: 1, 
    name: 'Custom Cabinet', 
    frontImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    backImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
  },
  { 
    id: 2, 
    name: 'Wooden Table', 
    frontImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    backImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
  },
  { 
    id: 3, 
    name: 'Kitchen Drawer', 
    frontImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    backImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
  },
];

const AddOrderDialog: React.FC<AddOrderDialogProps> = ({ open, onOpenChange, onSubmit }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    customer: '',
    product: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  });

  const selectedProduct = mockProducts.find(p => p.name === formData.product);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.customer && formData.product && selectedProduct) {
      onSubmit({
        ...formData,
        frontImage: selectedProduct.frontImage,
        backImage: selectedProduct.backImage
      });
      setFormData({
        customer: '',
        product: '',
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
          <DialogDescription>
            Create a new order for a customer.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                {t('name')}
              </Label>
              <Select value={formData.customer} onValueChange={(value) => setFormData({ ...formData, customer: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.name}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product" className="text-right">
                {t('products')}
              </Label>
              <Select value={formData.product} onValueChange={(value) => setFormData({ ...formData, product: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => (
                    <SelectItem key={product.id} value={product.name}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedProduct && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Product Images</Label>
                <div className="col-span-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Front Image</p>
                      <div className="w-full h-20 bg-gray-100 rounded overflow-hidden">
                        <img src={selectedProduct.frontImage} alt="Front view" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Back Image</p>
                      <div className="w-full h-20 bg-gray-100 rounded overflow-hidden">
                        <img src={selectedProduct.backImage} alt="Back view" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                {t('date')}
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                {t('status')}
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">{t('pendingOrders')}</SelectItem>
                  <SelectItem value="in-design">{t('inDesign')}</SelectItem>
                  <SelectItem value="completed">{t('completed')}</SelectItem>
                  <SelectItem value="rejected">{t('rejected')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderDialog;
