# 🛠️ Setting up Ollama with DeepSeek-R1 on Windows

This guide walks you through setting up **Ollama** on Windows to run the **DeepSeek-R1:7B** model with a local FastAPI interface.

---

## 📌 **Prerequisites**
- Windows with **Docker Desktop** installed
- **NVIDIA GPU** (for GPU acceleration)
- **WSL 2 Enabled** (if running Docker on Windows)
- **Python 3.12** (for the FastAPI interface)

---

## 🚀 **1. Start Ollama & Install DeepSeek**
### **(a) Ensure Docker is Running**
Run the following command to verify that Docker is active:

```sh
docker ps
```

### **(b) Start the Ollama Container**
Start **Ollama** in a **Dockerized environment**:

```sh
docker-compose up -d
```

### **(c) Download & Load the DeepSeek-R1 Model**
Pull the **DeepSeek-R1:7B** model into Ollama:

```sh
docker exec -it ollama ollama pull deepseek-r1:7b
```

Run the model inside the **Ollama container**:

```sh
docker exec -it ollama ollama run deepseek-r1:7b
```

### **(d) Test DeepSeek Using cURL**
You can manually test **DeepSeek** via Ollama's API:

```sh
curl -X POST http://localhost:11434/api/generate -d '{
  "model": "deepseek-r1:7b",
  "prompt": "What is DeepSeek?",
  "stream": false
}'
```

---

## 🐍 **2. Set Up Python Environment**
### **(a) Install & Create a Conda Environment**
If you don’t have **Conda**, install [Miniconda](https://docs.conda.io/en/latest/miniconda.html).

Then, create a new environment for FastAPI:

```sh
conda create -n ds-ollama python=3.12
```

Activate the environment:

```sh
conda activate ds-ollama
```

### **(b) Install FastAPI & Dependencies**
Inside the activated environment, install the required Python packages:

```sh
pip install fastapi uvicorn requests jinja2
```

---

## 💡 **3. Start the FastAPI Interface**
To launch the web interface for DeepSeek:

1. **Ensure Ollama is running**:
   ```sh
   docker-compose up -d
   ```

2. **Run FastAPI locally**:
   ```sh
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

3. **Open the chat interface** in your browser:
   - 📌 [http://localhost:8000](http://localhost:8000)

---

## 🔄 **4. Stop & Restart Services**
### **(a) Stopping Ollama**
To stop **Ollama**, run:

```sh
docker-compose down
```

### **(b) Restarting the FastAPI Server**
If you need to restart the FastAPI server:

```sh
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 🎯 **Done!**
Now you have **Ollama** running **DeepSeek-R1 7B** inside **Docker** and a **FastAPI-powered ChatGPT-style interface** on Windows! 🚀

**Need Help?** 🤔  
If you run into any issues, check:
- Docker logs: `docker logs ollama`
- FastAPI logs: Look at the terminal where FastAPI is running

---

Made with :heart:.
