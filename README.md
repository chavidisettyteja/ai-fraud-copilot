# 🛡️ AI Fraud Copilot

An end-to-end AI-powered fraud investigation platform that combines **Machine Learning anomaly detection** with **Mistral LLM-generated investigation reports**.

🔗 **Live Frontend:** https://ai-fraud-copilot.netlify.app
🔗 **Live API:** https://ai-fraud-copilot.onrender.com/docs

---

## 🚀 Features

* Upload transaction CSV files
* Detect suspicious transactions using **Isolation Forest**
* Generate **AI-powered fraud investigation reports**
* View risk analysis in a React dashboard
* Download investigation reports as PDF
* Fully deployed on **Netlify + Render**

---

## 🧠 Problem Statement

Fraud analysts often spend significant time reviewing large transaction datasets and writing investigation summaries. This project automates the workflow by:

1. Identifying anomalous transactions with ML.
2. Generating concise enterprise-style fraud explanations with an LLM.
3. Presenting the results in a real-time analyst dashboard.

---

## 🏗️ Architecture

```text
CSV Upload
    ↓
React Frontend (Netlify)
    ↓
FastAPI Backend (Render)
    ↓
Pandas Data Processing
    ↓
Isolation Forest Anomaly Detection
    ↓
Mistral LLM Investigation Engine
    ↓
AI Fraud Investigation Report
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Material UI
* Axios

### Backend

* FastAPI
* Uvicorn
* Python

### Machine Learning

* Scikit-learn
* Isolation Forest
* Pandas

### Generative AI

* Mistral API
* Prompt Engineering

### Deployment

* Netlify
* Render
* GitHub

---

## 📊 ML Approach

The system uses **Isolation Forest** for unsupervised anomaly detection.

### Features used

* Transaction Amount
* Transaction Hour

Transactions that significantly deviate from normal behavioral patterns are flagged as suspicious and passed to the LLM for explanation.

---

## 🤖 AI Investigation Engine

For each suspicious transaction, the backend constructs a structured prompt containing:

* Transaction ID
* Amount
* Country
* Device Type
* Transaction Time

The **Mistral LLM** generates a professional investigation summary covering:

* Why the transaction is suspicious
* Possible fraud pattern
* Recommended analyst action

---

## 📁 Project Structure

```text
ai-fraud-copilot/
├── backend/
│   ├── main.py
│   ├── ai_service.py
│   ├── ml_service.py
│   ├── requirements.txt
│   └── data/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── netlify.toml
│
└── README.md
```

---

## ⚙️ Local Setup

### Backend

```bash
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🌐 Production Deployment

### Backend (Render)

* Runtime: Python
* Start Command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Frontend (Netlify)

* Base Directory: `frontend`
* Build Command: `npm run build`
* Publish Directory: `dist`

---

## 📈 Example Output

### Suspicious Transaction

| Transaction ID |   Amount | Country |  Hour |
| -------------- | -------: | ------- | ----: |
| TXN013         | ₹250,000 | Unknown | 02:00 |

### AI Investigation Report

> This transaction is highly suspicious due to the unusually large amount, foreign geolocation, and late-night execution time. The pattern is consistent with account takeover or mule-account activity. Recommended action: immediately place the transaction on hold and perform enhanced KYC and device verification.

---

## 🔒 Security & Production Considerations

* Environment variables are stored in Render.
* API keys are excluded from GitHub via `.gitignore`.
* CORS is restricted to the production Netlify domain.
* File uploads are validated before processing.

---

## 🎯 Resume Impact

**Developed and deployed an AI Fraud Copilot using React, FastAPI, Isolation Forest, and Mistral LLM, enabling anomaly detection and AI-generated fraud investigation reports through a publicly accessible cloud deployment on Netlify and Render.**

---

## 📌 Future Enhancements

* Multi-agent investigation workflow (LangGraph)
* Hybrid retrieval for historical fraud cases
* Real-time streaming transaction monitoring
* Analyst feedback loop for model improvement
* PostgreSQL audit logging
* Role-based access control

---

## 👨‍💻 Author

**Chavidisetty Naga Sai Tejaswi Kumar**

* GitHub: https://github.com/YOUR_USERNAME](https://github.com/chavidisettyteja
* LinkedIn: linkedin.com/in/tejachavidisetty

---

## ⭐ Why This Project Stands Out

Unlike typical chatbot demos, this project demonstrates:

* **ML anomaly detection**
* **LLM explainability**
* **REST API engineering**
* **Frontend integration**
* **Cloud deployment**
* **Production debugging**
* **End-to-end AI workflow automation**

This makes it a strong portfolio project for **AI Engineer / GenAI Engineer / Applied AI Engineer** roles.
