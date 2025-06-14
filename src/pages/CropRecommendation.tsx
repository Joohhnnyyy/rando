import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Thermometer, CloudRain, Droplet, Sun, Sprout, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CropRecommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    soilType: '',
    pHLevel: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    rainfall: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you would typically send this data to an API
    // For now, let's just log it
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Leaf className="mx-auto h-16 w-16 text-green-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Crop Recommendation</h1>
          <p className="text-gray-600 text-lg">Get AI-powered crop suggestions based on your soil and climate conditions</p>
        </motion.div>

        <Card className="w-full max-w-4xl shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Leaf className="mr-2" /> Soil & Climate Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="soilType">Soil Type</Label>
                <Select name="soilType" onValueChange={(value) => handleSelectChange('soilType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="silty">Silty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pHLevel">pH Level (0-14)</Label>
                <Input
                  type="number"
                  id="pHLevel"
                  name="pHLevel"
                  value={formData.pHLevel}
                  onChange={handleChange}
                  placeholder="e.g., 6.5"
                  min="0"
                  max="14"
                  step="0.1"
                />
              </div>
              <div>
                <Label htmlFor="nitrogen">Nitrogen (N) - mg/kg</Label>
                <Input
                  type="number"
                  id="nitrogen"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                />
              </div>
              <div>
                <Label htmlFor="phosphorus">Phosphorus (P) - mg/kg</Label>
                <Input
                  type="number"
                  id="phosphorus"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  placeholder="e.g., 25"
                />
              </div>
              <div>
                <Label htmlFor="potassium">Potassium (K) - mg/kg</Label>
                <Input
                  type="number"
                  id="potassium"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  placeholder="e.g., 70"
                />
              </div>
              <div>
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  type="number"
                  id="temperature"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="e.g., 25"
                />
              </div>
              <div>
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  type="number"
                  id="humidity"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  placeholder="e.g., 75"
                />
              </div>
              <div>
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input
                  type="number"
                  id="rainfall"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  placeholder="e.g., 120"
                />
              </div>
              <div className="md:col-span-2 flex justify-between items-center mt-6">
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  Get Recommendations
                </Button>
                <Button variant="ghost" onClick={() => navigate('/services')}>
                  Back to Services
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendation; 