from flask import Flask
from flask import jsonify,request
from flask_cors import CORS
import os
import pandas

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/upload", methods=['POST'])
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

if __name__ =="__main__":
  app.run(debug=True)