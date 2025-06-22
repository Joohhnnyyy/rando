# SeedSync Genesis - Smart Agriculture Platform

SeedSync Genesis is a comprehensive modern web application designed to empower farmers with smart agricultural solutions, providing tools for crop analysis, disease prediction, government scheme notifications, and agricultural insights.

## Features

### 1. Smart Crop Analysis
- **Image Upload & Analysis**: Upload crop images for instant disease detection and health analysis
- **Real-time Results**: Get immediate feedback on crop health and potential issues
- **Detailed Reports**: Comprehensive analysis reports with actionable insights
- **Capture Photo**: Built-in camera functionality for instant photo capture
- **Report Issues**: Integrated issue reporting system for crop problems

### 2. Crop Recommendation
- **AI-Powered Suggestions**: Get crop recommendations based on soil and climate parameters
- **Visual Feedback**: View images of recommended crops
- **Detailed Descriptions**: Understand crop requirements and suitability
- **Interactive Sliders**: Modern UI with slider controls for precise input

### 3. Pest & Disease Prediction (NEW)
- **Comprehensive Analysis**: Predict potential pests and diseases based on field conditions
- **Crop-Specific Varieties**: Dynamic dropdown with crop-specific variety options
- **Regional Data**: Location-based analysis using Indian states and territories
- **Preventive Measures**: Detailed prevention and treatment recommendations
- **Structured Results**: Clean, organized output with 4-paragraph limits per section

### 4. Crop Rotation Planning (NEW)
- **AI-Generated Plans**: Get intelligent crop rotation recommendations
- **Multi-Year Planning**: Long-term rotation strategies for sustainable farming
- **Soil Health Focus**: Recommendations based on soil nutrient balance
- **Pest Management**: Rotation plans that help control pests and diseases

### 5. Yield Prediction (NEW)
- **Machine Learning Models**: Advanced algorithms for yield forecasting
- **Environmental Factors**: Consideration of weather, soil, and management practices
- **Visual Analytics**: Clear presentation of predicted yields
- **Optimization Tips**: Recommendations to improve yield potential

### 6. Fertilizer Recommendation (NEW)
- **Nutrient Analysis**: Comprehensive soil nutrient assessment
- **Crop-Specific Recommendations**: Tailored fertilizer suggestions
- **Visual Fertilizer Guide**: Images and descriptions of recommended fertilizers
- **Application Guidelines**: Detailed usage instructions and safety tips

### 7. Irrigation Advice (NEW)
- **Weather Integration**: Real-time weather data for irrigation planning
- **Crop-Specific Guidelines**: Water requirements for different crops
- **Efficiency Tips**: Water conservation and optimization strategies
- **Seasonal Adjustments**: Dynamic recommendations based on growing season

### 8. Government Schemes & Subsidies
- **Scheme Notifications**: Stay updated with the latest government agricultural schemes
- **Subsidy Information**: Access detailed information about available subsidies
- **Application Tracking**: Track your scheme applications and status
- **Detailed Scheme Pages**: Comprehensive information for each scheme

### 9. Modern UI/UX
- **Responsive Design**: Works seamlessly on all devices
- **Two-Column Layout**: Modern interface with form and results side-by-side
- **Smooth Animations**: Framer Motion powered transitions
- **Dark Mode Support**: Comfortable viewing in any lighting
- **Interactive Elements**: Hover effects and micro-interactions

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Shadcn/ui component library
- **State Management**: React Context API
- **Build Tool**: Vite

### Backend
- **Framework**: FastAPI (Python)
- **Machine Learning**: Scikit-learn, NumPy, Pandas
- **AI Integration**: Google Gemini API
- **Image Processing**: OpenCV, PIL
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

### APIs & Services
- **Crop Prediction API**: ML-powered crop recommendations
- **Disease Detection API**: Image-based disease identification
- **Pest Disease API**: Field condition-based pest prediction
- **Crop Rotation API**: AI-generated rotation planning
- **Yield Prediction API**: Advanced yield forecasting
- **Fertilizer API**: Nutrient-based fertilizer recommendations
- **Government Schemes API**: Scheme database and notifications
- **Weather API**: Real-time weather data integration

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Python (v3.9 or higher)
- pip

