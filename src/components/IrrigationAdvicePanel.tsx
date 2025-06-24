// @ts-nocheck
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
import { getIrrigationAdviceFromGemini } from '../services/getIrrigationAdviceFromGemini';

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
  { value: 'Aligarh', label: 'Aligarh' },
  { value: 'Meerut', label: 'Meerut' },
  { value: 'Moradabad', label: 'Moradabad' },
  { value: 'Bareilly', label: 'Bareilly' },
  { value: 'Ghaziabad', label: 'Ghaziabad' },
  { value: 'Haridwar', label: 'Haridwar' },
  { value: 'Mathura', label: 'Mathura' },
  { value: 'Roorkee', label: 'Roorkee' },
  { value: 'Saharanpur', label: 'Saharanpur' },
  { value: 'Karnal', label: 'Karnal' },
  { value: 'Kurukshetra', label: 'Kurukshetra' },
  { value: 'Panipat', label: 'Panipat' },
  { value: 'Ambala', label: 'Ambala' },
  { value: 'Hisar', label: 'Hisar' },
  { value: 'Sonipat', label: 'Sonipat' },
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
  { value: 'Tirupati', label: 'Tirupati' },
  { value: 'Warangal', label: 'Warangal' },
  { value: 'Guntur', label: 'Guntur' },
  { value: 'Hubli', label: 'Hubli' },
  { value: 'Belgaum', label: 'Belgaum' },
  { value: 'Davangere', label: 'Davangere' },
  { value: 'Mangalore', label: 'Mangalore' },
  { value: 'Salem', label: 'Salem' },
  { value: 'Erode', label: 'Erode' },
  { value: 'Tirunelveli', label: 'Tirunelveli' },
  // West India
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Ahmedabad', label: 'Ahmedabad' },
  { value: 'Surat', label: 'Surat' },
  { value: 'Vadodara', label: 'Vadodara' },
  { value: 'Nagpur', label: 'Nagpur' },
  { value: 'Nashik', label: 'Nashik' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Rajkot', label: 'Rajkot' },
  { value: 'Bhavnagar', label: 'Bhavnagar' },
  { value: 'Jamnagar', label: 'Jamnagar' },
  { value: 'Solapur', label: 'Solapur' },
  { value: 'Kolhapur', label: 'Kolhapur' },
  { value: 'Aurangabad', label: 'Aurangabad' },
  { value: 'Sangli', label: 'Sangli' },
  { value: 'Akola', label: 'Akola' },
  { value: 'Amravati', label: 'Amravati' },
  // East India
  { value: 'Kolkata', label: 'Kolkata' },
  { value: 'Bhubaneswar', label: 'Bhubaneswar' },
  { value: 'Patna', label: 'Patna' },
  { value: 'Guwahati', label: 'Guwahati' },
  { value: 'Ranchi', label: 'Ranchi' },
  { value: 'Siliguri', label: 'Siliguri' },
  { value: 'Durgapur', label: 'Durgapur' },
  { value: 'Asansol', label: 'Asansol' },
  { value: 'Cuttack', label: 'Cuttack' },
  { value: 'Jamshedpur', label: 'Jamshedpur' },
  { value: 'Dhanbad', label: 'Dhanbad' },
  { value: 'Bokaro', label: 'Bokaro' },
  { value: 'Purnia', label: 'Purnia' },
  { value: 'Muzaffarpur', label: 'Muzaffarpur' },
  // Central India
  { value: 'Bhopal', label: 'Bhopal' },
  { value: 'Indore', label: 'Indore' },
  { value: 'Raipur', label: 'Raipur' },
  { value: 'Jabalpur', label: 'Jabalpur' },
  { value: 'Gwalior', label: 'Gwalior' },
  { value: 'Ujjain', label: 'Ujjain' },
  { value: 'Sagar', label: 'Sagar' },
  { value: 'Satna', label: 'Satna' },
  { value: 'Rewa', label: 'Rewa' },
  // States and Regions
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'West Bengal', label: 'West Bengal' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Tripura', label: 'Tripura' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  { value: 'Sikkim', label: 'Sikkim' },
  // Notable Agricultural Regions
  { value: 'Terai', label: 'Terai' },
  { value: 'Doab', label: 'Doab' },
  { value: 'Vidarbha', label: 'Vidarbha' },
  { value: 'Marathwada', label: 'Marathwada' },
  { value: 'Konkan', label: 'Konkan' },
  { value: 'Malwa', label: 'Malwa' },
  { value: 'Bundelkhand', label: 'Bundelkhand' },
  { value: 'Saurashtra', label: 'Saurashtra' },
  { value: 'Kutch', label: 'Kutch' },
  { value: 'Coastal Andhra', label: 'Coastal Andhra' },
  { value: 'Rayalaseema', label: 'Rayalaseema' },
  { value: 'North Bengal', label: 'North Bengal' },
  { value: 'South Bengal', label: 'South Bengal' },
  { value: 'Western Ghats', label: 'Western Ghats' },
  { value: 'Eastern Ghats', label: 'Eastern Ghats' },
  { value: 'Sundarbans', label: 'Sundarbans' },
  { value: 'Chotanagpur Plateau', label: 'Chotanagpur Plateau' },
  { value: 'Deccan Plateau', label: 'Deccan Plateau' },
  { value: 'Gangetic Plains', label: 'Gangetic Plains' },
  { value: 'Coromandel Coast', label: 'Coromandel Coast' },
  { value: 'Godavari Delta', label: 'Godavari Delta' },
  { value: 'Krishna Delta', label: 'Krishna Delta' },
  { value: 'Cauvery Delta', label: 'Cauvery Delta' }
];

