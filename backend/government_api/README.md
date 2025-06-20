# Government Schemes API

This API provides access to government agricultural schemes, subsidies, and support programs for farmers.

## Features

- **Scheme Listing**: Get all government schemes with pagination and filtering
- **Scheme Details**: Get detailed information about specific schemes
- **Search & Filter**: Search schemes by name/description and filter by state, type, and crop
- **Comprehensive Data**: Includes eligibility, benefits, application process, and official sources

## API Endpoints

### Get All Schemes
```
GET /api/schemes
```

**Query Parameters:**
- `search` (optional): Search query across scheme names and descriptions
- `state` (optional): Filter by state/region
- `scheme_type` (optional): Filter by scheme type (subsidy, loan, insurance, etc.)
- `crop_type` (optional): Filter by crop type
- `limit` (optional): Number of results per page (default: 10, max: 100)
- `offset` (optional): Number of results to skip (default: 0)

**Response:**
```json
{
  "total": 15,
  "schemes": [...],
  "limit": 10,
  "offset": 0
}
```

### Get Scheme by ID
```
GET /api/schemes/{scheme_id}
```

**Response:**
```json
{
  "id": "pmkisan",
  "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
  "description": "...",
  "type": "Subsidy",
  "eligibility": "...",
  "benefits": "...",
  "how_to_apply": "...",
  "source": "https://pmkisan.gov.in"
}
```

## Scheme Types

- **Subsidy**: Direct financial support schemes
- **Insurance**: Crop and agricultural insurance programs
- **Loan**: Credit and loan facilities
- **Infrastructure**: Irrigation and infrastructure support
- **Welfare**: Social security and welfare programs
- **Development**: Agricultural development initiatives
- **Logistics**: Transportation and logistics support

## Integration

The API is integrated with the main SeedSync backend server and accessible through the `/api` prefix.

### Frontend Integration

The frontend components (`GovernmentSchemes.tsx` and `SchemeDetails.tsx`) are configured to work with this API:

1. **Proxy Configuration**: Vite is configured to proxy `/api` requests to `http://localhost:8000`
2. **TypeScript Interfaces**: Updated Scheme interface includes all required properties
3. **Error Handling**: Comprehensive error handling for API failures
4. **Loading States**: Loading indicators during API calls

## Data Source

Schemes data is stored in `data/schemes.json` and includes comprehensive information about:
- PM-KISAN
- PMFBY (Crop Insurance)
- Kisan Credit Cards
- Irrigation schemes
- Organic farming support
- And many more government programs

## Running the API

1. Ensure the main backend server is running on port 8000
2. The government API routes are automatically included in the main server
3. Access endpoints through the main server URL: `http://localhost:8000/api/schemes`

## Dependencies

- FastAPI
- Uvicorn
- Pydantic

All dependencies are listed in `requirements.txt`. 