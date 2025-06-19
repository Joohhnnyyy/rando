# SeedSync Backend

This is the backend server for the SeedSync application, built with FastAPI.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload
```

The server will start at http://localhost:8000

## API Endpoints

### Crop Prediction
- **POST** `/api/predict-crop`
  - Input: JSON with soil parameters (N, P, K, temperature, humidity, ph, rainfall)
  - Output: Predicted crop name

## Project Structure
```
backend/
├── models/
│   ├── crop_model.pkl
│   └── label_encoder.pkl
├── routes/
│   └── crop_prediction.py
├── main.py
├── requirements.txt
└── README.md
``` 