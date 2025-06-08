
import React, { useState, useEffect } from 'react';
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
import { Upload } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  front_image: string;
  back_image: string;
}

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (product: Product) => void;
  product: Product | null;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ open, onOpenChange, onSubmit, product }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    frontImage: '',
    backImage: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description || '',
        frontImage: product.front_image || '',
        backImage: product.back_image || ''
      });
    }
  }, [product]);

  const handleFileUpload = (file: File, imageType: 'frontImage' | 'backImage') => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData({ ...formData, [imageType]: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.description && product) {
      onSubmit({
        ...product,
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        front_image: formData.frontImage,
        back_image: formData.backImage
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update product details and images.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-productName" className="text-right">
                {t('name')}
              </Label>
              <Input
                id="edit-productName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">
                Price
              </Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-frontImage" className="text-right">
                Front Image
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-frontImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'frontImage');
                    }}
                    className="flex-1"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                {formData.frontImage && (
                  <div className="w-full h-20 bg-gray-100 rounded overflow-hidden">
                    <img src={formData.frontImage} alt="Front preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-backImage" className="text-right">
                Back Image
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-backImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'backImage');
                    }}
                    className="flex-1"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                {formData.backImage && (
                  <div className="w-full h-20 bg-gray-100 rounded overflow-hidden">
                    <img src={formData.backImage} alt="Back preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
