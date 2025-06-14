
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Download, RotateCcw, TrendingUp } from 'lucide-react';

const CropRecommendationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations, formData } = location.state || { recommendations: [], formData: {} };

  const downloadReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      inputData: formData,
      recommendations: recommendations
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crop-recommendations-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Crop Recommendations
            </h1>
            <p className="text-lg text-gray-600">
              Based on your soil and climate conditions
            </p>
          </div>

          <div className="space-y-6">
            {recommendations.map((crop: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Leaf className="w-6 h-6 text-green-600" />
                      <span className="text-xl">{crop.name}</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {crop.confidence}% Match
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{crop.reason}</p>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${crop.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <Button onClick={() => navigate('/crop-recommendation')} className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
            <Button onClick={downloadReport} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendationResults;
