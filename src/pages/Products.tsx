
import React from 'react';
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
import { Plus } from 'lucide-react';

// Mock data
const products = [
  { 
    id: 1, 
    name: 'Custom Cabinet', 
    price: 1200, 
    description: 'Handcrafted wooden cabinet with premium finish', 
    frontImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 
    backImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158' 
  },
  { 
    id: 2, 
    name: 'Wooden Table', 
    price: 800, 
    description: 'Sturdy dining table made from oak', 
    frontImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 
    backImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158' 
  },
  { 
    id: 3, 
    name: 'Kitchen Drawer', 
    price: 500, 
    description: 'Modern kitchen drawer with soft close mechanism', 
    frontImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 
    backImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158' 
  },
];

const Products: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <Layout>
      <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('products')}</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> 
            {t('products')}
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
                    src={product.frontImage} 
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
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
