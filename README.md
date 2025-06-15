# SeedSync Genesis - Smart Agriculture Platform

SeedSync Genesis is a modern web application designed to empower farmers with smart agricultural solutions, providing tools for crop analysis, government scheme notifications, and agricultural insights.

## Features

### 1. Smart Crop Analysis
- **Image Upload & Analysis**: Upload crop images for instant disease detection and health analysis
- **Real-time Results**: Get immediate feedback on crop health and potential issues
- **Detailed Reports**: Comprehensive analysis reports with actionable insights

### 2. Government Schemes & Subsidies
- **Scheme Notifications**: Stay updated with the latest government agricultural schemes
- **Subsidy Information**: Access detailed information about available subsidies
- **Application Tracking**: Track your scheme applications and status

### 3. Modern UI/UX
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

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/seed-sync-genesis.git
cd seed-sync-genesis
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/         # React components
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   ├── MotivationSection.tsx
│   ├── MakerSection.tsx
│   ├── SchemeNotifier.tsx
│   └── ImageUpload.tsx
├── styles/            # Global styles
│   └── index.css
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── App.tsx          # Main application component
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
