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

                {/* Soil Nutrients */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-4">
                  <div className="space-y-3">
                    <Label htmlFor="nitrogen" className="font-medium">Nitrogen (N) - (kg/ha)</Label>
                    <Slider
                      id="nitrogen"
                      value={[formData.nitrogen]}
                      onValueChange={(value) => handleSliderChange('nitrogen', value)}
                      min={0}
                      max={200}
                      step={1}
                      className="[&>span]:bg-gray-200"
                    />
                    <div className="text-right text-sm text-gray-600">{formData.nitrogen} kg/ha</div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phosphorus" className="font-medium">Phosphorus (P) - (kg/ha)</Label>
                    <Slider
                      id="phosphorus"
                      value={[formData.phosphorus]}
                      onValueChange={(value) => handleSliderChange('phosphorus', value)}
                      min={0}
                      max={100}
                      step={1}
                      className="[&>span]:bg-gray-200"
                    />
                    <div className="text-right text-sm text-gray-600">{formData.phosphorus} kg/ha</div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="potassium" className="font-medium">Potassium (K) - (kg/ha)</Label>
                    <Slider
                      id="potassium"
                      value={[formData.potassium]}
                      onValueChange={(value) => handleSliderChange('potassium', value)}
                      min={0}
                      max={150}
                      step={1}
                      className="[&>span]:bg-gray-200"
                    />
                    <div className="text-right text-sm text-gray-600">{formData.potassium} kg/ha</div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="soilpH" className="font-medium">Soil pH</Label>
                    <Slider
                      id="soilpH"
                      value={[formData.soilpH]}
                      onValueChange={(value) => handleSliderChange('soilpH', value)}
                      min={0}
                      max={14}
                      step={0.1}
                      className="[&>span]:bg-gray-200"
                    />
                    <div className="text-right text-sm text-gray-600">{formData.soilpH}</div>
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

                {/* Previous Issues */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Previous Pest/Disease Issues</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="no-history-switch"
                        checked={formData.noHistory}
                        onCheckedChange={(checked) => handleChange('noHistory', checked)}
                      />
                      <Label htmlFor="no-history-switch">No History</Label>
                    </div>
                  </div>
                  <Select
                    onValueChange={(value) => {
                      if (!formData.previousIssues.includes(value)) {
                        handleChange('previousIssues', [...formData.previousIssues, value]);
                      }
                    }}
                    disabled={formData.noHistory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select previous issues..." />
                    </SelectTrigger>
                    <SelectContent>
                      {pestDiseaseOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.previousIssues.map((issue, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center">
                        {issue}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0"
                          onClick={() => {
                            const updatedIssues = formData.previousIssues.filter((_, i) => i !== index);
                            handleChange('previousIssues', updatedIssues);
                          }}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>Upload Crop Images (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Drag & drop files here, or click to browse</p>
                    <Input
                      id="image-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button variant="outline" className="mt-4" onClick={() => document.getElementById('image-upload')?.click()}>
                      Browse Files
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`upload-preview-${index}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    <Bug className="mr-2 h-5 w-5" />
                    Predict Risks
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-5xl mx-auto shadow-xl rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">Prediction Results</CardTitle>
                  <CardDescription>Based on your input, here are the potential risks.</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Risks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-4xl font-bold">{predictions.summary.totalRisks}</p>
                    </CardContent>
                  </Card>
                  {Object.entries(predictions.summary.riskDistribution).map(([level, count]) => (
                    <Card key={level}>
                      <CardHeader>
                        <CardTitle>{level}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold">{count}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {predictions.risks.map((risk, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center">
                          <Badge className={`${getRiskColor(risk.riskLevel)} mr-4`}>{risk.riskLevel}</Badge>
                          {risk.name}
                          <span className="ml-2 text-sm text-gray-500">(Confidence: {risk.confidence}%)</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 px-4">
                        <div>
                          <h4 className="font-semibold text-md">Symptoms</h4>
                          <p className="text-gray-700">{risk.symptoms}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-md">Prevention</h4>
                          <ul className="list-disc list-inside text-gray-700">
                            {risk.prevention.map((tip, i) => <li key={i}>{tip}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-md">Treatment</h4>
                          <ul className="list-disc list-inside text-gray-700">
                            {risk.treatment.map((tip, i) => <li key={i}>{tip}</li>)}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="text-center pt-6">
                  <Button onClick={() => setPredictions(null)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PestDiseasePrediction; 