export const IrrigationAdvicePanel = () => {
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

  const [recommendationHistory, setRecommendationHistory] = useState<
    { date: string; waterQuantity: string }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Noida');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const cropOptions = [
    'Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Vegetables', 'Fruits',
    'Barley', 'Millet', 'Sorghum', 'Soybean', 'Groundnut', 'Sunflower', 'Mustard',
    'Pulses', 'Lentil', 'Chickpea', 'Pea', 'Potato', 'Tomato', 'Onion', 'Garlic',
    'Cabbage', 'Cauliflower', 'Carrot', 'Spinach', 'Okra', 'Brinjal', 'Pumpkin',
    'Banana', 'Mango', 'Papaya', 'Guava', 'Pomegranate', 'Apple', 'Grapes',
    'Tea', 'Coffee', 'Rubber', 'Jute', 'Tobacco', 'Cotton', 'Peanut', 'Sesame',
    'Coconut', 'Arecanut', 'Cashew', 'Oil Palm', 'Sugar Beet', 'Sweet Potato'
  ].sort();

  const soilOptions = [
    'Clay', 'Loam', 'Sandy', 'Silty', 'Peaty', 'Chalky','Loamy', 'Clayey', 'Alluvial', 'Black', 'Sandy Loam', 'Sandy', 'Laterite'
  ].sort();

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

    try {
      const geminiResponse = await getIrrigationAdviceFromGemini({
        cropType: formData.cropType,
        soilType: formData.soilType,
        region: formData.region,
        growthStage: formData.growthStage,
        soilMoisture: formData.soilMoisture,
        lastIrrigationDate: formData.lastIrrigationDate,
      });

      const newRecommendation = {
        waterQuantity: geminiResponse.waterQuantity || 'N/A',
        nextIrrigationDate: geminiResponse.nextDate || 'N/A',
        confidence: geminiResponse.confidence || 0,
        summary: geminiResponse.reasoning || '',
        details: {
          cropWaterNeeds: '',
          expectedRainfall: '',
          soilRetention: '',
          reasoning: geminiResponse.reasoning || '',
        },
      };

      setRecommendation(newRecommendation);

      // Add to history
      setRecommendationHistory(prev => [
        {
          date: new Date().toLocaleDateString(),
          waterQuantity: newRecommendation.waterQuantity,
        },
        ...prev,
      ]);
    } catch (error) {
      setRecommendation({
        waterQuantity: 'N/A',
        nextIrrigationDate: 'N/A',
        confidence: 0,
        summary: 'Could not get advice from Gemini API.',
        details: {
          cropWaterNeeds: '',
          expectedRainfall: '',
          soilRetention: '',
          reasoning: 'Error calling Gemini API',
        },
      });
    }
    setIsLoading(false);
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
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-3 sm:px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mr-0 sm:mr-4 self-start sm:self-auto"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Irrigation Advice</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Smart AI-powered water management suggestions based on crop, soil, and weather data
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Input Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold flex items-center">
                  <Droplet className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
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
                      <SelectContent className="max-h-60 overflow-y-auto">
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
                      <SelectContent className="max-h-60 overflow-y-auto">
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
                    <CardTitle className="text-xl sm:text-2xl font-bold flex items-center">
                      <Droplet className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                      AI Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-green-800 mb-2">
                        Water Quantity: {recommendation.waterQuantity}
                      </h3>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center text-green-700 gap-2 sm:gap-0">
                        <Clock className="h-5 w-5 mr-0 sm:mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">
                          Next irrigation: {
                            recommendation.nextIrrigationDate && !isNaN(Date.parse(recommendation.nextIrrigationDate))
                              ? format(new Date(recommendation.nextIrrigationDate), 'PPP')
                              : recommendation.nextIrrigationDate
                          }
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-green-600">
                        Confidence: {(() => {
                          let confidenceValue = parseFloat(String(recommendation.confidence).replace(/%+$/, ''));
                          if (!isNaN(confidenceValue)) {
                            if (confidenceValue > 0 && confidenceValue <= 1) {
                              confidenceValue = confidenceValue * 100;
                            }
                            confidenceValue = Math.round(confidenceValue);
                          }
                          return (
                            isNaN(confidenceValue) ? 'N/A' : confidenceValue + '%'
                          );
                        })()}
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
                        {recommendationHistory.length === 0 ? (
                          <div className="text-gray-500">No recommendations yet.</div>
                        ) : (
                          recommendationHistory.map((rec, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-500">{rec.date}</div>
                              <div className="font-medium">{rec.waterQuantity}</div>
                            </div>
                          ))
                        )}
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