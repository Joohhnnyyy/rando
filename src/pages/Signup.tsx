
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

const Signup = () => {
  const [name, setName] = useState('');
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
      if (name && email && password) {
        toast({
          title: "Account Created Successfully!",
          description: "Welcome to SeedSync! Your account has been created and you can now access all features.",
        });
      } else {
        toast({
          title: "Signup Failed",
          description: "Please fill in all fields and try again.",
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
            <CardTitle className="text-3xl font-bold text-black">Join SeedSync</CardTitle>
            <p className="text-gray-600 mt-2">Create your account to get started</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Enter your full name"
                  className="h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
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
                  placeholder="Create a password"
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-black hover:underline font-medium">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Signup;
