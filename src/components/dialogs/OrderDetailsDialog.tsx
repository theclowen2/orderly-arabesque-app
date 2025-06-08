
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({ open, onOpenChange, order }) => {
  const { t } = useLanguage();

  if (!order) return null;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 rounded-full status-completed text-xs font-medium">{t('completed')}</span>;
      case 'in-design':
        return <span className="px-2 py-1 rounded-full status-in-design text-xs font-medium">{t('inDesign')}</span>;
      case 'rejected':
        return <span className="px-2 py-1 rounded-full status-rejected text-xs font-medium">{t('rejected')}</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full status-pending text-xs font-medium">{t('pendingOrders')}</span>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Complete information for this order
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Customer Information</h3>
              <p><strong>{t('name')}:</strong> {order.customers?.name}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Product Information</h3>
              <p><strong>{t('products')}:</strong> {order.products?.name}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>{t('date')}:</strong> {order.order_date}</p>
            </div>
            <div>
              <p><strong>{t('status')}:</strong> {getStatusBadge(order.status)}</p>
            </div>
          </div>

          {(order.front_image || order.back_image) && (
            <div>
              <h3 className="font-semibold mb-2">Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {order.front_image && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Front Image</p>
                    <div className="w-full h-32 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={order.front_image} 
                        alt="Front view" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                )}
                {order.back_image && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Back Image</p>
                    <div className="w-full h-32 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={order.back_image} 
                        alt="Back view" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {order.notes && (
            <div>
              <h3 className="font-semibold mb-2">{t('notes')}</h3>
              <p className="text-sm text-muted-foreground">{order.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
