
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, simple validation
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-100 p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{t('appTitle')}</CardTitle>
          <CardDescription>{t('orderManagementSystem')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">{t('login')}</Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <p className="text-sm text-center mb-2">{t('selectLanguage')}</p>
            <Tabs defaultValue={language} className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="en" onClick={() => setLanguage('en')}>
                  English
                </TabsTrigger>
                <TabsTrigger value="ar" onClick={() => setLanguage('ar')}>
                  العربية
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