### Environment Setup

1. Create a `.env` file in the root directory:
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Frontend Installation & Run

1. Clone the repository:
```bash
git clone https://github.com/Joohhnnyyy/SeedSync.git
cd SeedSync
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Backend Setup & Run

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a Python virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

3. Install backend dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend API server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The backend server will start at `http://localhost:8000`.

## Project Structure

```
SeedSync/
├── src/                        # Frontend source code
│   ├── components/             # Reusable React components
│   │   ├── ui/                # Shadcn/ui components
│   │   ├── Navigation.tsx     # Main navigation
│   │   └── Footer.tsx         # Footer component
│   ├── pages/                 # Main application pages
│   │   ├── Index.tsx          # Landing page
│   │   ├── CropRecommendation.tsx
│   │   ├── PestDiseasePrediction.tsx
│   │   ├── CropRotationPlanner.tsx
│   │   ├── YieldPrediction.tsx
│   │   ├── FertilizerRecommendation.tsx
│   │   ├── IrrigationAdvice.tsx
│   │   ├── GovernmentSchemes.tsx
│   │   ├── ImageUpload.tsx
│   │   └── ReportIssue.tsx
│   ├── lib/                   # Utility libraries
│   │   ├── cropData.ts        # Crop varieties and regions data
│   │   └── utils.ts           # Helper functions
│   └── App.tsx                # Main application component
├── backend/                   # FastAPI Backend
│   ├── crop_api/             # Crop recommendation API
│   ├── disease_api/          # Disease detection API
│   ├── pest_disease_api/     # Pest & disease prediction API
│   ├── crop_rotation_api/    # Crop rotation planning API
│   ├── yield_api/            # Yield prediction API
│   ├── fertilizer_api/       # Fertilizer recommendation API
│   ├── government_api/       # Government schemes API
│   └── main.py               # FastAPI application entry point
├── public/                   # Static assets
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## API Endpoints

### Crop Recommendation
- `POST /api/crop/predict` - Get crop recommendations based on soil parameters

### Disease Detection
- `POST /api/disease/predict` - Analyze crop images for disease detection

### Pest & Disease Prediction
- `POST /api/pest-disease/predict` - Predict pests/diseases based on field conditions

### Crop Rotation
- `POST /api/rotation/generate-advice` - Generate crop rotation plans

### Yield Prediction
- `POST /api/yield/predict` - Predict crop yields

### Fertilizer Recommendation
- `POST /api/fertilizer/recommend` - Get fertilizer recommendations

### Government Schemes
- `GET /api/schemes` - Get all government schemes
- `GET /api/schemes/{scheme_id}` - Get specific scheme details

## Key Features in Detail

### Pest & Disease Prediction
- **Input Parameters**: Crop type, variety, location, season, soil type, nutrients (N, P, K), pH, and history
- **Crop Varieties**: Dynamic dropdown with 13+ crops and their specific varieties
- **Regional Data**: All Indian states and territories for location-specific analysis
- **AI Analysis**: Gemini-powered predictions with structured output
- **Results Format**: Likely pests/diseases, symptoms to watch, and preventive measures

### Crop Rotation Planning
- **Multi-Crop Support**: Plan rotations for multiple crops
- **Soil Health Focus**: Recommendations based on nutrient balance
- **Seasonal Planning**: Kharif, Rabi, and Zaid season considerations
- **Pest Management**: Rotation strategies to control pests and diseases

### Modern UI Components
- **Interactive Sliders**: Precise input controls for numerical values
- **Dependent Dropdowns**: Crop variety selection based on crop type
- **Real-time Validation**: Form validation and error handling
- **Loading States**: Smooth loading animations and progress indicators
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@seedsync.com or join our Slack channel.

## Acknowledgments

- Google Gemini API for AI-powered agricultural insights
- Supabase for backend services
- Shadcn/ui for beautiful UI components
- The farming community for valuable feedback and testing
