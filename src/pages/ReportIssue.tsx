import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send, AlertCircle, Upload, FileText, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface ReportData {
  issueType: string;
  description: string;
  expectedResult: string;
  actualResult: string;
  confidence: number;
  imageFile?: File;
  contactEmail: string;
  priority: string;
}

const ReportIssue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get analysis data from navigation state, ensuring state is not null
  const analysisData = location.state?.analysisData || null;

  const [reportData, setReportData] = useState<ReportData>({
    issueType: '',
    description: '',
    expectedResult: '',
    actualResult: analysisData?.issue || '',
    confidence: analysisData?.confidence || 0,
    contactEmail: '',
    priority: 'medium'
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof ReportData, value: string | number) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log('Report Data:', {
        ...reportData,
        imageFile,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });

      setIsSubmitted(true);
      toast({
        title: "Report Submitted Successfully",
        description: "Thank you for your feedback. We'll review and get back to you soon.",
        variant: "default",
      });

      // Reset form after successful submission
      setTimeout(() => {
        navigate('/image-upload');
      }, 3000);

    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-white text-gray-800 border-gray-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully!</h2>
                <p className="text-gray-600 mb-4">
                  Thank you for your feedback. Our team will review your report and get back to you within 24-48 hours.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Report ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  <p>Submitted: {new Date().toLocaleString()}</p>
                </div>
                <Button 
                  onClick={() => navigate('/image-upload')}
                  className="mt-6"
                >
                  Return to Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Report an Issue</h1>
              <p className="text-gray-600 mt-2">
                Help us improve our crop analysis by reporting any issues or incorrect predictions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                  Issue Report Form
                </CardTitle>
                <CardDescription>
                  Please provide detailed information about the issue you encountered
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Issue Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Type *
                    </label>
                    <Select 
                      value={reportData.issueType} 
                      onValueChange={(value) => handleInputChange('issueType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of issue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="incorrect_prediction">Incorrect Disease Prediction</SelectItem>
                        <SelectItem value="low_confidence">Low Confidence Score</SelectItem>
                        <SelectItem value="missing_information">Missing or Incomplete Information</SelectItem>
                        <SelectItem value="technical_error">Technical Error</SelectItem>
                        <SelectItem value="ui_issue">User Interface Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <Select 
                      value={reportData.priority} 
                      onValueChange={(value) => handleInputChange('priority', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Minor issue</SelectItem>
                        <SelectItem value="medium">Medium - Moderate impact</SelectItem>
                        <SelectItem value="high">High - Significant impact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description *
                    </label>
                    <Textarea
                      value={reportData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Please describe the issue in detail. What happened? What did you expect? What went wrong?"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Expected vs Actual Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Result
                      </label>
                      <Input
                        value={reportData.expectedResult}
                        onChange={(e) => handleInputChange('expectedResult', e.target.value)}
                        placeholder="What result did you expect?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Actual Result
                      </label>
                      <Input
                        value={reportData.actualResult}
                        onChange={(e) => handleInputChange('actualResult', e.target.value)}
                        placeholder="What result did you get?"
                      />
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confidence Score (if applicable)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={reportData.confidence}
                      onChange={(e) => handleInputChange('confidence', parseInt(e.target.value) || 0)}
                      placeholder="Confidence percentage"
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email *
                    </label>
                    <Input
                      type="email"
                      value={reportData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      We'll use this to follow up on your report
                    </p>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Image (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Click to upload an image or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      </label>
                    </div>
                    {imagePreview && (
                      <div className="mt-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting || !reportData.issueType || !reportData.description || !reportData.contactEmail}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Report...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Report
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Analysis Info */}
            {analysisData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Detected Issue:</span>
                    <p className="font-medium">{analysisData.issue}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Confidence:</span>
                    <p className="font-medium">{analysisData.confidence}%</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Severity:</span>
                    <Badge variant="outline" className="mt-1">
                      {analysisData.severity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reporting Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start">
                  <FileText className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <p>Be specific about what went wrong</p>
                </div>
                <div className="flex items-start">
                  <FileText className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <p>Include relevant images if possible</p>
                </div>
                <div className="flex items-start">
                  <FileText className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <p>Provide your expected vs actual results</p>
                </div>
                <div className="flex items-start">
                  <FileText className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <p>We'll respond within 24-48 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Priority Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Priority Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">High</span>
                  <Badge className="bg-red-100 text-red-800 border-red-200">Critical Issues</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Medium</span>
                  <Badge className="bg-white text-gray-800 border-gray-200">Moderate Impact</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Low</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Minor Issues</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportIssue; 