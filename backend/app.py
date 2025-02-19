from flask import Flask, request, jsonify
import random
import pandas as pd
import numpy as np
from lifelines import CoxPHFitter

app = Flask(__name__)

# Load or create the mortality dataset
data = pd.DataFrame({
    'birth_year': np.random.randint(1900, 2025, 1000),
    'sex': np.random.choice(['male', 'female'], 1000),
    'smoker': np.random.choice([0, 1], 1000, p=[0.7, 0.3]),
    'bmi': np.random.uniform(18, 35, 1000),
    'exercise_hours_per_week': np.random.randint(0, 10, 1000),
    'death_age': np.random.normal(75, 10, 1000)
})

# Convert categorical variables
data['sex'] = data['sex'].map({'male': 0, 'female': 1})

# Train the Cox Proportional Hazards Model
cph = CoxPHFitter()
cph.fit(data, duration_col='death_age', event_col=None)

@app.route("/predict", methods=["POST"])
def predict():
    request_data = request.json
    input_data = pd.DataFrame({
        'birth_year': [int(request_data["birthYear"])],
        'sex': [0 if request_data["sex"] == "male" else 1],
        'smoker': [int(request_data["smoker"])],
        'bmi': [float(request_data["bmi"])],
        'exercise_hours_per_week': [int(request_data["exerciseHours"])]
    })

    # Predict death age
    predicted_death_age = cph.predict_expectation(input_data).values[0]
    death_year = int(request_data["birthYear"]) + int(predicted_death_age)

    # Randomize day and month
    death_month = random.randint(1, 12)
    death_day = random.randint(1, 28) if death_month == 2 else random.randint(1, 30 if death_month in [4, 6, 9, 11] else 31)

    return jsonify({"prediction": f"Estimated death date: {death_year}-{death_month:02d}-{death_day:02d}"})


if __name__ == "__main__":
    app.run(debug=True)
