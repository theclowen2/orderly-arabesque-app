
import React, { createContext, useState, useContext, useEffect } from 'react';

// Types for our languages
export type Language = 'en' | 'ar';

// Dictionary type for translations
export type Translations = {
  [key: string]: {
    en: string;
    ar: string;
  };
};

// Our translations
export const translations: Translations = {
  appTitle: {
    en: 'Manufacturing Orders',
    ar: 'طلبات التصنيع',
  },
  orderManagementSystem: {
    en: 'Order Management System',
    ar: 'نظام إدارة الطلبات',
  },
  dashboard: {
    en: 'Dashboard',
    ar: 'لوحة التحكم',
  },
  users: {
    en: 'Users',
    ar: 'المستخدمين',
  },
  customers: {
    en: 'Customers',
    ar: 'العملاء',
  },
  products: {
    en: 'Products',
    ar: 'المنتجات',
  },
  orders: {
    en: 'Orders',
    ar: 'الطلبات',
  },
  reports: {
    en: 'Reports',
    ar: 'التقارير',
  },
  database: {
    en: 'Database',
    ar: 'قاعدة البيانات',
  },
  logout: {
    en: 'Logout',
    ar: 'تسجيل الخروج',
  },
  admin: {
    en: 'Admin',
    ar: 'مدير',
  },
  totalOrders: {
    en: 'Total Orders',
    ar: 'إجمالي الطلبات',
  },
  pendingOrders: {
    en: 'Pending Orders',
    ar: 'الطلبات المعلقة',
  },
  inProgressOrders: {
    en: 'In Progress',
    ar: 'قيد التنفيذ',
  },
  completedOrders: {
    en: 'Completed Orders',
    ar: 'الطلبات المكتملة',
  },
  recentOrders: {
    en: 'Recent Orders',
    ar: 'الطلبات الحديثة',
  },
  viewAll: {
    en: 'View All',
    ar: 'عرض الكل',
  },
  name: {
    en: 'Name',
    ar: 'الاسم',
  },
  phone: {
    en: 'Phone',
    ar: 'الهاتف',
  },
  address: {
    en: 'Address',
    ar: 'العنوان',
  },
  notes: {
    en: 'Notes',
    ar: 'ملاحظات',
  },
  price: {
    en: 'Price',
    ar: 'السعر',
  },
  description: {
    en: 'Description',
    ar: 'الوصف',
  },
  frontImage: {
    en: 'Front Image',
    ar: 'الصورة الأمامية',
  },
  backImage: {
    en: 'Back Image',
    ar: 'الصورة الخلفية',
  },
  status: {
    en: 'Status',
    ar: 'الحالة',
  },
  date: {
    en: 'Date',
    ar: 'التاريخ',
  },
  completed: {
    en: 'Completed',
    ar: 'مكتمل',
  },
  inDesign: {
    en: 'In Design',
    ar: 'في التصميم',
  },
  rejected: {
    en: 'Rejected',
    ar: 'مرفوض',
  },
  actions: {
    en: 'Actions',
    ar: 'إجراءات',
  },
  overview: {
    en: 'Overview of your order management system',
    ar: 'نظرة عامة على نظام إدارة الطلبات الخاص بك',
  },
  login: {
    en: 'Login',
    ar: 'تسجيل الدخول',
  },
  email: {
    en: 'Email',
    ar: 'البريد الإلكتروني',
  },
  password: {
    en: 'Password',
    ar: 'كلمة المرور',
  },
  selectLanguage: {
    en: 'Select Language',
    ar: 'اختر اللغة',
  },
  english: {
    en: 'English',
    ar: 'الإنجليزية',
  },
  arabic: {
    en: 'Arabic',
    ar: 'العربية',
  },
};

// Context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Creating the context
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Check if a language preference is saved in localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Set the direction attribute on the html element
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.className = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
