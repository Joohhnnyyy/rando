import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      handleLogout();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20">
        <motion.section 
          className="py-10 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-12">
              <Button asChild variant="ghost" className="w-fit">
                <Link to="/dashboard" className="flex items-center text-black hover:text-gray-700">
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex-grow text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                  Your Profile
                </h1>
                <p className="text-xl text-gray-600">
                  Manage your account information and preferences.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg text-center">
                  <CardContent className="p-8">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl">👤</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      Profile Picture
                    </h3>
                    <Button variant="outline" size="sm">
                      Upload New
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-black">
                      Account Information
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          type="text" 
                          defaultValue="John"
                          className="h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          type="text" 
                          defaultValue="Doe"
                          className="h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="john.doe@example.com"
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="Your phone number"
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Farm Location</Label>
                      <Input 
                        id="location" 
                        type="text" 
                        placeholder="Your farm location"
                        className="h-12"
                      />
                    </div>
                    
                    <div className="flex space-x-4 pt-4">
                      <Button className="bg-black text-white hover:bg-gray-800">
                        Save Changes
                      </Button>
                      <Button variant="outline">
                        Cancel
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="ml-auto"
                        onClick={confirmLogout}
                      >
                        Logout
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

export default Profile;
