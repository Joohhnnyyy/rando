import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCw, Leaf, Thermometer, CloudRain, Droplet, Sprout, Bug, Target, Info, Download, Mail, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const CropRotationPlanner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentCrop: '',
    previousCrops: [] as string[],
    soilType: '',
    nitrogen: 50,
    phosphorus: 25,
    potassium: 70,
    soilpH: 6.5,
    climateZone: '',
    season: '',
    waterAvailability: '',
    irrigationType: '',
    pestDiseaseHistory: [] as string[],
    targetGoal: '',
  });
  const [recommendation, setRecommendation] = useState<{ nextCrop: string; justification: string; advantages: string[]; rotationPlan?: string[] } | null>(null);

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

  const handleMultiSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentArray = (prev as any)[name] as string[];
      if (currentArray.includes(value)) {
        return {
          ...prev,
          [name]: currentArray.filter(item => item !== value),
        };
      } else {
        return {
          ...prev,
          [name]: [...currentArray, value],
        };
      }
    });
  };

  const handleRemoveTag = (name: string, tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: (prev as any)[name].filter((item: string) => item !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Crop Rotation Planner Form Data:', formData);
    // Simulate a recommendation
    setRecommendation({
      nextCrop: 'Pulses',
      justification: 'Pulses are excellent for nitrogen fixation, improving soil fertility for subsequent crops, especially after cereal crops like Wheat or Maize. They also help in breaking pest and disease cycles common to cereals.',
      advantages: [
        'Nitrogen fixation: Naturally enriches soil with nitrogen, reducing fertilizer needs.',
        'Pest & Disease break: Disrupts life cycles of pests and diseases specific to previous crops.',
        'Soil health improvement: Enhances soil structure and microbial activity.',
        'Increased biodiversity: Contributes to a more balanced farm ecosystem.',
      ],
      rotationPlan: ['Season 1 (Rabi): Wheat', 'Season 2 (Kharif): Pulses', 'Season 3 (Rabi): Mustard'],
    });
  };

  const cropOptions = ['Wheat', 'Rice', 'Maize', 'Barley', 'Pulses', 'Mustard', 'Soybean', 'Cotton'];
  const soilOptions = ['Clay', 'Loamy', 'Sandy', 'Silty'];
  const climateOptions = ['Tropical', 'Temperate', 'Arid', 'Subtropical', 'Mediterranean'];
  const seasonOptions = ['Kharif', 'Rabi', 'Zaid'];
  const waterAvailabilityOptions = ['High', 'Medium', 'Low'];
  const irrigationTypeOptions = ['Drip', 'Flood', 'Sprinkler', 'None'];
  const pestDiseaseOptions = ['Fungal Infection', 'Pest Attacks', 'Bacterial Blight', 'Rust', 'Nematodes', 'None'];
  const targetGoalOptions = [
    { value: 'maximize_yield', label: 'Maximize Yield' },
    { value: 'improve_soil_health', label: 'Improve Soil Health' },
    { value: 'minimize_pest_risk', label: 'Minimize Pest Risk' },
    { value: 'match_market_demand', label: 'Match Market Demand' },
    { value: 'water_conservation', label: 'Water Conservation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-5xl mb-4">
          <Button
            variant="ghost"
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <RotateCw className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Crop Rotation Planner</h1>
          <p className="text-gray-600 text-lg">Plan your crop rotations for sustainable farming and improved productivity.</p>
        </motion.div>

        <Card className="w-full max-w-5xl shadow-xl rounded-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Leaf className="mr-2" /> Rotation Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
              {/* Section 1: Previous Crop History */}
              <div className="space-y-2 lg:col-span-1">
                <Label htmlFor="currentCrop">Current Crop</Label>
                <Select name="currentCrop" onValueChange={(value) => handleSelectChange('currentCrop', value)} value={formData.currentCrop}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select current crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map(crop => <SelectItem key={crop} value={crop.toLowerCase()}>{crop}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="previousCrops">Previous Crop(s)</Label>
                <Select name="previousCrops" onValueChange={(value) => handleMultiSelectChange('previousCrops', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select previous crop(s)" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map(crop => (
                      <SelectItem key={crop} value={crop.toLowerCase()}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.previousCrops.map(crop => (
                    <span key={crop} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                      {/* Add dynamic icon based on crop type if available, otherwise generic leaf */}
                      <Leaf className="h-4 w-4 mr-1" />
                      {crop}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-0 text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveTag('previousCrops', crop)}
                      >
                        x
                      </Button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Section 2: Soil and Field Details */}
              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select name="soilType" onValueChange={(value) => handleSelectChange('soilType', value)} value={formData.soilType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilOptions.map(type => <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
                {/* Placeholder for visual description if needed */}
              </div>

              <Label>Nitrogen (N) - mg/kg: {formData.nitrogen}</Label>
              <Slider value={[formData.nitrogen]} onValueChange={val => setFormData(prev => ({ ...prev, nitrogen: val[0] }))} min={0} max={200} step={1} className="[&>span]:bg-gray-200"/>

              <Label>Phosphorus (P) - mg/kg: {formData.phosphorus}</Label>
              <Slider value={[formData.phosphorus]} onValueChange={val => setFormData(prev => ({ ...prev, phosphorus: val[0] }))} min={0} max={100} step={1} className="[&>span]:bg-gray-200"/>

              <Label>Potassium (K) - mg/kg: {formData.potassium}</Label>
              <Slider value={[formData.potassium]} onValueChange={val => setFormData(prev => ({ ...prev, potassium: val[0] }))} min={0} max={150} step={1} className="[&>span]:bg-gray-200"/>

              <Label>Soil pH: {formData.soilpH}</Label>
              <Slider value={[formData.soilpH]} onValueChange={val => setFormData(prev => ({ ...prev, soilpH: val[0] }))} min={0} max={14} step={0.1} className="[&>span]:bg-gray-200"/>

              <div className="space-y-2">
                <Label htmlFor="climateZone">Climate Zone or Region</Label>
                <Select name="climateZone" onValueChange={(value) => handleSelectChange('climateZone', value)} value={formData.climateZone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select climate zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {climateOptions.map(zone => <SelectItem key={zone} value={zone.toLowerCase()}>{zone}</SelectItem>)}
                  </SelectContent>
                </Select>
                {/* Placeholder for location autocomplete */}
              </div>

              <div className="space-y-2">
                <Label htmlFor="season">Season</Label>
                <Select name="season" onValueChange={(value) => handleSelectChange('season', value)} value={formData.season}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasonOptions.map(season => <SelectItem key={season} value={season.toLowerCase()}>{season}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterAvailability">Water Availability</Label>
                <Select name="waterAvailability" onValueChange={(value) => handleSelectChange('waterAvailability', value)} value={formData.waterAvailability}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select water availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {waterAvailabilityOptions.map(water => <SelectItem key={water} value={water.toLowerCase()}>{water}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="irrigationType">Irrigation Type</Label>
                <Select name="irrigationType" onValueChange={(value) => handleSelectChange('irrigationType', value)} value={formData.irrigationType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select irrigation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {irrigationTypeOptions.map(type => <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="pestDiseaseHistory">Pest or Disease History (Optional)</Label>
                <Select name="pestDiseaseHistory" onValueChange={(value) => handleMultiSelectChange('pestDiseaseHistory', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select history (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {pestDiseaseOptions.map(history => (
                      <SelectItem key={history} value={history.toLowerCase()}>
                        {history}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.pestDiseaseHistory.map(item => (
                    <span key={item} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                      {/* Add dynamic icon based on crop type if available, otherwise generic leaf */}
                      <Bug className="h-4 w-4 mr-1" />
                      {item}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-0 text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveTag('pestDiseaseHistory', item)}
                      >
                        x
                      </Button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Section 3: Farming Goals */}
              <div className="space-y-2 lg:col-span-3">
                <Label htmlFor="targetGoal">Target Goal</Label>
                <ToggleGroup type="single" value={formData.targetGoal} onValueChange={(value: string) => handleSelectChange('targetGoal', value)} className="flex flex-wrap gap-2">
                  {targetGoalOptions.map(goal => (
                    <ToggleGroupItem
                      key={goal.value}
                      value={goal.value}
                      aria-label={goal.label}
                      className="bg-white text-gray-700 data-[state=on]:bg-black data-[state=on]:text-white hover:bg-gray-200 hover:text-gray-900 transition-colors"
                    >
                      {goal.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              <div className="md:col-span-2 lg:col-span-3 flex justify-between items-center mt-8">
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  Generate Rotation Plan
                </Button>
                <Button variant="ghost" onClick={() => navigate('/services')}>
                  Back to Services
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {recommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-5xl bg-blue-50 border border-blue-200 text-blue-800 p-8 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Leaf className="mr-2 h-6 w-6" /> Recommended Next Crop: <span className="text-blue-700 ml-2">{recommendation.nextCrop}</span>
            </h3>
            <p className="text-lg mb-2"><strong>Justification:</strong> {recommendation.justification}</p>
            <h4 className="text-lg font-semibold mt-4">Advantages:</h4>
            <ul className="list-disc list-inside ml-4 mb-4">
              {recommendation.advantages.map((advantage, index) => (
                <li key={index}>{advantage}</li>
              ))}
            </ul>

            {recommendation.rotationPlan && (
              <div>
                <h4 className="text-lg font-semibold mt-4">Suggested Rotation Plan:</h4>
                <ul className="list-disc list-inside ml-4">
                  {recommendation.rotationPlan.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center"><Info className="mr-2 h-4 w-4" />Why this crop?</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Justification for {recommendation.nextCrop}</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p>{recommendation.justification}</p>
                    <h4 className="text-lg font-semibold mt-4">Detailed Advantages:</h4>
                    <ul className="list-disc list-inside ml-4">
                      {recommendation.advantages.map((advantage, index) => (
                        <li key={index}>{advantage}</li>
                      ))}
                    </ul>
                    {recommendation.rotationPlan && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold">Rotation Plan Context:</h4>
                        <ul className="list-disc list-inside ml-4">
                          {recommendation.rotationPlan.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="flex items-center"><Download className="mr-2 h-4 w-4" />Download Plan</Button>
              <Button variant="outline" className="flex items-center"><Mail className="mr-2 h-4 w-4" />Send via Email</Button>
            </div>

            {/* Placeholder for Crop Timeline */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg text-gray-700 text-center">
              <h4 className="text-lg font-semibold mb-2">Crop Timeline Placeholder</h4>
              <p>Integrate a horizontal timeline or calendar view here showing past, current, and future rotation paths.</p>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CropRotationPlanner; 