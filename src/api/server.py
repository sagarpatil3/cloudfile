from flask import Flask
from flask import jsonify,request
from flask_cors import CORS,cross_origin
import os
import pandas

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/upload", methods=['POST'])
@cross_origin()
def uploadFile():
  dataset = pandas.DataFrame();
  try:
    if request.method == 'POST':  # {
      file = request.files['file']
      filename = file.filename
      if file is not None and filename != "":
        print(f"Uploading file {filename}")
        _, ext = os.path.splitext(file.filename)
        ext = ext.lower()
        if ext == ".csv":  # {
           dataset = pandas.read_csv(file)
  except Exception as e:
    print(f"Couldn't upload file {e}")

  return dataset.to_json(orient = "records")

@app.route("/calculateESG", methods=['POST'])
@cross_origin()
def calculateESG():
  
  data = request.form.get('data');
  scenario = request.form.get('scenario');
  #dataset = pandas.read_json(data[0]);
 
  return "DATA:"+ data;

if __name__ =="__main__":
  app.run(debug=True)