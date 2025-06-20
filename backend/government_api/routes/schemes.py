from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
import json
from pathlib import Path

router = APIRouter()

# Load schemes data
def load_schemes():
    try:
        data_file = Path(__file__).parent.parent / "data" / "schemes.json"
        if not data_file.exists():
            raise FileNotFoundError(f"Schemes data file not found at {data_file}")
        with open(data_file, "r", encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading schemes data: {str(e)}")

@router.get("/schemes")
async def get_schemes(
    search: Optional[str] = None,
    state: Optional[str] = None,
    scheme_type: Optional[str] = None,
    crop_type: Optional[str] = None,
    limit: int = Query(default=10, ge=1, le=100),
    offset: int = Query(default=0, ge=0)
) -> dict:
    """
    Get government schemes with optional filtering and pagination.
    
    Parameters:
    - search: Search query across scheme names and descriptions
    - state: Filter by state/region
    - scheme_type: Filter by scheme type (subsidy, loan, insurance, etc.)
    - crop_type: Filter by crop type
    - limit: Number of results per page (default: 10)
    - offset: Number of results to skip (default: 0)
    """
    try:
        schemes = load_schemes()
        filtered_schemes = schemes

        # Apply filters
        if search:
            search = search.lower()
            filtered_schemes = [
                scheme for scheme in filtered_schemes
                if search in scheme.get("name", "").lower() or 
                   search in scheme.get("description", "").lower()
            ]

        if state and state.lower() != 'all':
            filtered_schemes = [
                scheme for scheme in filtered_schemes
                if "coverage" in scheme and state.lower() in scheme["coverage"].lower()
            ]

        if scheme_type and scheme_type.lower() != 'all':
            filtered_schemes = [
                scheme for scheme in filtered_schemes
                if "type" in scheme and scheme_type.lower() == scheme["type"].lower()
            ]

        if crop_type and crop_type.lower() != 'all':
            filtered_schemes = [
                scheme for scheme in filtered_schemes
                if "crop_types" in scheme and crop_type.lower() in [ct.lower() for ct in scheme["crop_types"]]
            ]

        # Calculate total before pagination
        total = len(filtered_schemes)

        # Apply pagination
        paginated_schemes = filtered_schemes[offset:offset + limit]

        return {
            "total": total,
            "schemes": paginated_schemes,
            "limit": limit,
            "offset": offset
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/schemes/{scheme_id}")
async def get_scheme_by_id(scheme_id: str) -> dict:
    """
    Get a specific scheme by its ID.
    
    Parameters:
    - scheme_id: The unique identifier of the scheme
    """
    try:
        schemes = load_schemes()
        for scheme in schemes:
            if scheme["id"] == scheme_id:
                return scheme
        raise HTTPException(status_code=404, detail="Scheme not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 