import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Leaf, Thermometer, CloudRain, Droplet, Sprout, CalendarDays, FlaskConical, Bug, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const YieldPrediction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    soilType: '',
    cropType: '',
    temperature: '',
    rainfall: '',
    humidity: '',
    soilpH: '',
    fertilizerUsage: '',
    sowingDate: null as Date | null,
    harvestDate: null as Date | null,
    previousCrop: '',
    pesticideUsage: '',
  });
  const [predictedYield, setPredictedYield] = useState<string | null>(null);

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

  const handleDateChange = (name: string, date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [name]: date || null,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Yield Prediction Form Data:', formData);
    // Simulate a prediction for demonstration
    setPredictedYield('5.2 tons per hectare');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <Navigation />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <TrendingUp className="mx-auto h-16 w-16 text-purple-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Yield Prediction</h1>
          <p className="text-gray-600 text-lg">Forecast crop yields using machine learning and historical data analysis.</p>
        </motion.div>

        <Card className="w-full max-w-4xl shadow-xl rounded-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Leaf className="mr-2" /> Yield Prediction Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select name="soilType" onValueChange={(value) => handleSelectChange('soilType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="loam">Loam</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="silty">Silty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Select name="cropType" onValueChange={(value) => handleSelectChange('cropType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="barley">Barley</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
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
              <div className="space-y-2">
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
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  type="number"
                  id="humidity"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  placeholder="e.g., 70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="soilpH">Soil pH (0-14)</Label>
                <Input
                  type="number"
                  id="soilpH"
                  name="soilpH"
                  value={formData.soilpH}
                  onChange={handleChange}
                  placeholder="e.g., 6.5"
                  min="0"
                  max="14"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fertilizerUsage">Fertilizer Usage (N-P-K / Category)</Label>
                <Select name="fertilizerUsage" onValueChange={(value) => handleSelectChange('fertilizerUsage', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select usage or enter NPK" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="npk-20-20-0">NPK 20-20-0</SelectItem>
                    <SelectItem value="npk-10-26-26">NPK 10-26-26</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sowingDate">Sowing Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.sowingDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {formData.sowingDate ? format(formData.sowingDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.sowingDate || undefined}
                      onSelect={(date) => handleDateChange('sowingDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="harvestDate">Harvest Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.harvestDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {formData.harvestDate ? format(formData.harvestDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.harvestDate || undefined}
                      onSelect={(date) => handleDateChange('harvestDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="previousCrop">Previous Crop</Label>
                <Select name="previousCrop" onValueChange={(value) => handleSelectChange('previousCrop', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select previous crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="barley">Barley</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pesticideUsage">Pesticide Usage (Optional)</Label>
                <Select name="pesticideUsage" onValueChange={(value) => handleSelectChange('pesticideUsage', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select usage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 flex justify-between items-center mt-6">
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  Predict Yield
                </Button>
                <Button variant="ghost" onClick={() => navigate('/services')}>
                  Back to Services
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {predictedYield && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-4xl bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <h3 className="text-xl font-bold">Predicted Yield:</h3>
            <span className="text-2xl font-semibold">{predictedYield}</span>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default YieldPrediction; 