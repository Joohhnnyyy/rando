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
import { getWeatherData } from '@/utils/getWeather';

const locations = [
  // North India
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Noida', label: 'Noida' },
  { value: 'Gurgaon', label: 'Gurgaon' },
  { value: 'Lucknow', label: 'Lucknow' },
  { value: 'Kanpur', label: 'Kanpur' },
  { value: 'Agra', label: 'Agra' },
  { value: 'Varanasi', label: 'Varanasi' },
  { value: 'Chandigarh', label: 'Chandigarh' },
  { value: 'Amritsar', label: 'Amritsar' },
  { value: 'Jaipur', label: 'Jaipur' },
  { value: 'Jodhpur', label: 'Jodhpur' },
  { value: 'Udaipur', label: 'Udaipur' },
  { value: 'Dehradun', label: 'Dehradun' },
  { value: 'Shimla', label: 'Shimla' },
  
  // South India
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Mysore', label: 'Mysore' },
  { value: 'Coimbatore', label: 'Coimbatore' },
  { value: 'Kochi', label: 'Kochi' },
  { value: 'Thiruvananthapuram', label: 'Thiruvananthapuram' },
  { value: 'Madurai', label: 'Madurai' },
  { value: 'Vijayawada', label: 'Vijayawada' },
  { value: 'Visakhapatnam', label: 'Visakhapatnam' },
  
  // West India
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Ahmedabad', label: 'Ahmedabad' },
  { value: 'Surat', label: 'Surat' },
  { value: 'Vadodara', label: 'Vadodara' },
  { value: 'Nagpur', label: 'Nagpur' },
  { value: 'Nashik', label: 'Nashik' },
  { value: 'Goa', label: 'Goa' },
  
  // East India
  { value: 'Kolkata', label: 'Kolkata' },
  { value: 'Bhubaneswar', label: 'Bhubaneswar' },
  { value: 'Patna', label: 'Patna' },
  { value: 'Guwahati', label: 'Guwahati' },
  { value: 'Ranchi', label: 'Ranchi' },
  { value: 'Siliguri', label: 'Siliguri' },
  
  // Central India
  { value: 'Bhopal', label: 'Bhopal' },
  { value: 'Indore', label: 'Indore' },
  { value: 'Raipur', label: 'Raipur' },
  { value: 'Jabalpur', label: 'Jabalpur' },
];

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
  const [selectedLocation, setSelectedLocation] = useState('Noida');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const cropOptions = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Vegetables', 'Fruits'];
  const soilOptions = ['Clay', 'Loam', 'Sandy', 'Silty', 'Peaty', 'Chalky'];
  const growthStageOptions = ['Seedling', 'Vegetative', 'Flowering', 'Maturity'];

  const handleChange = (name: string, value: string | number | Date) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'region') {
      setSelectedLocation(value as string);
    }
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

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherData(selectedLocation);
        if (data) {
          setWeather(data);
          setError(null); // Clear any previous errors
        } else {
          setError(`Unable to fetch weather data for ${selectedLocation}. Please try another location.`);
        }
      } catch (err) {
        console.error('Error in weather fetch:', err);
        setError(`Unable to fetch weather data for ${selectedLocation}. Please try another location.`);
      }
    };

    fetchWeather();
  }, [selectedLocation]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="p-6 rounded-xl shadow-md bg-white max-w-md mx-auto mt-20">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Weather Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            {weather ? (
              <>
                <div className="flex items-center">
                  <Thermometer className="h-5 w-5 mr-2" />
                  <span>{weather.temperature}°C</span>
                </div>
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 mr-2" />
                  <span>{weather.humidity}%</span>
                </div>
                <div className="flex items-center">
                  <Cloud className="h-5 w-5 mr-2" />
                  <span>{weather.description}</span>
                </div>
                <div className="flex items-center">
                  <Wind className="h-5 w-5 mr-2" />
                  <span>{weather.windSpeed} m/s</span>
                </div>
              </>
            ) : error ? (
              <div className="flex items-center text-white/90">
                <Info className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            ) : (
              <div className="animate-pulse flex items-center space-x-6">
                <div className="h-5 w-20 bg-white/20 rounded"></div>
                <div className="h-5 w-20 bg-white/20 rounded"></div>
                <div className="h-5 w-20 bg-white/20 rounded"></div>
                <div className="h-5 w-20 bg-white/20 rounded"></div>
              </div>
            )}
          </div>
          {weather && (
            <div className="text-sm">
              Last updated: {weather.lastUpdated}
            </div>
          )}
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
                        {cropOptions.map((crop) => (
                          <SelectItem key={crop} value={crop}>
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
                        {soilOptions.map((soil) => (
                          <SelectItem key={soil} value={soil}>
                            {soil}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">Region / Location</Label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) => handleChange('region', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.value} value={location.value}>
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        {growthStageOptions.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilMoisture">Soil Moisture: {formData.soilMoisture}%</Label>
                    <Slider
                      value={[formData.soilMoisture]}
                      onValueChange={(value) => handleChange('soilMoisture', value[0])}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastIrrigationDate">Last Irrigation Date</Label>
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
                          onSelect={(date) => handleChange('lastIrrigationDate', date || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Generating Advice...' : 'Get Irrigation Advice'}
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