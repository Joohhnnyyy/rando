# Profile API

This API handles user profile management including profile data and image uploads.

## Endpoints

### GET /api/profile/{user_id}
Retrieve user profile data.

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "location": "Farm Location"
  }
}
```

### POST /api/profile/{user_id}
Update user profile data.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "location": "Farm Location"
}
```

### POST /api/profile/{user_id}/image
Upload profile image.

**Request:** Multipart form data with image file

**Response:**
```json
{
  "success": true,
  "message": "Profile image uploaded successfully",
  "imageUrl": "/uploads/profile_images/user_20231201_143022.jpg"
}
```

### DELETE /api/profile/{user_id}/image
Remove profile image.

**Response:**
```json
{
  "success": true,
  "message": "Profile image removed successfully"
}
```

## Features

- Profile data management (name, email, phone, location)
- Image upload with validation (max 5MB, image files only)
- Automatic file organization with timestamps
- Static file serving for uploaded images
- In-memory storage (can be replaced with database)

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create uploads directory:
```bash
mkdir -p uploads/profile_images
```

3. The API is automatically included in the main FastAPI application.

## Notes

- Currently uses in-memory storage for profile data
- Images are stored in `uploads/profile_images/` directory
- File size limit: 5MB
- Supported formats: JPG, PNG, GIF
- Static files are served at `/uploads/` path 