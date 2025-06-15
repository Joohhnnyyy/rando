import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  Sprout, 
  User, 
  MessageCircle, 
  Info, 
  Bug 
} from 'lucide-react';

const Dashboard = () => {
  const quickActions = [
    { title: 'View Services', path: '/services', icon: <Sprout className="w-10 h-10" /> },
    { title: 'Update Profile', path: '/profile', icon: <User className="w-10 h-10" /> },
    { title: 'Contact Support', path: '/contact', icon: <MessageCircle className="w-10 h-10" /> },
    { title: 'About SeedSync', path: '/about', icon: <Info className="w-10 h-10" /> },
    { title: 'Pest & Disease', path: '/pest-disease', icon: <Bug className="w-10 h-10" /> }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20">
        <motion.section 
          className="py-20 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Welcome to Your Dashboard
              </h1>
              <p className="text-xl text-gray-600">
                Manage your SeedSync experience from here.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={action.path}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100">
                      <CardContent className="p-6 text-center">
                        <div className="flex items-center justify-center w-full h-14 mb-4 text-gray-700">
                          {action.icon}
                        </div>
                        <h3 className="text-lg font-bold text-black">
                          {action.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-black">
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-gray-600">
                      <p>• Account created successfully</p>
                      <p>• Welcome to SeedSync!</p>
                      <p>• Explore our services to get started</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-black">
                      Getting Started
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600 mb-4">
                        Ready to revolutionize your farming? Start with our AI-powered services.
                      </p>
                      <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                        <Link to="/services">
                          Explore Services
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
