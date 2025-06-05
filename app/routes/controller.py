'''
The API layer. It defines what API endpoints exist and what they trigger. 

This is where the API routes live.
'''

from fastapi import APIRouter, UploadFile, HTTPException
from app.utils.io import read_uploaded_csv, validate_dataframe

router = APIRouter() # Create a router instance. Lets you modularize routes — good for scaling APIs.

@router.post("/upload-csv") # define a POST endpoint at /upload-csv. Expects a file in request body
async def upload_csv(file: UploadFile):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported.")

    try:
        df = read_uploaded_csv(file)
        validation = validate_dataframe(df)

        # Optional: Save it for reuse
        df.to_csv("data/last_uploaded.csv", index=False)

        return validation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
