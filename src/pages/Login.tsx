
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        toast({
          title: "Login Successful!",
          description: "Welcome back to SeedSync. You've been successfully logged in.",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your email and password and try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <motion.div 
        className="min-h-screen flex items-center justify-center pt-20 pb-12 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-black">Welcome Back</CardTitle>
            <p className="text-gray-600 mt-2">Sign in to your SeedSync account</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-black text-white hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-black hover:underline font-medium">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Login;
