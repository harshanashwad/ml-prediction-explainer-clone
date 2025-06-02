from fastapi import FastAPI # class used to create a my web application
from app.routes import controller

app = FastAPI(title="ML Prediction Explanation Interface") # Initializing my app as an instance of the FastAPI class

app.include_router(controller.router)
@app.get("/") # route decorator - home page of API
def read_root():
    return {
        "message": "API is working"
        }

# uvicorn app.main:app --reload 
'''
    uvicorn --> The ASGI server that runs your app

'''
