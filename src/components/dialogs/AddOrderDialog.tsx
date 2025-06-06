
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

const AddOrderDialog: React.FC<AddOrderDialogProps> = ({ open, onOpenChange, onSubmit }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    customer: '',
    product: '',
    frontImage: '',
    backImage: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.customer && formData.product) {
      onSubmit(formData);
      setFormData({
        customer: '',
        product: '',
        frontImage: '',
        backImage: '',
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
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
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                className="col-span-3"
                placeholder="Customer name"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product" className="text-right">
                {t('products')}
              </Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="col-span-3"
                placeholder="Product name"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frontImage" className="text-right">
                Front Image
              </Label>
              <Input
                id="frontImage"
                value={formData.frontImage}
                onChange={(e) => setFormData({ ...formData, frontImage: e.target.value })}
                className="col-span-3"
                placeholder="Front image URL"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="backImage" className="text-right">
                Back Image
              </Label>
              <Input
                id="backImage"
                value={formData.backImage}
                onChange={(e) => setFormData({ ...formData, backImage: e.target.value })}
                className="col-span-3"
                placeholder="Back image URL"
              />
            </div>
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
