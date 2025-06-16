import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Thermometer, CloudRain, Droplet, Sun, Sprout, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import axios from 'axios';

const cropImages = {
  rice:  "https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  maize:   "https://images.unsplash.com/photo-1693672842885-841644e3daf2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
  chickpea:"https://plus.unsplash.com/premium_photo-1675237625824-40a9c6400ad8?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
  kidneybeans:"https://plus.unsplash.com/premium_photo-1671130295242-582789bd9861?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",

  pigeonpeas:"https://habko.ng/wp-content/uploads/2023/10/muneer-ahmed-ok-WsZd1yxPkqs-unsplash-1-scaled.jpg ",
  mothbeans:"https://ooofarms.com/cdn/shop/products/MothBean1_whole.jpg?v=1736744811 ",
  mungbean:"https://www.pulseaus.com.au/storage/app/uploads/public/569/9e6/8db/5699e68dbdda4963259321.jpg ",
  blackgram:"https://upload.wikimedia.org/wikipedia/commons/6/6f/Black_gram.jpg ",

  lentil:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CSPGnpKxe_ue3mddmCDUhBJkuj_DL8nmCA&s",

  pomegranate:"https://images.unsplash.com/photo-1664124693991-8118f4dd554d?q=80&w=2489&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",

  banana:  "https://plus.unsplash.com/premium_photo-1675731118330-08c71253af17?q=80&w=2427&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",

  mango:   "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,

  grapes:  "https://images.unsplash.com/photo-1515778767554-42d4b373f2b3?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,

  watermelon:"https://images.unsplash.com/photo-1708982553355-794739c6693e?q=80&w=2425&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,

  muskmelon: "https://images.unsplash.com/photo-1646992122113-bd1f335187ac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVza21lbG9ufGVufDB8fDB8fHww ",

  apple:   "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",

  orange:  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",

  papaya:  "https://plus.unsplash.com/premium_photo-1675639895212-696149c275f9?q=80&w=2427&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",

  coconut: "https://plus.unsplash.com/premium_photo-1675040830227-9f18e88fd1f9?q=80&w=2427&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",

  cotton:  "https://images.unsplash.com/photo-1502395809857-fd80069897d0?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",

  jute:    "https://plus.unsplash.com/premium_photo-1674624789813-aee3aaa976cb?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
  coffee:  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2561&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
};

const cropDescriptions = {
  rice: "Rice requires high temperatures, humidity, and a good amount of rainfall. It grows best in alluvial clayey soil with standing water.",
  maize: "Maize prefers moderate rainfall and warm weather. It thrives in well-drained fertile soil and is highly adaptable to various climates.",
  chickpea: "Chickpeas grow best in cool and dry climates. They require loamy or sandy soil and do not tolerate excess moisture.",
  kidneybeans: "Kidney beans prefer warm climates with moderate rainfall. They grow well in well-drained loamy soil rich in organic matter.",
  pigeonpeas: "Pigeonpeas thrive in semi-arid regions with moderate rainfall. They prefer well-drained loamy soil and are drought-resistant.",
  mothbeans: "Moth beans grow in dry, hot climates and are highly drought-tolerant. They prefer sandy or loamy soils.",
  mungbean: "Mung beans grow well in warm, humid climates. They require well-drained loamy soil and moderate rainfall.",
  blackgram: "Black gram requires hot and humid conditions. It grows best in well-drained loamy or clayey soil.",
  lentil: "Lentils thrive in cool climates with moderate rainfall. They prefer sandy loam soil with good drainage.",
  pomegranate: "Pomegranates grow in hot, dry climates. They prefer loamy soil and are tolerant of drought and poor soils.",
  banana: "Bananas require tropical, humid climates with consistent warmth and rainfall. They grow best in rich, well-drained soil.",
  mango: "Mango trees flourish in tropical and subtropical climates with dry summers and wet monsoons. They prefer well-drained alluvial soil.",
  grapes: "Grapes thrive in warm, dry climates. They need well-drained sandy loam or clay loam soil for optimal growth.",
  watermelon: "Watermelons grow well in warm climates with sandy or loamy soil. They need plenty of sunlight and moderate irrigation.",
  muskmelon: "Muskmelons prefer warm, dry climates and sandy loam soil. They require good drainage and moderate watering.",
  apple: "Apples require a temperate climate with cold winters and well-distributed rainfall. They grow best in well-drained loamy soil.",
  orange: "Oranges need a subtropical to tropical climate. They prefer sandy loam soil with good drainage and regular watering.",
  papaya: "Papayas grow well in warm, humid climates with rich, well-drained soil. They require plenty of sunlight and protection from wind.",
  coconut: "Coconut palms thrive in tropical climates with high humidity and rainfall. They prefer sandy, well-drained soil near coastlines.",
  cotton: "Cotton requires a long frost-free period, plenty of sunshine, and moderate rainfall. It grows best in black or alluvial soil.",
  jute: "Jute plants grow in warm, humid climates with well-drained alluvial soil. They require standing water during early growth.",
  coffee: "Coffee grows best in tropical highland climates with moderate rainfall and shade. It prefers rich, well-drained volcanic soil."
};

const CropRecommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    soilType: '',
    pHLevel: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    rainfall: '',
  });
  const [result, setResult] = useState("");
  const [cropImageUrl, setCropImageUrl] = useState("");
  const [cropDescription, setCropDescription] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("");
    setCropImageUrl("");
    setCropDescription("");

    try {
      const res = await axios.post("http://localhost:8000/api/predict-crop", {
        N: parseFloat(formData.nitrogen),
        P: parseFloat(formData.phosphorus),
        K: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.pHLevel),
        rainfall: parseFloat(formData.rainfall),
      });
      const predictedCrop = res.data.predicted_crop.toLowerCase();
      setResult(predictedCrop);
      setCropImageUrl(cropImages[predictedCrop] || "");
      setCropDescription(cropDescriptions[predictedCrop] || "");

    } catch (err) {
      alert("Prediction failed. Please ensure all fields are filled correctly and the backend server is running.");
      console.error("Prediction error:", err);
      setResult("");
      setCropImageUrl("");
      setCropDescription("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Leaf className="mx-auto h-16 w-16 text-green-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Crop Recommendation</h1>
          <p className="text-gray-600 text-lg">Get AI-powered crop suggestions based on your soil and climate conditions</p>
        </motion.div>

        <Card className="w-full max-w-4xl shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Leaf className="mr-2" /> Soil & Climate Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select name="soilType" onValueChange={(value) => handleSelectChange('soilType', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="silty">Silty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pHLevel">pH Level (0-14)</Label>
                  <Input
                    type="number"
                    id="pHLevel"
                    name="pHLevel"
                    value={formData.pHLevel}
                    onChange={handleChange}
                    placeholder="e.g., 6.5"
                    min="0"
                    max="14"
                    step="0.1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nitrogen">Nitrogen (N) - mg/kg</Label>
                  <Input
                    type="number"
                    id="nitrogen"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleChange}
                    placeholder="e.g., 50"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phosphorus">Phosphorus (P) - mg/kg</Label>
                  <Input
                    type="number"
                    id="phosphorus"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleChange}
                    placeholder="e.g., 25"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="potassium">Potassium (K) - mg/kg</Label>
                  <Input
                    type="number"
                    id="potassium"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleChange}
                    placeholder="e.g., 70"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    type="number"
                    id="temperature"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="e.g., 25"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    type="number"
                    id="humidity"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    placeholder="e.g., 75"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rainfall">Rainfall (mm)</Label>
                  <Input
                    type="number"
                    id="rainfall"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    placeholder="e.g., 120"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-between items-center mt-6">
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                    Get Recommendations
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/services')}>
                    Back to Services
                  </Button>
                </div>
              </form>

              <div className="flex flex-col items-center justify-center space-y-4">
                {result && (
                  <div className="text-center">
                    <div className="mt-4 text-lg text-green-700">
                      Recommended Crop: <strong className="text-green-900 capitalize">{result}</strong>
                    </div>
                    {cropImageUrl ? (
                      <img
                        src={cropImageUrl}
                        alt={result}
                        className="w-64 h-64 object-cover rounded-md shadow-md mt-4"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://via.placeholder.com/400x400?text=Image+Not+Available'; }}
                      />
                    ) : (
                      <div className="mt-4 text-gray-500">No image available for this crop.</div>
                    )}
                    {cropDescription && (
                      <p className="mt-4 text-gray-700 text-sm italic max-w-sm mx-auto">{cropDescription}</p>
                    )}
                  </div>
                )}
                {!result && (
                  <div className="text-gray-500 text-center">
                    <p>Enter your soil and climate data to get a crop recommendation.</p>
                    <img
                      src="https://source.unsplash.com/400x400/?farm-field,agriculture"
                      alt="Farm field placeholder"
                      className="w-64 h-64 object-cover rounded-md shadow-md mt-4"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendation; 