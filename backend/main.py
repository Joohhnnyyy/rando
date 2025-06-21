from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from .crop_api.routes.crop_prediction import router as crop_router
from .fertilizer_api.fertilizer_main import router as fertilizer_router
from .government_api.routes.schemes import router as government_router
from .yield_api.yield_main import router as yield_router
from .disease_api.routes.disease_prediction import router as disease_router

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

@app.get("/")
async def root():
    return {"message": "Unified SeedSync API"} 