# ML Prediction Explanation Interface

## Overview

This project is an interactive web app that lets users upload any tabular dataset (CSV), select a target column, and instantly receive:

- A trained machine learning model on their dataset
- Detailed visual explanations of how the model makes predictions
- Insights into the most influential features behind each prediction
- A clean, modular codebase following modern software engineering practices

## Project Purpose (or) Why This Matters

Most ML applications are a black box. This project focuses on **explainability**, helping users understand not just *what* the model predicted, but *why*.

- Uses SHAP (SHapley Additive exPlanations) to break down feature importance
- Supports both global explanations (what matters overall) and local explanations (why a specific row was predicted)
- Provides key model performance metrics for trustworthiness
- Built with FastAPI, scikit-learn, and SHAP — modular and extensible

## Features

- Upload your own CSV dataset
- Select a target variable
- Train a model
- View feature importance and prediction explanations
- Ready for expansion into model download, LLM summaries, and MLOps integrations (Future work)

## Project Structure

```bash
ml-prediction-explainer/
├── app/
│   ├── main.py              # FastAPI entry point
│   ├── routes/              # API endpoints
│   ├── ml_core/              # ML training & SHAP logic
│   ├── core/                # App config
│   ├── utils/               # I/O helpers
│   └── schemas/             # Request/response formats
├── data/                    # Temp file storage (gitignored)
├── notebooks/               # Experiments & development
├── requirements.txt         # Dependencies
└── README.md
