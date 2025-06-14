
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, Droplets, Thermometer } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const CropRecommendationInput = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    soilType: '',
    phLevel: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    rainfall: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Mock AI recommendation logic
      const mockRecommendations = [
        { name: 'Rice', confidence: 92, reason: 'High humidity and adequate rainfall make rice ideal' },
        { name: 'Wheat', confidence: 87, reason: 'pH and nitrogen levels are optimal for wheat cultivation' },
        { name: 'Corn', confidence: 78, reason: 'Temperature and soil conditions support corn growth' }
      ];

      // Save to database
      const { error } = await supabase
        .from('crop_recommendations')
        .insert({
          user_id: user?.id,
          soil_type: formData.soilType,
          ph_level: parseFloat(formData.phLevel),
          nitrogen: parseFloat(formData.nitrogen),
          phosphorus: parseFloat(formData.phosphorus),
          potassium: parseFloat(formData.potassium),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          rainfall: parseFloat(formData.rainfall),
          recommended_crops: mockRecommendations
        });

      if (error) throw error;

      // Navigate to results page
      navigate('/crop-recommendation/results', { 
        state: { recommendations: mockRecommendations, formData } 
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to process recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <Leaf className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Crop Recommendation
            </h1>
            <p className="text-lg text-gray-600">
              Get AI-powered crop suggestions based on your soil and climate conditions
            </p>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Soil & Climate Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="loamy">Loamy</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                        <SelectItem value="peaty">Peaty</SelectItem>
                        <SelectItem value="chalky">Chalky</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="phLevel">pH Level (0-14)</Label>
                    <Input
                      id="phLevel"
                      type="number"
                      step="0.1"
                      min="0"
                      max="14"
                      value={formData.phLevel}
                      onChange={(e) => setFormData({...formData, phLevel: e.target.value})}
                      placeholder="e.g., 6.5"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="nitrogen">Nitrogen (N) - mg/kg</Label>
                    <Input
                      id="nitrogen"
                      type="number"
                      step="0.01"
                      value={formData.nitrogen}
                      onChange={(e) => setFormData({...formData, nitrogen: e.target.value})}
                      placeholder="e.g., 40.5"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phosphorus">Phosphorus (P) - mg/kg</Label>
                    <Input
                      id="phosphorus"
                      type="number"
                      step="0.01"
                      value={formData.phosphorus}
                      onChange={(e) => setFormData({...formData, phosphorus: e.target.value})}
                      placeholder="e.g., 25.2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="potassium">Potassium (K) - mg/kg</Label>
                    <Input
                      id="potassium"
                      type="number"
                      step="0.01"
                      value={formData.potassium}
                      onChange={(e) => setFormData({...formData, potassium: e.target.value})}
                      placeholder="e.g., 30.8"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="temperature" className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      Temperature (°C)
                    </Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      value={formData.temperature}
                      onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                      placeholder="e.g., 25.5"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="humidity">Humidity (%)</Label>
                    <Input
                      id="humidity"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={formData.humidity}
                      onChange={(e) => setFormData({...formData, humidity: e.target.value})}
                      placeholder="e.g., 65.0"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="rainfall" className="flex items-center gap-2">
                      <Droplets className="w-4 h-4" />
                      Rainfall (mm)
                    </Label>
                    <Input
                      id="rainfall"
                      type="number"
                      step="0.01"
                      value={formData.rainfall}
                      onChange={(e) => setFormData({...formData, rainfall: e.target.value})}
                      placeholder="e.g., 120.5"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? 'Analyzing...' : 'Get Recommendations'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/services')}>
                    Back to Services
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendationInput;
