from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Body
from pydantic import BaseModel, EmailStr
from typing import Optional
import json
import os
from datetime import datetime

router = APIRouter()

class ProfileData(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: Optional[str] = None
    location: Optional[str] = None
    profileImage: Optional[str] = None

class ProfileResponse(BaseModel):
    success: bool
    message: str
    data: Optional[ProfileData] = None

# In-memory storage (replace with database in production)
PROFILES_DB = {}

@router.get("/profile/{user_id}")
async def get_profile(user_id: str):
    """Get user profile data"""
    try:
        if user_id in PROFILES_DB:
            stored_data = PROFILES_DB[user_id]
            
            # Merge with default values to ensure all required fields are present
            default_profile = {
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
                "phone": "",
                "location": "",
                "profileImage": None
            }
            
            # Update with stored data, preserving any existing fields
            profile_data = {**default_profile, **stored_data}
            
            return ProfileResponse(
                success=True,
                message="Profile retrieved successfully",
                data=ProfileData(**profile_data)
            )
        else:
            # Return default profile for new users
            default_profile = {
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
                "phone": "",
                "location": "",
                "profileImage": None
            }
            return ProfileResponse(
                success=True,
                message="Default profile loaded",
                data=ProfileData(**default_profile)
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve profile: {str(e)}")

@router.post("/profile/{user_id}")
async def update_profile(user_id: str, profile: ProfileData):
    """Update user profile data"""
    try:
        # Preserve existing profileImage if present and not overwritten
        existing = PROFILES_DB.get(user_id, {})
        profile_dict = profile.dict()
        if "profileImage" in existing and not profile_dict.get("profileImage"):
            profile_dict["profileImage"] = existing["profileImage"]
        PROFILES_DB[user_id] = profile_dict
        return ProfileResponse(
            success=True,
            message="Profile updated successfully",
            data=ProfileData(**profile_dict)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {str(e)}")

@router.post("/profile/{user_id}/image")
async def upload_profile_image(
    user_id: str,
    image: UploadFile = File(...)
):
    """Upload profile image"""
    try:
        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Validate file size (max 5MB)
        if image.size > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Image size must be less than 5MB")
        
        # Create uploads directory if it doesn't exist
        upload_dir = "uploads/profile_images"
        os.makedirs(upload_dir, exist_ok=True)
        
        # Generate unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_extension = image.filename.split('.')[-1] if '.' in image.filename else 'jpg'
        filename = f"{user_id}_{timestamp}.{file_extension}"
        file_path = os.path.join(upload_dir, filename)
        
        # Save the file
        with open(file_path, "wb") as buffer:
            content = await image.read()
            buffer.write(content)
        
        # Store image path in profile data
        if user_id not in PROFILES_DB:
            PROFILES_DB[user_id] = {}
        
        PROFILES_DB[user_id]["profileImage"] = f"/uploads/profile_images/{filename}"
        
        return {
            "success": True,
            "message": "Profile image uploaded successfully",
            "imageUrl": f"/uploads/profile_images/{filename}"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {str(e)}")

@router.delete("/profile/{user_id}/image")
async def remove_profile_image(user_id: str):
    """Remove profile image"""
    try:
        if user_id in PROFILES_DB and "profileImage" in PROFILES_DB[user_id]:
            # Remove image file
            image_path = PROFILES_DB[user_id]["profileImage"]
            if image_path.startswith("/uploads/"):
                full_path = image_path[1:]  # Remove leading slash
                if os.path.exists(full_path):
                    os.remove(full_path)
            
            # Remove from profile data
            del PROFILES_DB[user_id]["profileImage"]
            
            return {
                "success": True,
                "message": "Profile image removed successfully"
            }
        else:
            return {
                "success": True,
                "message": "No profile image to remove"
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove image: {str(e)}")

@router.patch("/profile/{user_id}")
async def patch_profile(user_id: str, updates: dict = Body(...)):
    """
    Partially update user profile data.
    Only the provided fields will be updated.
    """
    try:
        # Get existing profile or default
        existing = PROFILES_DB.get(user_id, {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "phone": "",
            "location": "",
            "profileImage": None
        })
        # Update only provided fields
        existing.update(updates)
        PROFILES_DB[user_id] = existing
        return ProfileResponse(
            success=True,
            message="Profile updated successfully",
            data=ProfileData(**existing)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {str(e)}") 