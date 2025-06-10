# SHAP logic
import shap
import pandas as pd
import joblib
import numpy as np
import os

def load_model_and_test_data():
    # Load saved model and X_test
    model = joblib.load("artifacts/latest_model.pkl")
    X_test = pd.read_csv("artifacts/X_test.csv")
    return model, X_test

# Group one-hot encoded features to their base name
def get_feature_group_map(columns):
    mapping = {}
    for col in columns:
        # For one-hot encoded features, split at the first "_"
        if "_" in col:
            base = col.split("_")[0]
        else:
            base = col
        if base not in mapping:
            mapping[base] = []
        mapping[base].append(col)
    return mapping

def group_global_shap_values(global_vals, columns):
    mapping = get_feature_group_map(columns)
    grouped = []
    for base_feature, subcols in mapping.items():
        indices = [columns.get_loc(c) for c in subcols] # get_loc returns the index of the column
        total_importance = sum(global_vals[i] for i in indices)
        grouped.append({
            "feature": base_feature,
            "importance": round(total_importance, 3)
        })
    grouped.sort(key=lambda x: x["importance"], reverse=True)
    return grouped



def compute_shap_values(start=0, end=5):
    model, X_test = load_model_and_test_data()
    shape_dict = {}

    # Build a SHAP explainer object.
    explainer = shap.Explainer(model) # Explainer class automatically detects the model type
    shap_values = explainer.shap_values(X_test) # shape: (num_rows, num_features) and is an np array
    shape_dict["shap_values"] = shap_values.shape

    # Global importance (mean absolute SHAP value across rows)
    global_importances = np.abs(shap_values).mean(axis=0) # Find mean of shap value of each feature across all rows. shape: (num_features,)
    shape_dict["global_importances"] = global_importances.shape
    grouped_global_importances = group_global_shap_values(global_importances, X_test.columns)

    # Local explanations for selected rows
    local_explanations = []
    return {
        "model_type": type(model).__name__,
        "global_feature_importance": grouped_global_importances,
        "local_explanations": local_explanations,
        "shape_dict": shape_dict,
        "n": len(grouped_global_importances)
    }
