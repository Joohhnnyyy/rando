import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FlaskConical, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const FertilizerRecommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropType: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    soilpHLevel: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    console.log('Fertilizer Form Data:', formData);
    // Here you would typically send this data to an API
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
          <FlaskConical className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Fertilizer Recommendation</h1>
          <p className="text-gray-600 text-lg">Get personalized fertilizer suggestions for optimal crop nutrition</p>
        </motion.div>

        <Card className="w-full max-w-4xl shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Leaf className="mr-2" /> Crop & Soil Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="cropType">Crop Type</Label>
                <Select name="cropType" onValueChange={(value) => handleSelectChange('cropType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="barley">Barley</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div></div> {/* Empty div for spacing in the grid */}
              <div>
                <Label htmlFor="nitrogen">Current Nitrogen (N) - mg/kg</Label>
                <Input
                  type="number"
                  id="nitrogen"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  placeholder="e.g., 60"
                />
              </div>
              <div>
                <Label htmlFor="phosphorus">Current Phosphorus (P) - mg/kg</Label>
                <Input
                  type="number"
                  id="phosphorus"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  placeholder="e.g., 30"
                />
              </div>
              <div>
                <Label htmlFor="potassium">Current Potassium (K) - mg/kg</Label>
                <Input
                  type="number"
                  id="potassium"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  placeholder="e.g., 80"
                />
              </div>
              <div>
                <Label htmlFor="soilpHLevel">Soil pH Level (0-14)</Label>
                <Input
                  type="number"
                  id="soilpHLevel"
                  name="soilpHLevel"
                  value={formData.soilpHLevel}
                  onChange={handleChange}
                  placeholder="e.g., 6.8"
                  min="0"
                  max="14"
                  step="0.1"
                />
              </div>
              <div className="md:col-span-2 flex justify-between items-center mt-6">
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  Get Fertilizer Recommendations
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

export default FertilizerRecommendation; 