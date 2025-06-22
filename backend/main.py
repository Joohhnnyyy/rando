from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Import routers
from .crop_api.routes.crop_prediction import router as crop_router
from .fertilizer_api.fertilizer_main import router as fertilizer_router
from .government_api.routes.schemes import router as government_router
from .yield_api.yield_main import router as yield_router
from .disease_api.routes.disease_prediction import router as disease_router
from .crop_rotation_api.routes.crop_rotation import router as rotation_router
from .pest_disease_api.routes.pest_disease import router as pest_disease_router

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(crop_router, prefix="/api/crop", tags=["crop"])
app.include_router(fertilizer_router, prefix="/api/fertilizer", tags=["fertilizer"])
app.include_router(government_router, prefix="/api", tags=["government"])
app.include_router(yield_router, prefix="/api/yield", tags=["yield"])
app.include_router(disease_router, prefix="/api/disease", tags=["disease"])
app.include_router(rotation_router, prefix="/api/rotation", tags=["rotation"])
app.include_router(pest_disease_router, prefix="/api/pest-disease", tags=["pest_disease"])

@app.get("/")
async def root():
    return {"message": "Unified SeedSync API"} 