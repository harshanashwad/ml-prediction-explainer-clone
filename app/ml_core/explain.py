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

def group_global_shap_values(global_vals, columns, task):
    mapping = get_feature_group_map(columns)
    grouped = []
    print(global_vals.shape)
    for base_feature, subcols in mapping.items():
        indices = [columns.get_loc(c) for c in subcols] # get_loc returns the index of the column
        total_importance = sum(global_vals[i] for i in indices)
        print(type(total_importance), total_importance)
        grouped.append({
            "feature": base_feature,
            "importance": round(total_importance, 3)
        })
    grouped.sort(key=lambda x: x["importance"], reverse=True)
    return grouped



def compute_shap_values(start=0, end=5):
    model, X_test = load_model_and_test_data()
    shape_dict = {}
    model_name = type(model).__name__

    if model_name == 'RandomForestRegressor':
        task = 'regression'
    else:
        task = 'classification'

    # Build a SHAP explainer object.
    explainer = shap.Explainer(model) # Explainer class automatically detects the model type
    # baseline = explainer.expected_value[0] # baseline is the model's average prediction (if it could see 0 features, the model would predict this value)

    # print(type(baseline))
    shap_values = explainer.shap_values(X_test) # shape: (num_rows, num_features) and is an np array
    print(shap_values.shape, type(shap_values), shap_values)
    shape_dict["shap_values"] = shap_values.shape

    # Global importance (mean absolute SHAP value across rows)
    global_importances = np.abs(shap_values).mean(axis=0) # Find mean of shap value of each feature across all rows. shape: (num_features,)
    shape_dict["global_importances"] = global_importances.shape
    grouped_global_importances = group_global_shap_values(global_importances, X_test.columns)

    # Local explanations: For the queried rows, corresponding shap values (from shap_values) are processed with a grouping logic and explanation is added as a dictionary.
    local_explanations = []
    mapping = get_feature_group_map(X_test.columns)

    for i in range(start, min(end, len(X_test))):
        row = X_test.iloc[i:i+1]
        prediction = model.predict(row)[0]
        shap_row = shap_values[i]

        local_explanation = {}
        # total = 0
        # Sum of all feature's shap value for a prediction = deviation of model output from baseline
        for feature, subcols in mapping.items():
            feature_contribution = sum(shap_row[X_test.columns.get_loc(c)] for c in subcols)
            print(type(feature_contribution))
            local_explanation[feature] = round(feature_contribution, 3)
            # total += feature_contribution
        
        local_explanations.append({
            "row_index": i,
            "prediction": prediction,
            "shap_contributions": local_explanation,
            # "total": total
        })

    return {
        "model_type": type(model).__name__,
        "global_feature_importance": grouped_global_importances,
        "local_explanations": local_explanations,
    }
