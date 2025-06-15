import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplet, ArrowLeft, Calendar, Cloud, Thermometer, Wind, Info, Clock, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Mock weather data (replace with actual API call)
const mockWeatherData = {
  temperature: 28,
  humidity: 65,
  rainfallProbability: 20,
  windSpeed: 12,
};

const IrrigationAdvice = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropType: '',
    soilType: '',
    region: '',
    weatherConditions: '',
    growthStage: '',
    soilMoisture: 50,
    lastIrrigationDate: new Date(),
  });

  const [recommendation, setRecommendation] = useState<{
    waterQuantity: string;
    nextIrrigationDate: string;
    confidence: number;
    summary: string;
    details: {
      cropWaterNeeds: string;
      expectedRainfall: string;
      soilRetention: string;
      reasoning: string;
    };
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const cropOptions = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Vegetables', 'Fruits'];
  const soilOptions = ['Clay', 'Loam', 'Sandy', 'Silty', 'Peaty', 'Chalky'];
  const growthStageOptions = ['Seedling', 'Vegetative', 'Flowering', 'Maturity'];

  const handleChange = (name: string, value: string | number | Date) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setRecommendation({
        waterQuantity: '25mm every 3 days',
        nextIrrigationDate: '2024-03-20',
        confidence: 90,
        summary: 'Based on crop type, soil, and current weather in your region...',
        details: {
          cropWaterNeeds: 'Wheat requires 500-600mm of water during its growing season',
          expectedRainfall: 'No significant rainfall expected in the next 7 days',
          soilRetention: 'Clay soil has high water retention capacity',
          reasoning: 'Current soil moisture is below optimal levels for the flowering stage',
        },
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Weather Banner - Add margin-top to prevent overlap with nav */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Thermometer className="h-5 w-5 mr-2" />
              <span>{mockWeatherData.temperature}°C</span>
            </div>
            <div className="flex items-center">
              <Droplet className="h-5 w-5 mr-2" />
              <span>{mockWeatherData.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Cloud className="h-5 w-5 mr-2" />
              <span>{mockWeatherData.rainfallProbability}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="h-5 w-5 mr-2" />
              <span>{mockWeatherData.windSpeed} km/h</span>
            </div>
          </div>
          <div className="text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Irrigation Advice</h1>
              <p className="text-gray-600 mt-2">
                Smart AI-powered water management suggestions based on crop, soil, and weather data
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Droplet className="mr-2 h-6 w-6 text-green-500" />
                  Irrigation Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select
                      value={formData.cropType}
                      onValueChange={(value) => handleChange('cropType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropOptions.map(crop => (
                          <SelectItem key={crop} value={crop.toLowerCase()}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select
                      value={formData.soilType}
                      onValueChange={(value) => handleChange('soilType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilOptions.map(soil => (
                          <SelectItem key={soil} value={soil.toLowerCase()}>
                            {soil}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">Region / Location</Label>
                    <Input
                      id="region"
                      placeholder="Enter your location"
                      value={formData.region}
                      onChange={(e) => handleChange('region', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="growthStage">Growth Stage</Label>
                    <Select
                      value={formData.growthStage}
                      onValueChange={(value) => handleChange('growthStage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select growth stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {growthStageOptions.map(stage => (
                          <SelectItem key={stage} value={stage.toLowerCase()}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="soilMoisture">
                      Soil Moisture: {formData.soilMoisture}%
                    </Label>
                    <div className="relative">
                      <Slider
                        id="soilMoisture"
                        min={0}
                        max={100}
                        step={1}
                        value={[formData.soilMoisture]}
                        onValueChange={(value) => handleChange('soilMoisture', value[0])}
                        className="w-full"
                      />
                      <div className="absolute top-0 left-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                           style={{ width: `${formData.soilMoisture}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Last Irrigation Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.lastIrrigationDate ? (
                            format(formData.lastIrrigationDate, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={formData.lastIrrigationDate}
                          onSelect={(date) => date && handleChange('lastIrrigationDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Generating Advice...
                      </div>
                    ) : (
                      'Get Irrigation Advice'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Output Section */}
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center">
                      <Droplet className="mr-2 h-6 w-6 text-green-500" />
                      AI Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-green-800 mb-2">
                        Water Quantity: {recommendation.waterQuantity}
                      </h3>
                      <div className="flex items-center text-green-700">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>Next irrigation: {recommendation.nextIrrigationDate}</span>
                      </div>
                      <div className="mt-2 text-sm text-green-600">
                        Confidence: {recommendation.confidence}%
                      </div>
                    </div>

                    <p className="text-gray-700">{recommendation.summary}</p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Info className="mr-2 h-4 w-4" />
                          Why this recommendation?
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Detailed Analysis</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">Crop Water Needs</h4>
                            <p>{recommendation.details.cropWaterNeeds}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Expected Rainfall</h4>
                            <p>{recommendation.details.expectedRainfall}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Soil Retention</h4>
                            <p>{recommendation.details.soilRetention}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Reasoning</h4>
                            <p>{recommendation.details.reasoning}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Recommendation History Placeholder */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Recent Recommendations</h3>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">March 15, 2024</div>
                          <div className="font-medium">20mm every 4 days</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">March 12, 2024</div>
                          <div className="font-medium">25mm every 3 days</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IrrigationAdvice; 