
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' }
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
          <Link to="/" className="text-2xl font-bold">
            SeedSync
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                  location.pathname === item.path ? 'text-black' : 'text-gray-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
