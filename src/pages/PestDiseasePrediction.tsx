import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, MapPin, Calendar, Droplet, Bug, Upload, Download, Share2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cropOptions = [
    { value: 'rice', label: 'Rice' },
    { value: 'maize', label: 'Maize' },
    { value: 'tomato', label: 'Tomato' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'cotton', label: 'Cotton' },
  ];

  const soilTypes = [
    { value: 'loamy', label: 'Loamy' },
    { value: 'sandy', label: 'Sandy' },
    { value: 'clayey', label: 'Clayey' },
    { value: 'silty', label: 'Silty' },
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
        images: [...prev.images, ...newImages].slice(0, 5), // Limit to 5 images
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
    setLoading(true);
    setError(null);
    setPredictions(null);

    // Simulate API call and prediction
    setTimeout(() => {
      try {
        setPredictions({
          risks: [
            {
              name: 'Leaf Blight',
              riskLevel: 'High',
              confidence: 85,
              symptoms: 'Brown lesions on leaves, yellowing of leaf margins.',
              prevention: [
                'Use disease-resistant crop varieties.',
                'Ensure proper plant spacing for good air circulation.',
                'Avoid overhead irrigation to keep foliage dry.',
              ],
              treatment: [
                'Apply copper-based fungicides at first sign of disease.',
                'Remove and destroy infected plant parts immediately.',
                'Improve air circulation through pruning.',
              ],
            },
            {
              name: 'Aphids',
              riskLevel: 'Medium',
              confidence: 75,
              symptoms: 'Curled or yellowing leaves, sticky "honeydew" residue.',
              prevention: [
                'Introduce beneficial insects like ladybugs.',
                'Use reflective mulches to deter aphids.',
                'Conduct regular plant inspections.',
              ],
              treatment: [
                'Apply neem oil or insecticidal soap.',
                'Use a strong jet of water to dislodge them.',
                'Encourage natural predators in the area.',
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
      } catch (err) {
        setError('Failed to get predictions. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const getRiskBadgeVariant = (level: string): "destructive" | "warning" | "success" | "default" => {
    switch (level) {
      case 'High': return 'destructive';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <Button
            variant="ghost"
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
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
          <Bug className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pest & Disease Prediction</h1>
          <p className="text-gray-600 text-lg">Analyze your crops for potential threats and get preventive measures.</p>
        </motion.div>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Form */}
          <Card className="shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Leaf className="mr-2" /> Input Parameters
              </CardTitle>
              <p className="text-gray-500 text-base mt-2">Provide details about your crop and field conditions.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8 mt-6">
                {/* Crop & Location */}
                <div>
                  <h2 className="text-lg font-semibold text-green-700 mb-4">Crop & Location</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="crop">Crop Type</Label>
                      <Select name="crop" onValueChange={(value) => handleChange('crop', value)}>
                        <SelectTrigger><SelectValue placeholder="Select a crop" /></SelectTrigger>
                        <SelectContent>
                          {cropOptions.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region/Location</Label>
                      <Input name="region" placeholder="e.g., Punjab, India" value={formData.region} onChange={(e) => handleChange('region', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="season">Season</Label>
                      <Select name="season" onValueChange={(value) => handleChange('season', value)}>
                        <SelectTrigger><SelectValue placeholder="Select season" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kharif">Kharif</SelectItem>
                          <SelectItem value="rabi">Rabi</SelectItem>
                          <SelectItem value="zaid">Zaid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="soilType">Soil Type</Label>
                      <Select name="soilType" onValueChange={(value) => handleChange('soilType', value)}>
                        <SelectTrigger><SelectValue placeholder="Select soil type" /></SelectTrigger>
                        <SelectContent>
                          {soilTypes.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Soil Nutrients */}
                <div>
                  <h2 className="text-lg font-semibold text-green-700 mb-4 mt-6">Soil Nutrients</h2>
                  <div className="space-y-6">
                    <div>
                      <Label>Nitrogen (N) - mg/kg: {formData.nitrogen}</Label>
                      <Slider value={[formData.nitrogen]} onValueChange={v => handleSliderChange('nitrogen', v)} min={0} max={200} step={1} className="[&>span]:bg-gray-200" />
                    </div>
                    <div>
                      <Label>Phosphorus (P) - mg/kg: {formData.phosphorus}</Label>
                      <Slider value={[formData.phosphorus]} onValueChange={v => handleSliderChange('phosphorus', v)} min={0} max={100} step={1} className="[&>span]:bg-gray-200" />
                    </div>
                    <div>
                      <Label>Potassium (K) - mg/kg: {formData.potassium}</Label>
                      <Slider value={[formData.potassium]} onValueChange={v => handleSliderChange('potassium', v)} min={0} max={150} step={1} className="[&>span]:bg-gray-200" />
                    </div>
                    <div>
                      <Label>Soil pH: {formData.soilpH}</Label>
                      <Slider value={[formData.soilpH]} onValueChange={v => handleSliderChange('soilpH', v)} min={0} max={14} step={0.1} className="[&>span]:bg-gray-200" />
                    </div>
                  </div>
                </div>

                {/* History & Image Upload */}
                <div>
                  <h2 className="text-lg font-semibold text-green-700 mb-4 mt-6">History & Observations</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="previousIssues">Previous Pest/Disease Issues (Optional)</Label>
                      <Select name="previousIssues" onValueChange={(value) => handleMultiSelectChange('previousIssues', value)}>
                        <SelectTrigger><SelectValue placeholder="Select past issues" /></SelectTrigger>
                        <SelectContent>
                          {pestDiseaseOptions.map(p => <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {formData.previousIssues.map(item => (
                          <span key={item} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                            <Bug className="h-4 w-4 mr-1.5" />
                            {item}
                            <button type="button" className="ml-2 text-gray-500 hover:text-red-500" onClick={() => handleRemoveTag('previousIssues', item)}>&times;</button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="images">Upload Crop Images (Optional)</Label>
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                                <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">PNG, JPG, or JPEG (MAX. 5 images)</p>
                            </div>
                            <Input id="dropzone-file" type="file" className="hidden" multiple onChange={handleImageUpload} accept="image/png, image/jpeg, image/jpg" />
                        </label>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {formData.images.map((file, index) => (
                          <div key={index} className="relative">
                            <img src={URL.createObjectURL(file)} alt={`upload-${index}`} className="h-16 w-16 rounded-md object-cover" />
                            <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 w-4 h-4 flex items-center justify-center text-xs">&times;</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 pt-4">
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800 w-full md:w-auto" disabled={loading}>
                    {loading ? 'Analyzing...' : 'Get Predictions'}
                  </Button>
                  <Button variant="outline" type="button" onClick={() => navigate('/services')} className="w-full md:w-auto">
                    Back to Services
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Right: Result Panel */}
          <Card className="shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Bug className="mr-2" /> Prediction Results
              </CardTitle>
              <p className="text-gray-500 text-base mt-2">Potential risks and recommendations will appear here.</p>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                  <p className="text-gray-600">Analyzing data and making predictions...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-red-600">
                  <AlertTriangle className="h-16 w-16 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Analysis Failed</h2>
                  <p>{error}</p>
                </div>
              ) : !predictions ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <Leaf className="h-16 w-16 text-green-400 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">No predictions yet</h2>
                  <p className="text-gray-500 text-center max-w-xs">
                    Enter your field data on the left and click <span className="font-semibold">Get Predictions</span> to see potential risks.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Analysis Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-around items-center text-center">
                      <div>
                        <p className="text-3xl font-bold">{predictions.summary.totalRisks}</p>
                        <p className="text-sm text-gray-500">Total Risks</p>
                      </div>
                      {Object.entries(predictions.summary.riskDistribution).map(([level, count]) => (
                        <div key={level}>
                          <p className="text-3xl font-bold">{count}</p>
                          <p className="text-sm text-gray-500">{level}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Accordion type="single" collapsible className="w-full">
                    {predictions.risks.map((risk, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>
                          <div className="flex items-center justify-between w-full">
                            <span className="font-semibold text-lg">{risk.name}</span>
                            <div className="flex items-center gap-2">
                                <Badge variant={getRiskBadgeVariant(risk.riskLevel)}>{risk.riskLevel} Risk</Badge>
                                <Badge variant="outline">{risk.confidence}% Conf.</Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-1">Symptoms to Watch For:</h4>
                            <p className="text-gray-600">{risk.symptoms}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1 text-green-700">Prevention Measures:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {risk.prevention.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1 text-red-700">Treatment Options:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {risk.treatment.map((t, i) => <li key={i}>{t}</li>)}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-2 justify-start">
                    <Button variant="outline" size="sm" className="flex items-center"><Download className="mr-2 h-4 w-4" />Download Report</Button>
                    <Button variant="outline" size="sm" className="flex items-center"><Share2 className="mr-2 h-4 w-4" />Share Results</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PestDiseasePrediction; 