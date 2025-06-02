from fastapi import UploadFile
import pandas as pd
import os
import io

# function takes in the CSV file (of type FastAPI UploadFile) and returns a dataframe
def read_uploaded_csv(file: UploadFile) -> pd.DataFrame: 
    try:
        contents = file.file.read()
        df = pd.read_csv(io.BytesIO(contents)) # io.BytesIO(contents) -> wrapping the raw bytes in a file-like object in memory
        return df
    except Exception as e:
        raise ValueError(f"Error reading CSV: {str(e)}")
