import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast({
        title: "Login Required",
        description: "Please login to access the dashboard.",
        variant: "destructive",
      });
      navigate('/login');
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', requiresAuth: true },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: user ? 'Profile' : 'Login', path: user ? '/profile' : '/login' }
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-black">
            SeedSync
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={item.requiresAuth ? handleDashboardClick : undefined}
                className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                  location.pathname === item.path ? 'text-black' : 'text-gray-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Mobile Hamburger + Dropdown */}
          <div className="md:hidden">
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black" aria-label="Open menu">
                  <MenuIcon className="h-7 w-7" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.path}
                      onClick={(e) => {
                        if (item.requiresAuth) {
                          handleDashboardClick(e);
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left block px-3 py-2 rounded-md transition-colors ${
                        location.pathname === item.path ? 'text-black font-semibold bg-gray-100' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
