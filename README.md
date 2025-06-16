# SeedSync Genesis - Smart Agriculture Platform

SeedSync Genesis is a modern web application designed to empower farmers with smart agricultural solutions, providing tools for crop analysis, government scheme notifications, and agricultural insights.

## Features

### 1. Smart Crop Analysis
- **Image Upload & Analysis**: Upload crop images for instant disease detection and health analysis
- **Real-time Results**: Get immediate feedback on crop health and potential issues
- **Detailed Reports**: Comprehensive analysis reports with actionable insights

### 2. Crop Recommendation
- **AI-Powered Suggestions**: Get crop recommendations based on soil and climate parameters.
- **Visual Feedback**: View images of recommended crops.
- **Detailed Descriptions**: Understand crop requirements and suitability.

### 3. Government Schemes & Subsidies
- **Scheme Notifications**: Stay updated with the latest government agricultural schemes
- **Subsidy Information**: Access detailed information about available subsidies
- **Application Tracking**: Track your scheme applications and status

### 4. Modern UI/UX
- Responsive design that works on all devices
- Smooth animations and transitions
- Dark mode support
- Intuitive navigation

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom components with Tailwind
- **State Management**: React Context API
- **Backend Framework**: FastAPI
- **Machine Learning**: Scikit-learn, NumPy, Pandas

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Python (v3.9 or higher)
- pip

### Frontend Installation & Run

1. Clone the repository:
```bash
git clone https://github.com/yourusername/seed-sync-genesis.git
cd seed-sync-genesis
```

2. Install frontend dependencies:
```bash
npm install
# or
yarn install
```

3. Start the frontend development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) (or the port specified by your Vite dev server) in your browser.

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

4. Train the Machine Learning Model (required once to generate .pkl files):
```bash
python train_model.py
```

5. Start the backend API server:
```bash
uvicorn main:app --reload
```

The backend server will start at `http://localhost:8000`.

## Project Structure

```
SeedSync/
├── public/                     # Static assets
├── src/                        # Frontend source code
│   ├── assets/
│   │   └── crop_images/        # (Optional) Local crop images
│   ├── components/             # Reusable React components
│   │   └── CropPredictForm.jsx # (Note: Logic moved to CropRecommendation.tsx)
│   ├── context/                # React Context APIs (e.g., AuthContext.tsx)
│   ├── pages/                  # Main application pages
│   │   └── CropRecommendation.tsx # Crop recommendation page
│   ├── styles/                 # Global styles
│   ├── utils/                  # Utility functions
│   └── App.tsx                 # Main application component
├── backend/                    # FastAPI Backend
│   ├── models/                 # Trained ML models (.pkl files)
│   │   ├── crop_model.pkl
│   │   └── label_encoder.pkl
│   ├── routes/                 # API route definitions
│   │   └── crop_prediction.py  # Crop prediction endpoint
│   ├── main.py                 # FastAPI application entry point
│   ├── requirements.txt        # Python dependencies
│   └── train_model.py          # Script to train and save ML model
├── Crop_recommendation.csv     # Dataset for crop prediction model
├── node_modules/
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── .gitignore
├── README.md                   # This file
└── ... other config files
```

## Component Details

### HeroSection
- Main landing section with animated content
- Responsive design with gradient background
- Smooth scroll behavior

### ServicesSection
- Showcases available services
- Interactive cards with hover effects
- Responsive grid layout

### MotivationSection
- Inspirational content for farmers
- Animated statistics and achievements
- Responsive design with image integration

### MakerSection
- Information about the platform creators
- Team member profiles
- Contact information

### SchemeNotifier
- Government scheme notifications
- Filterable scheme list
- Detailed scheme information display

### ImageUpload
- Crop image upload functionality
- Real-time image preview
- Analysis results display
- Responsive design with drag-and-drop support

### CropRecommendation (New/Updated)
- Form for inputting soil and climate data.
- Sends data to backend API for crop prediction.
- Displays predicted crop name, image, and detailed description.

## Features in Detail

### Image Upload & Analysis
- Supports multiple image formats (JPG, PNG, etc.)
- Real-time image preview
- Drag-and-drop functionality
- Mobile-responsive design
- Instant analysis results

### Government Schemes
- Comprehensive scheme database
- Filter by scheme type
- Detailed scheme information
- Application status tracking
- Regular updates

### Crop Recommendation (New)
- Integrates with FastAPI backend for ML-powered predictions.
- Provides data input fields for N, P, K, temperature, humidity, pH, and rainfall.
- Fetches and displays a predicted crop name, a dynamic image, and a detailed description of the crop.

## Configuration

The project uses Tailwind CSS for styling. Configuration can be found in:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen orientations

## Theme Support

- Light and dark mode support
- Custom color schemes
- Consistent typography
- Accessible color contrasts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

- Your Name - Initial work

## Acknowledgments

- Thanks to all contributors
- Inspired by the needs of modern farmers
- Built with modern web technologies
