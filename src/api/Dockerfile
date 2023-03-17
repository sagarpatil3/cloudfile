FROM python:3.9-slim-buster

# set working directory
WORKDIR /app/cloudfile

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP server.py
# install system dependencies
RUN apt-get update \
  && apt-get clean

# add and install requirements
COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# add app
COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]