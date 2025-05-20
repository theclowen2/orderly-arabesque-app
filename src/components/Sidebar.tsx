
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, Users, ShoppingBag, Package, FileText, Database } from 'lucide-react';

type SidebarItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon: Icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center p-3 my-1 rounded-md transition-colors ${
        active ? 'bg-accent text-brand-blue' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-sidebar h-screen w-64 flex-none p-4 hidden md:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-sidebar-foreground">{t('appTitle')}</h1>
        <p className="text-sm text-sidebar-foreground opacity-80">{t('orderManagementSystem')}</p>
      </div>
      <nav className="space-y-1">
        <SidebarItem 
          to="/" 
          icon={Home} 
          label={t('dashboard')} 
          active={isActive('/')} 
        />
        <SidebarItem 
          to="/users" 
          icon={Users} 
          label={t('users')} 
          active={isActive('/users')} 
        />
        <SidebarItem 
          to="/customers" 
          icon={Users} 
          label={t('customers')} 
          active={isActive('/customers')} 
        />
        <SidebarItem 
          to="/products" 
          icon={ShoppingBag} 
          label={t('products')} 
          active={isActive('/products')} 
        />
        <SidebarItem 
          to="/orders" 
          icon={Package} 
          label={t('orders')} 
          active={isActive('/orders')} 
        />
        <SidebarItem 
          to="/reports" 
          icon={FileText} 
          label={t('reports')} 
          active={isActive('/reports')} 
        />
        <SidebarItem 
          to="/database" 
          icon={Database} 
          label={t('database')} 
          active={isActive('/database')} 
        />
      </nav>
    </div>
  );
};

export default Sidebar;
