from flask import Flask, render_template, request
import os
from tensorflow.keras.models import load_model
from matplotlib import pyplot as plt
import tensorflow as tf
import numpy as np
import cv2

app = Flask(__name__)


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/uploadFile', methods = ["POST"])
def uploadFile():
    # Save image
    file = request.files["fileInput"]
    extension = file.filename.split(".")[1]
    
    print(file)
    
    file.save("static/images/analyzeImage." + extension)
    
    # Load model and predict
    new_model = load_model(os.path.join("Models", "Synthetic_data_augmentation.keras"))
    
    img = cv2.imread("static/images/analyzeImage." + extension)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    resize = tf.image.resize(img, (256,256))
    yhat = new_model.predict(np.expand_dims(resize, 0))
    values_tensor = tf.convert_to_tensor(yhat)
    softmax_values = tf.nn.softmax(values_tensor)
    maxPC = np.argmax(softmax_values)
    
    tools = ["Combi Wrench", "Hammer", "Screwdriver", "Wrench"]
    
    resultDict = {"extension": extension, "prediction": tools[maxPC], "allData": softmax_values.numpy().tolist()[0]}
    
    return render_template("result.html", result = resultDict)