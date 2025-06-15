import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  Camera, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Leaf,
  RefreshCw,
  AlertCircle,
  History,
  Crop,
  Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ImageUpload = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("upload");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  const handleAnalyze = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult({
        cropType: 'Tomato',
        issue: 'Bacterial Spot',
        confidence: 92,
        severity: 'High',
        recommendations: {
          diseaseInfo: 'Bacterial spot is a common disease affecting tomato plants, caused by Xanthomonas bacteria.',
          immediateActions: [
            'Remove and destroy infected leaves',
            'Avoid overhead watering',
            'Maintain proper plant spacing'
          ],
          treatments: [
            'Apply copper-based fungicide',
            'Use biological control agents',
            'Implement crop rotation'
          ],
          preventiveMeasures: [
            'Use disease-resistant varieties',
            'Practice good sanitation',
            'Monitor regularly for early signs'
          ]
        }
      });
      setIsAnalyzing(false);
      setActiveTab("results");
    }, 2000);
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setAnalysisResult(null);
    setActiveTab("upload");
  };

  const handleCapturePhoto = () => {
    // Implement camera capture functionality
    console.log("Camera capture not implemented yet");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mr-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Visual Crop Analysis</h1>
                <p className="text-gray-600 mt-2">
                  Upload a photo of your crop to detect diseases, pests, or deficiencies instantly
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Get AI-powered insights within seconds
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                Upload History
              </Button>
              <Button variant="outline" size="sm">
                <Database className="h-4 w-4 mr-2" />
                Disease Database
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="preview" disabled={!preview}>Preview</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysisResult}>Results</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>
                  Upload a clear photo of your crop for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                      ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to select a file
                    </p>
                    <p className="text-xs text-gray-400">
                      Supported formats: JPG, PNG (max 5MB)
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Button
                      className="w-full"
                      onClick={handleCapturePhoto}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Capture Photo
                    </Button>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Tips for best results:</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Ensure good lighting</li>
                        <li>• Focus on the affected area</li>
                        <li>• Include both healthy and affected parts</li>
                        <li>• Keep the image clear and sharp</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Preview & Confirm</CardTitle>
                <CardDescription>
                  Review your image before analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={handleReset}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      className="flex-1"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        'Analyze Image'
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleReset}
                    >
                      Try Another Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <AnimatePresence>
              {isAnalyzing ? (
                <Card>
                  <CardContent className="p-8">
                    <div className="text-center">
                      <RefreshCw className="mx-auto h-12 w-12 text-blue-500 animate-spin mb-4" />
                      <h3 className="text-lg font-medium mb-2">Analyzing Image</h3>
                      <p className="text-gray-500">Please wait while we process your image...</p>
                      <Progress value={75} className="mt-4" />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Analysis Results</CardTitle>
                          <CardDescription>
                            Detected {analysisResult?.cropType} with {analysisResult?.issue}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={analysisResult?.severity === 'High' ? 'destructive' : 'default'}
                          className="text-sm"
                        >
                          {analysisResult?.severity} Severity
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Leaf className="h-5 w-5 text-green-500 mr-2" />
                          <span className="font-medium">Crop Type:</span>
                        </div>
                        <span>{analysisResult?.cropType}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                          <span className="font-medium">Detected Issue:</span>
                        </div>
                        <span>{analysisResult?.issue}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="font-medium">Confidence:</span>
                        </div>
                        <span>{analysisResult?.confidence}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Disease Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        {analysisResult?.recommendations.diseaseInfo}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                          Immediate Actions
                        </h4>
                        <ul className="list-disc pl-4 space-y-1">
                          {analysisResult?.recommendations.immediateActions.map((action: string, index: number) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Leaf className="h-4 w-4 text-green-500 mr-2" />
                          Suggested Treatments
                        </h4>
                        <ul className="list-disc pl-4 space-y-1">
                          {analysisResult?.recommendations.treatments.map((treatment: string, index: number) => (
                            <li key={index}>{treatment}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2" />
                          Preventive Measures
                        </h4>
                        <ul className="list-disc pl-4 space-y-1">
                          {analysisResult?.recommendations.preventiveMeasures.map((measure: string, index: number) => (
                            <li key={index}>{measure}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleReset}
                    >
                      Try Another Image
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                    >
                      Report Issue
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default ImageUpload; 