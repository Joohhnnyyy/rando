from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import crop_prediction

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(crop_prediction.router, prefix="/api", tags=["crop-prediction"])

@app.get("/")
async def root():
    return {"message": "Welcome to SeedSync API"} 