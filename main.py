from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
import requests
import re

app = FastAPI()

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Template setup
templates = Jinja2Templates(directory="templates")

# Ollama API Endpoint
OLLAMA_API_URL = "http://localhost:11434/api/generate"

# Function to clean DeepSeek's response (only removes <think> tags)
def clean_response(text):
    return re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL).strip()

@app.get("/", response_class=HTMLResponse)
async def homepage(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/chat")
async def chat(data: dict):
    user_message = data.get("message", "")

    payload = {
        "model": "deepseek-r1:7b",
        "prompt": user_message,
        "stream": False
    }

    response = requests.post(OLLAMA_API_URL, json=payload)

    if response.status_code == 200:
        raw_response = response.json().get("response", "")
        cleaned_response = clean_response(raw_response)
        return JSONResponse(content={"response": cleaned_response})
    else:
        return JSONResponse(content={"error": "Failed to communicate with DeepSeek"}, status_code=500)
