import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, MapPin, Calendar, Droplet, Bug, Upload, Download, Share2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PestDiseasePrediction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    crop: '',
    region: '',
    season: '',
    soilType: '',
    nitrogen: 50,
    phosphorus: 25,
    potassium: 70,
    soilpH: 6.5,
    previousIssues: [] as string[],
    noHistory: false,
    images: [] as File[],
  });

  const [predictions, setPredictions] = useState<{
    risks: Array<{
      name: string;
      riskLevel: 'High' | 'Medium' | 'Low';
      confidence: number;
      symptoms: string;
      prevention: string[];
      treatment: string[];
    }>;
    summary: {
      totalRisks: number;
      riskDistribution: { [key: string]: number };
    };
  } | null>(null);

  const cropOptions = [
    { value: 'rice', label: 'Rice', icon: '🌾' },
    { value: 'maize', label: 'Maize', icon: '🌽' },
    { value: 'tomato', label: 'Tomato', icon: '🍅' },
    { value: 'wheat', label: 'Wheat', icon: '🌾' },
    { value: 'cotton', label: 'Cotton', icon: '🧶' },
  ];

  const soilTypes = [
    { value: 'loamy', label: 'Loamy', description: 'Well-balanced soil with good drainage' },
    { value: 'sandy', label: 'Sandy', description: 'Light and well-draining' },
    { value: 'clayey', label: 'Clayey', description: 'Heavy and moisture-retaining' },
    { value: 'silty', label: 'Silty', description: 'Fertile and moisture-retaining' },
  ];

  const pestDiseaseOptions = [
    'Aphids',
    'Whiteflies',
    'Leaf Blight',
    'Root Rot',
    'Powdery Mildew',
    'Rust',
    'Bacterial Spot',
    'Nematodes',
  ];

  const handleChange = (name: string, value: any) => {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call and prediction
    setPredictions({
      risks: [
        {
          name: 'Leaf Blight',
          riskLevel: 'High',
          confidence: 85,
          symptoms: 'Brown lesions on leaves, yellowing of leaf margins',
          prevention: [
            'Use disease-resistant varieties',
            'Maintain proper plant spacing',
            'Avoid overhead irrigation',
          ],
          treatment: [
            'Apply copper-based fungicides',
            'Remove and destroy infected plant parts',
            'Improve air circulation',
          ],
        },
        {
          name: 'Aphids',
          riskLevel: 'Medium',
          confidence: 75,
          symptoms: 'Curled leaves, sticky residue on leaves',
          prevention: [
            'Introduce beneficial insects',
            'Use reflective mulches',
            'Regular monitoring',
          ],
          treatment: [
            'Apply neem oil',
            'Use insecticidal soap',
            'Introduce ladybugs',
          ],
        },
      ],
      summary: {
        totalRisks: 2,
        riskDistribution: {
          'High Risk': 1,
          'Medium Risk': 1,
          'Low Risk': 0,
        },
      },
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 py-12 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6"
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
          <Bug className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pest & Disease Prediction</h1>
          <p className="text-gray-600 text-lg">Analyze your crops for potential threats and get preventive measures.</p>
        </motion.div>

        {!predictions ? (
          <Card className="w-full max-w-5xl mx-auto shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Input Parameters</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Crop Selection */}
                <div className="space-y-4">
                  <Label>Crop Selection</Label>
                  <Select onValueChange={(value) => handleChange('crop', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropOptions.map(crop => (
                        <SelectItem key={crop.value} value={crop.value}>
                          <span className="flex items-center">
                            <span className="mr-2">{crop.icon}</span>
                            {crop.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Region & Season */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Region</Label>
                    <div className="flex">
                      <Input
                        placeholder="Enter location"
                        value={formData.region}
                        onChange={(e) => handleChange('region', e.target.value)}
                      />
                      <Button variant="outline" className="ml-2">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Season</Label>
                    <Select onValueChange={(value) => handleChange('season', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kharif">Kharif</SelectItem>
                        <SelectItem value="rabi">Rabi</SelectItem>
                        <SelectItem value="zaid">Zaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Soil Type Cards */}
                <div className="space-y-4">
                  <Label>Soil Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {soilTypes.map(soil => (
                      <Card
                        key={soil.value}
                        className={`cursor-pointer transition-all ${
                          formData.soilType === soil.value ? 'ring-2 ring-emerald-500' : ''
                        }`}
                        onClick={() => handleChange('soilType', soil.value)}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{soil.label}</h3>
                          <p className="text-sm text-gray-500">{soil.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Nutrient Levels */}
                <div className="space-y-6">
                  <Label>Soil Nutrients</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <Label>Nitrogen (N) - mg/kg: {formData.nitrogen}</Label>
                      <Slider
                        value={[formData.nitrogen]}
                        onValueChange={(value) => handleSliderChange('nitrogen', value)}
                        min={0}
                        max={200}
                        step={1}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Phosphorus (P) - mg/kg: {formData.phosphorus}</Label>
                      <Slider
                        value={[formData.phosphorus]}
                        onValueChange={(value) => handleSliderChange('phosphorus', value)}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Potassium (K) - mg/kg: {formData.potassium}</Label>
                      <Slider
                        value={[formData.potassium]}
                        onValueChange={(value) => handleSliderChange('potassium', value)}
                        min={0}
                        max={150}
                        step={1}
                      />
                    </div>
                  </div>
                </div>

                {/* Soil pH */}
                <div className="space-y-4">
                  <Label>Soil pH: {formData.soilpH}</Label>
                  <Slider
                    value={[formData.soilpH]}
                    onValueChange={(value) => handleSliderChange('soilpH', value)}
                    min={4}
                    max={9}
                    step={0.1}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Acidic</span>
                    <span>Neutral</span>
                    <span>Alkaline</span>
                  </div>
                </div>

                {/* Previous Issues */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Previous Issues</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="no-history" className="text-sm">No History</Label>
                      <Switch
                        id="no-history"
                        checked={formData.noHistory}
                        onCheckedChange={(checked) => handleChange('noHistory', checked)}
                      />
                    </div>
                  </div>
                  {!formData.noHistory && (
                    <Select onValueChange={(value) => handleChange('previousIssues', [...formData.previousIssues, value])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select previous issues" />
                      </SelectTrigger>
                      <SelectContent>
                        {pestDiseaseOptions.map(issue => (
                          <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {formData.previousIssues.map(issue => (
                      <Badge
                        key={issue}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {issue}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => handleChange('previousIssues', formData.previousIssues.filter(i => i !== issue))}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>Upload Images (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-gray-600">Drag and drop images here or click to upload</span>
                    </label>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => removeImage(index)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                >
                  Analyze for Threats
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Risk Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis Summary</CardTitle>
                <CardDescription>
                  {predictions.summary.totalRisks} potential threats detected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(predictions.summary.riskDistribution).map(([level, count]) => (
                    <Card key={level}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{level}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Risks */}
            <div className="space-y-4">
              {predictions.risks.map((risk, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className={`h-5 w-5 ${getRiskColor(risk.riskLevel)}`} />
                        {risk.name}
                      </CardTitle>
                      <Badge className={getRiskColor(risk.riskLevel)}>
                        {risk.riskLevel} Risk
                      </Badge>
                    </div>
                    <CardDescription>
                      Confidence: {risk.confidence}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="symptoms">
                        <AccordionTrigger>Symptoms</AccordionTrigger>
                        <AccordionContent>
                          {risk.symptoms}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="prevention">
                        <AccordionTrigger>Prevention Measures</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-4 space-y-2">
                            {risk.prevention.map((measure, i) => (
                              <li key={i}>{measure}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="treatment">
                        <AccordionTrigger>Treatment Options</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-4 space-y-2">
                            {risk.treatment.map((option, i) => (
                              <li key={i}>{option}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" onClick={() => setPredictions(null)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Input
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share with Agronomist
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PestDiseasePrediction; 