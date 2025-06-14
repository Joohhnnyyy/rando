
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, Beaker } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const FertilizerRecommendationInput = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cropType: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    phLevel: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const mockRecommendations = [
        { 
          name: 'Urea', 
          quantity: '120 kg/hectare', 
          purpose: 'Nitrogen booster for leaf growth',
          applicationTips: 'Apply in split doses - 50% at sowing, 50% at tillering stage'
        },
        { 
          name: 'DAP (Di-Ammonium Phosphate)', 
          quantity: '80 kg/hectare', 
          purpose: 'Phosphorus for root development',
          applicationTips: 'Apply as basal dose during soil preparation'
        }
      ];

      const { error } = await supabase
        .from('fertilizer_recommendations')
        .insert({
          user_id: user?.id,
          crop_type: formData.cropType,
          nitrogen: parseFloat(formData.nitrogen),
          phosphorus: parseFloat(formData.phosphorus),
          potassium: parseFloat(formData.potassium),
          ph_level: parseFloat(formData.phLevel),
          recommended_fertilizers: mockRecommendations
        });

      if (error) throw error;

      navigate('/fertilizer-recommendation/results', { 
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
            <Beaker className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Fertilizer Recommendation
            </h1>
            <p className="text-lg text-gray-600">
              Get personalized fertilizer suggestions for optimal crop nutrition
            </p>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Crop & Soil Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="cropType">Crop Type</Label>
                  <Select value={formData.cropType} onValueChange={(value) => setFormData({...formData, cropType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="soybean">Soybean</SelectItem>
                      <SelectItem value="potato">Potato</SelectItem>
                      <SelectItem value="tomato">Tomato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nitrogen">Current Nitrogen (N) - mg/kg</Label>
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
                    <Label htmlFor="phosphorus">Current Phosphorus (P) - mg/kg</Label>
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
                    <Label htmlFor="potassium">Current Potassium (K) - mg/kg</Label>
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
                    <Label htmlFor="phLevel">Soil pH Level (0-14)</Label>
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
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? 'Analyzing...' : 'Get Fertilizer Recommendations'}
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

export default FertilizerRecommendationInput;
