import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FlaskConical, Leaf, Thermometer, Droplet, CloudRain, LandPlot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

const FertilizerRecommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropType: '',
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    soilpHLevel: 0,
    temperature: 0,
    moisture: 0,
    humidity: 0,
  });
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value[0],
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
    setResult('No recommendation yet'); // Placeholder for now
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
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Form */}
          <Card className="shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Leaf className="mr-2" /> Soil & Climate Information
              </CardTitle>
              <p className="text-gray-500 text-base mt-2">Fill in your field's details for a smart fertilizer suggestion.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Soil Information */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-green-700 mb-4 mt-2">Soil Information</h2>
                  <div className="mb-6">
                    <Label htmlFor="cropType" className="font-semibold">Crop Type</Label>
                    <Select name="cropType" onValueChange={(value) => handleSelectChange('cropType', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="barley">Barley</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="groundnuts">Ground Nuts</SelectItem>
                        <SelectItem value="maizemillets">MaizeMillets</SelectItem>
                        <SelectItem value="oilseeds">Oil seeds</SelectItem>
                        <SelectItem value="paddy">Paddy</SelectItem>
                        <SelectItem value="pulses">Pulses</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="tobacco">Tobacco</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="coffee">Coffee</SelectItem>
                        <SelectItem value="kidneybeans">Kidney Beans</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="pomegranate">Pomegranate</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="watermelon">Watermelon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="soilpHLevel">Soil pH Level: {formData.soilpHLevel}</Label>
                    <Slider
                      value={[formData.soilpHLevel]}
                      onValueChange={value => handleSliderChange('soilpHLevel', value)}
                      min={0}
                      max={14}
                      step={0.1}
                    />
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="nitrogen">Nitrogen (N): {formData.nitrogen} mg/kg</Label>
                    <Slider
                      value={[formData.nitrogen]}
                      onValueChange={value => handleSliderChange('nitrogen', value)}
                      min={0}
                      max={200}
                      step={1}
                    />
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="phosphorus">Phosphorus (P): {formData.phosphorus} mg/kg</Label>
                    <Slider
                      value={[formData.phosphorus]}
                      onValueChange={value => handleSliderChange('phosphorus', value)}
                      min={0}
                      max={200}
                      step={1}
                    />
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="potassium">Potassium (K): {formData.potassium} mg/kg</Label>
                    <Slider
                      value={[formData.potassium]}
                      onValueChange={value => handleSliderChange('potassium', value)}
                      min={0}
                      max={200}
                      step={1}
                    />
                  </div>
                </div>
                {/* Climate Information */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-green-700 mb-4 mt-8">Climate Information</h2>
                  <div className="mb-6">
                    <Label htmlFor="temperature">Temperature (°C): {formData.temperature}</Label>
                    <Slider
                      value={[formData.temperature]}
                      onValueChange={value => handleSliderChange('temperature', value)}
                      min={0}
                      max={50}
                      step={0.1}
                    />
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="moisture">Moisture (%): {formData.moisture}</Label>
                    <Slider
                      value={[formData.moisture]}
                      onValueChange={value => handleSliderChange('moisture', value)}
                      min={0}
                      max={100}
                      step={0.1}
                    />
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="humidity">Humidity (%): {formData.humidity}</Label>
                    <Slider
                      value={[formData.humidity]}
                      onValueChange={value => handleSliderChange('humidity', value)}
                      min={0}
                      max={100}
                      step={0.1}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800 w-full">
                    Get Fertilizer Recommendation
                  </Button>
                  <Button type="button" variant="outline" className="w-full mt-2" onClick={() => navigate('/services')}>
                    Back to Services
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          {/* Right: Result Panel */}
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-xl p-8">
            {!result || result === 'No recommendation yet' ? (
              <div className="flex flex-col items-center">
                <Leaf className="h-16 w-16 text-green-400 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No recommendation yet</h2>
                <p className="text-gray-500 text-center max-w-xs">
                  Enter your soil and climate data on the left and click <span className="font-semibold">Get Fertilizer Recommendation</span> to see the best fertilizer for your field!
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {/* Replace this with actual recommendation result UI */}
                <h2 className="text-2xl font-semibold mb-2">Recommended Fertilizer</h2>
                <p className="text-gray-700">{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FertilizerRecommendation; 