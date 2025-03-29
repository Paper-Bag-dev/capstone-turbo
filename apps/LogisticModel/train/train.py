import tensorflow as tf
import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Get the absolute path of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, "forest_voc_data.csv")

# Debug print
print("Looking for file at:", csv_path)

df = pd.read_csv(csv_path)

# Features and target
X = df[['Humidity', 'Temp', 'MQ-135', 'Hour of Day']]
y = df['y']  # Multi-class labels (0: Healthy, 1: Pollution, 2: Heat, 3: Drought)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

model = tf.keras.Sequential([
    tf.keras.layers.Dense(16, input_shape=(4,), activation='relu'),
    tf.keras.layers.Dense(8, activation='relu'),
    tf.keras.layers.Dense(4, activation='softmax') 
])

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

model.fit(X_train, y_train, epochs=20, batch_size=8, validation_data=(X_test, y_test))

model.save(os.path.join(current_dir, "forest_stress_model.keras"))
