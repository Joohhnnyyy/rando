
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Beaker, Info, RotateCcw, Leaf } from 'lucide-react';

const FertilizerRecommendationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations, formData } = location.state || { recommendations: [], formData: {} };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <Beaker className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Fertilizer Recommendations
            </h1>
            <p className="text-lg text-gray-600">
              Optimized nutrient management for {formData.cropType}
            </p>
          </div>

          <div className="space-y-6">
            {recommendations.map((fertilizer: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Leaf className="w-6 h-6 text-blue-600" />
                      <span className="text-xl">{fertilizer.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        {fertilizer.quantity}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Info className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{fertilizer.name} - Application Tips</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p><strong>Purpose:</strong> {fertilizer.purpose}</p>
                            <p><strong>Application Tips:</strong> {fertilizer.applicationTips}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{fertilizer.purpose}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Quantity:</strong> {fertilizer.quantity}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <Button onClick={() => navigate('/fertilizer-recommendation')} className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FertilizerRecommendationResults;
