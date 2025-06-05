from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, mean_squared_error
import pandas as pd

def train_model(df: pd.DataFrame, target: str):
    X = df.drop(columns=[target]) # Drop the target column from the dataframe
    y = df[target] # Target column

    # Basic type detection
    if y.dtype in ['float64', 'int64'] and y.nunique() > 15:
        task = "regression"
        model = RandomForestRegressor()
    else:
        task = "classification"
        model = RandomForestClassifier()

    # One hot encoding for object/categorical features
    X = pd.get_dummies(X)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    if task == "classification":
        acc = accuracy_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred).tolist()
        return {
            "task": task,
            "model_type": "RandomForestClassifier",
            "accuracy": round(acc, 3),
            "confusion_matrix": cm
        }
    else:
        mse = mean_squared_error(y_test, y_pred)
        return {
            "task": task,
            "model_type": "RandomForestRegressor",
            "mse": round(mse, 3)
        }
