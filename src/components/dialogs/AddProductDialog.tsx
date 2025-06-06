
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
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (product: {
    name: string;
    price: number;
    description: string;
    frontImage: string;
    backImage: string;
  }) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onOpenChange, onSubmit }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    frontImage: '',
    backImage: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.description) {
      onSubmit({
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        frontImage: formData.frontImage || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        backImage: formData.backImage || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
      });
      setFormData({ name: '', price: '', description: '', frontImage: '', backImage: '' });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Create a new product with details and images.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">
                {t('name')}
              </Label>
              <Input
                id="productName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frontImage" className="text-right">
                Front Image URL
              </Label>
              <Input
                id="frontImage"
                value={formData.frontImage}
                onChange={(e) => setFormData({ ...formData, frontImage: e.target.value })}
                className="col-span-3"
                placeholder="https://..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="backImage" className="text-right">
                Back Image URL
              </Label>
              <Input
                id="backImage"
                value={formData.backImage}
                onChange={(e) => setFormData({ ...formData, backImage: e.target.value })}
                className="col-span-3"
                placeholder="https://..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
